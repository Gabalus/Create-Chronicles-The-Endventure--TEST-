// kubejs/server_scripts/Skills/skills_combat.js

// --- sanity log to prove the file loaded on /reload ---
console.log('[Skills] skills_combat.js loaded (server_scripts)');

// state kept in-memory between reloads
let ABOActive = false;
let AftershockActive = false;
const heavyStunAccum = Object.create(null);

// Helper: scoreboard/NBT entity tags set via `/tag` or code
function hasEntityTag(ent, tag) {
  try {
    return ent?.tags && ent.tags.contains && ent.tags.contains(tag);
  } catch (_) {
    return false;
  }
}

// --- CORRECT modern KubeJS event ---
// Fires whenever a living entity takes damage on the server
EntityEvents.beforeHurt(event => {
  // ultra-verbose trace (comment out after testing)
  // console.log(`[HURT] dmg=${event.damage} proj=${!!event.projectile} target=${event.entity?.type} src=${event.source?.type}`);

  const target = event.entity;               // damaged entity (LivingEntity)
  const src    = event.source;               // DamageSource wrapper
  const player = src?.player ?? null;        // attacking Player, if any

  if (!player) return;                       // ignore non-player damage

  const maxHP      = target.maxHealth ?? 0;
  const currentHP  = target.health ?? 0;
  const baseDamage = event.damage ?? 0;

  // health BEFORE this hit is applied
  const originalHealth = currentHP + baseDamage;

  // ----------------- CULLING STRIKE -----------------
  // Require scoreboard tag "culling_strike" on the player
  // Check your tag with: /tag @p list
  if (hasEntityTag(player, 'culling_strike') && maxHP > 0) {
    let threshold = 0.30;          // default “normal”
    if (maxHP >= 50)  threshold = 0.10; // “tough”
    if (maxHP >= 100) threshold = 0.05; // “bossy”
    let preFrac = originalHealth / maxHP;
    if (preFrac <= threshold) {
      // kill happens BEFORE normal damage is applied
      //event.cancel();       // stop normal damage pipeline
      target.kill();        // execute
      console.log(`[CULL] Culled ${target.type} at ${(preFrac*100).toFixed(1)}%`);
      return;
    }
  }

  // ----------------- DECIMATING STRIKE -----------------
  if (hasEntityTag(player, 'decimating_strike') && maxHP > 0) {
    // apply only if target was FULL health before this hit
    if (Math.abs(originalHealth - maxHP) < 0.0001) {
      const removePct = 0.05 + Math.random() * 0.25; // 5%..30%
      const removeAmt = maxHP * removePct;
      const after = Math.max(0, target.health - removeAmt);
      target.health = after;
      console.log(`[DECIMATE] Removed ${(removePct*100).toFixed(1)}% -> newHP=${after.toFixed(2)}`);
      if (after <= 0) {
        event.cancel(); // prevent double-processing
        target.kill();
        return;
      }
    }
  }

  // ----------------- FAR SHOT / POINT BLANK -----------------
  if (event.projectile && (hasEntityTag(player, 'far_shot') || hasEntityTag(player, 'point_blank'))) {
    const dist = player.distanceTo(target);
    // Far Shot: up to +20% at ~7m
    if (hasEntityTag(player, 'far_shot')) {
      let bonus = 0;
      if (dist >= 3.5) bonus = Math.min(0.2, ((dist - 3.5) / 3.5) * 0.2);
      event.damage = event.damage * (1 + bonus);
    }
    // Point Blank: +20% at <=3.5m, linearly to 0% at 7m
    if (hasEntityTag(player, 'point_blank')) {
      let bonus = 0;
      if (dist <= 3.5) bonus = 0.2;
      else if (dist < 7) bonus = 0.2 * (1 - (dist - 3.5) / 3.5);
      event.damage = event.damage * (1 + bonus);
    }
  }

  // ----------------- HEAVY STUN: extra damage while stunned -----------------
  if (hasEntityTag(player, 'heavy_stunned') && target.tags?.contains('heavy_stunned')) {
    event.damage = event.damage * 1.25;
  }

  // ----------------- AFTERSHOCKS (melee repeat) -----------------
  if (hasEntityTag(player, 'aftershocks') && !event.projectile && !AftershockActive) {
    const dmg = event.damage;
    event.server.scheduleInTicks(5, () => {
      if (!target.isAlive()) return;
      AftershockActive = true;
      target.damage(dmg, player);
      AftershockActive = false;
    });
  }

  // ----------------- ANCESTRALLY BOOSTED (melee cleave) -----------------
  if (hasEntityTag(player, 'ancestrally_boosted') && !event.projectile && !ABOActive) {
    ABOActive = true;
    const radius = 3;
    // get living entities near target (filter out players & self)
    const list = target.level.getEntities(target.getBoundingBox().inflate(radius))
      .filter(e => e.isLiving() && !e.isPlayer() && e.id !== target.id);
    // hit up to 2 nearest
    list.sort((a, b) => a.distanceTo(target) - b.distanceTo(target));
    for (const e of list.slice(0, 2)) e.damage(event.damage, player);
    ABOActive = false;
  }

  // ----------------- HEAVY STUN accumulation & trigger -----------------
  if (hasEntityTag(player, 'heavy_stun')) {
    const id = String(target.id);
    const melee = !event.projectile;
    let mult = 1.0;
    mult *= 1.5;            // physical bonus (approximation)
    if (melee) mult *= 1.5; // melee bonus

    const add = event.damage * mult;
    heavyStunAccum[id] = (heavyStunAccum[id] || 0) + add;

    let thresh = maxHP * 0.5;
    if (maxHP >= 50)  thresh = maxHP * 1.0;
    if (maxHP >= 100) thresh = maxHP * 1.5;

    if (heavyStunAccum[id] >= thresh && target.isAlive()) {
      let ticks = 100;            // ~5s small
      if (maxHP >= 50)  ticks = 80;
      if (maxHP >= 100) ticks = 60;
      target.addEffect('minecraft:slowness', ticks, 7);
      target.tags.add('heavy_stunned');
      event.server.scheduleInTicks(ticks, () => target.tags.remove('heavy_stunned'));
      heavyStunAccum[id] = 0;
    }
  }
});
