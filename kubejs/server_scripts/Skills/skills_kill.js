// skills_kill.js - Handles on-kill skill effects (Tailwind, Arcane Surge, Flames of Chayula)

EntityEvents.death( event => {
    let target = event.entity;
    let source = event.source;
    if (!source || !source.isPlayer()) return;
    let player = source;
    // Tailwind: grant a speed boost on kill (refreshes Tailwind buff)
    if (player.hasTag('tailwind')) {
        player.addEffect('minecraft:speed', 200, 0);  // Speed I for 10 seconds
    }
    // Arcane Surge: grant a temporary Arcane Surge buff (faster casting/mining)
    if (player.hasTag('arcane_surge')) {
        player.addEffect('minecraft:haste', 200, 0);  // Haste I for 10 seconds
    }
    // Flames of Chayula: leech life/mana and grant a chaos damage buff on kill
    if (player.hasTag('flames_of_chayula')) {
        // Leech 7% of max life to the player as healing
        let healAmt = player.getMaxHealth() * 0.07;
        player.setHealth(Math.min(player.getHealth() + healAmt, player.getMaxHealth()));
        // (If a mana system existed, you would also restore 7% of max mana here. 
        // As a substitute, one could restore hunger or another resource.)
        // Grant a short damage buff (simulated as Strength I for 5 seconds)
        player.addEffect('minecraft:strength', 100, 0);
    }
});
