// Hide Recipes
RecipeViewerEvents.removeEntriesCompletely('item', item =>{
  global.REMOVE_ITEMS.forEach(id => {
    item.remove(id)
  })

  const itemsToRemove = [
    'incomplete_barbecue_stick',
    'incomplete_cod_roll',
    'incomplete_kelp_roll',
    'incomplete_melon_popsicle',
    'incomplete_mutton_wrap',
    'incomplete_salmon_roll',
    'incomplete_stuffed_potato',
    'incomplete_bacon_and_eggs',
    'incomplete_grilled_salmon',
    'incomplete_rice_roll_medley_block',
    'incomplete_roast_chicken_block',
    'incomplete_roasted_mutton_chops',
    'incomplete_shepherds_pie_block',
    'incomplete_steak_and_potatoes',
    'incomplete_blackstone'
  ]

  itemsToRemove.forEach(id => {
    item.remove(`kubejs:${id}`)
  })
})

// Hide Categories 
RecipeViewerEvents.removeCategories(event => {
  event.remove('apothic_enchanting:enchanting')
  event.remove('ftbquests:loot_crate')
  event.remove('ftbquests:quest')
  event.remove('simplelootviewer:archaeology')
  event.remove('simplelootviewer:block')
  event.remove('simplelootviewer:dispenser')
  event.remove('simplelootviewer:fishing')
  event.remove('simplelootviewer:hero')
  event.remove('simplelootviewer:loot_chest')
  event.remove('simplelootviewer:misc')
})

RecipeViewerEvents.addInformation('item', item =>{
  let fromMarket="Purchased from Market using Boss Tokens"
  let rit ="This item is obtained through a ritual. If you're playing multiplayer and can't see the recipe, please check the Alshanex's Familiars chapter in the quest book for an image list of the recipes. Alternatively, you can load a singleplayer world first, and then join the multiplayer server to view the recipes."
  item.add("crystal_chronicles:ice_shard", rit)
  item.add("crystal_chronicles:voidstone_shard", rit)
  item.add("crystal_chronicles:hemalite_shard", rit)
  item.add("crystal_chronicles:floralite_shard", rit)
  item.add("crystal_chronicles:voltite_shard", rit)
  item.add("crystal_chronicles:divinite_shard", rit)
  item.add("crystal_chronicles:volcanite_shard", rit)  
  item.add("alshanex_familiars:summoner_shard", rit)
  item.add("alshanex_familiars:archmage_shard", rit)
  item.add("alshanex_familiars:hunter_shard", rit)  
  item.add("alshanex_familiars:truth_mirror", rit)
  item.add("alshanex_familiars:druid_shard", rit)  
  item.add("alshanex_familiars:lightning_mage_shard", rit)  
  item.add("alshanex_familiars:mysterious_orb", rit)  
  item.add("hazennstuff:reinforced", rit)  
  item.add("hazennstuff:divine_mold", rit)
  item.add("hazennstuff:refined", rit)

  //other
  item.add("irons_spellbooks:decrepit_key", "Unlocks Citadel Vaults. Drops from Tyros boss.")
  item.add("irons_spellbooks:pyrium_ingot", "Can be found in Citadel vaults.")
  item.add("hazennstuff:fireblossom", " Found in Crimson Forests in the Nether.")
  item.add("irons_spellbooks:divine_soulshard", "Drops from Tyros, a tier-5 boss.")
 
  item.add("kubejs:forgotten_eye_fragment_core", "Drops from Warden")
  item.add("kubejs:forgotten_eye_fragment_shard", "Drops from Wither Skeleton")
  item.add("kubejs:forgotten_eye_fragment_cracked", "Drops from Elder Guardian")

  item.add("kubejs:cursed_eye_fragment_core", "Drops from The Gauntlet")
  item.add("kubejs:cursed_eye_fragment_shard", "Drops from Netherite Monstrosity")
  item.add("kubejs:cursed_eye_fragment_cracked", "Drops from The Death King")

  item.add("kubejs:lost_eye_fragment_core", "Drops from Starlight Golem")
  item.add("kubejs:lost_eye_fragment_shard", "Drops from Lunar Monstrosity")
  item.add("kubejs:lost_eye_fragment_cracked", "Obtained from the Quest Pass the Gatekeeper's Trial")

  item.add("kubejs:lich_eye_fragment_core", "Drops from The Night Lich")
  item.add("kubejs:lich_eye_fragment_shard", "Drops from The Harbinger")
  item.add("kubejs:lich_eye_fragment_cracked", fromMarket)

  item.add("kubejs:omen_eye_fragment_core", "Drops from Echo of Tyros, First Flamebearer")
  item.add("kubejs:omen_eye_fragment_shard", "Drops from Obsidilith")
  item.add("kubejs:omen_eye_fragment_cracked", "Drops from Void Blossom (This one is ok)")

  item.add("kubejs:gilded_eye_fragment_core", "Drops from The Leviathan")
  item.add("kubejs:gilded_eye_fragment_shard", "Drops from Ancient Remnant")
  item.add("kubejs:gilded_eye_fragment_cracked", "Drops from Scylla")

  item.add("kubejs:cryptic_eye_fragment_core", "Drops from Ignis")
  item.add("kubejs:cryptic_eye_fragment_shard", "Drops from Maledictus")
  item.add("kubejs:cryptic_eye_fragment_cracked", fromMarket)

  item.add("simplyswords:soulstealer", "Drops from Death King")
  item.add("simplyswords:wraithfang", "Drops from Death King")

  item.add("simplyswords:brimstone_claymore", "Drops from Netherite Monstrosity")
  item.add("simplyswords:molten_edge", "Drops from Netherite Monstrosity")

  item.add("simplyswords:frostfall", "Drops from The Gauntlet")
  item.add("simplyswords:watcher_claymore", "Drops from The Gauntlet")

  item.add("simplyswords:emberlash", "Drops from Lunar Monstrosity")
  item.add("simplyswords:toxic_longsword", "Drops from Lunar Monstrosity")

  item.add("simplyswords:stormbringer", "Drops from Starlight Golem")
  item.add("simplyswords:mjolnir", "Drops from Lunar Starlight Golem")

  item.add("simplyswords:slumbering_lichblade", "Drops from The Lich")
  item.add("simplyswords:soulrender", "Drops from The Lich")

  item.add("simplyswords:emberblade", "Drops from The Harbinger")
  item.add("simplyswords:ribboncleaver", "Drops from The Harbinger")

  item.add("simplyswords:bramblethorn", "Drops from Void Blossom")
  item.add("simplyswords:twisted_blade", "Drops from Void Blossom")

  item.add("simplyswords:flamewind", "Drops from Obsidilith")
  item.add("simplyswords:watching_warglaive", "Drops from Obsidilith")

  item.add("simplyswords:tempest", "Drops from Echo of Tyros, First Flamebearer")
  item.add("simplyswords:soulpyre", "Drops from Echo of Tyros, First Flamebearer")

  item.add("simplyswords:whisperwind", "Drops from Ancient Remnant")
  item.add("simplyswords:waxweaver", "Drops from Ancient Remnant")

  item.add("simplyswords:hiveheart", "Drops from The Leviathan")
  item.add("simplyswords:caelestis", "Drops from The Leviathan")

  item.add("simplyswords:dormant_relic", "Drops from Scylla")
  item.add("simplyswords:thunderbrand", "Drops from Scylla ")

  item.add("simplyswords:enigma", "Drops from Ignis")
  item.add("simplyswords:wickpiercer", "Drops from Ignis")

  item.add("simplyswords:storms_edge", "Drops from Maledictus")
  item.add("simplyswords:stars_edge", "Drops from Maledictus")

  item.add("simplyswords:hearthflame", "Drops from Ender Dragon")
  item.add("simplyswords:soulkeeper", "Drops from Ender Dragon")
  item.add("simplyswords:icewhisper", "Drops from Ender Dragon")
  item.add("simplyswords:arcanethyst", "Drops from Ender Dragon")
  item.add("simplyswords:shadowsting", "Drops from Ender Dragon")
  item.add("simplyswords:livyatan", "Drops from Ender Dragon")
  //34 total
  item.add("hazennstuff:overgrown_bone", "Drops from Bogged Zombies")
  item.add("hazennstuff:excalibur_fragment", "Drops from Dead King")

  item.add("garnished:vermilion_kelp", "Vermilion kelp be found in the Cold Ocean or Frozen Ocean")
  item.add("garnished:bok_choy", "Bok Choy can be found in Jungle Temples")

  // remove salt when fix recipe
  item.add('garnished:crushed_salt',"You need to use Mechanical Grindstone using Limestone")
  
  item.add('biomeswevegone:yucca_fruit',"Yuca grows on trees and can be found in biomes, such as Badlands variants, or Desert variants.")
  item.add('eternal_starlight:lunaris_cactus_fruit',"Grows on top of Lunaris Cactus. Can be found in the Crystallized Desert biome, and also grows on Twilight Sand in the Eternal Starlight dimension.")
  item.add('eternal_starlight:ether_bucket',"Found in Eternal Starlight dimension.")
  item.add('minecraft:brown_mushroom',"Grow using Warped or Crimson Nylium (farmable)")
})





// Language names
ClientEvents.lang("en_us", event => {
  global.EYES.forEach(eye => {
    event.renameItem(eye.id, eye.uiname);
  });
});

let dics =[
  'gamediscs:game_disc_rabbit',
  'gamediscs:game_disc_flappy_bird',
  'gamediscs:game_disc_slime',
  'gamediscs:game_disc_blocktris',
  'gamediscs:game_disc_pong',
  'gamediscs:game_disc_froggie',
  'gamediscs:game_disc_tnt_sweeper',
]


// Tooltips with order
ItemEvents.modifyTooltips(event => {
  global.EYES.forEach((eye, index) => {
    event.modify(eye.id, tooltip => {
      tooltip.removeLine(1);
      tooltip.insert(1, Text.of(`#${index + 1} Used to activate the End Portal.`).color(0xFFA5F7));
    });
  });
  
  global.EYES_CATA.forEach((eye) => {
    event.modify(eye, tooltip => {
      tooltip.insert(1, Text.of("This can't be used to locate the structure, only to respawn bosses.").red())
    })
  })

  dics.forEach((disc) => {
    event.modify(disc, tooltip => {
      tooltip.insert(1, Text.of('§7You need a gaming console to play the game.'))
    })
  })

  event.modify('kubejs:token_basic', tooltip => {
    tooltip.insert(1, Text.of('§7You\'ve taken your first steps, engineer.'))
    tooltip.insert(2, Text.of('§eUsable in §lCategory 1§r§e contracts.'))
  })

  event.modify('kubejs:token_medium', tooltip => {
    tooltip.insert(1, Text.of('§7Precision is your language.'))
    tooltip.insert(2, Text.of('§eUsable in §lCategory 2§r§e contracts.'))
  })

  event.modify('kubejs:token_advanced', tooltip => {
    tooltip.insert(1, Text.of('§7You command machines like no other.'))
    tooltip.insert(2, Text.of('§eUsable in §lCategory 3§r§e contracts.'))
  })
});
