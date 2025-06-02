import { Attribute, ATTRIBUTE_TARGET, ATTRIBUTE_TYPE } from "../public/shared/attribute.js";
import { AttributedItem, ITEM_TYPES, StatsItem } from "../public/shared/item.js";
import { RARITY } from "../public/shared/rarity.js";
import { STAT } from "../public/shared/stat.js";
import { TRIGGER } from "../public/shared/triggers.js";
import { Data } from "./data.js";


/**
 * 
 * @param {Data} data 
 */
export default function inject(data) {

    /// Test items and attributes

    data.addAttribute(
        new Attribute("power-pallet")
            .setName("Power Pallet")
            .setDescription("A powerful item that boosts your stats significantly.")
            .setMaterial("diamond_block")
            .setType(ATTRIBUTE_TYPE.ATTRIBUTE)
            .setTarget(ATTRIBUTE_TARGET.OFFHAND)
            .setTriggers(TRIGGER.HURT)
            .setStats(
                STAT.DAMAGE, 10,
                STAT.ATTACK_SPEED, 2,
                STAT.DEFENSE, 5,
                STAT.HEALTH, 20,
                STAT.MOVE_SPEED, 100,
                STAT.CRIT_CHANCE, 100,
                STAT.CRIT_DAMAGE, 200,
                STAT.KNOCKBACK, 50,
                STAT.LUCK, 1
            )
            .setRarity(RARITY.DEVELOPER)
    )

    data.addAttribute(
        new Attribute("lightning-powered")
            .setName("Lightning Powered")
            .setDescription("A powerful enchantment that strikes lightning on hit.")
            .setMaterial("lightning_rod")
            .setType(ATTRIBUTE_TYPE.ENCHANTMENT)
            .setTarget(ATTRIBUTE_TARGET.MELEE_WEAPON)
            .setTriggers(TRIGGER.HIT)
            .setStats(
                STAT.DAMAGE, 5,
                STAT.WEAPON_ATTACK_SPEED, 1.5,

                STAT.CRIT_CHANCE, 20
            )
            .setRarity(RARITY.LEGENDARY)
    )

    data.addItem(
        new AttributedItem("madam-legs")
            .setName("Madam 8 Legs")
            .setDescription("A pair of enchanted legs that allow you to move faster.")
            .setMaterial("diamond_leggings")
            .setItemType(ITEM_TYPES.LEGGINGS)
            .setRarity(RARITY.EPIC)
            .setEnchantSlots(4)
            .setStats(
                STAT.DEFENSE, 10,
                STAT.HEALTH, 5,
                STAT.MOVE_SPEED, 25,
                STAT.CRIT_CHANCE, 25,
                STAT.ATTACK_SPEED, 25
            )
    )


    data.addItem(
        new AttributedItem("clydes-blade")
            .setName("Clyde's Blade")
            .setDescription("A blade that seems to have a mind of its own, it can be quite dangerous.")
            .setMaterial("armor_stand")
            .setItemType(ITEM_TYPES.MELEE_WEAPON)
            .setRarity(RARITY.DEVELOPER)
            .setAttributes("sharp", "sword-slash", "two-handed")
            .setEnchantSlots(3)
            .setLevelReq(2)
            .setStats(
                STAT.DAMAGE, 8,
                STAT.WEAPON_ATTACK_SPEED, 1.6,
                
                STAT.DEFENSE, 2,
                STAT.HEALTH, 2,
                STAT.MOVE_SPEED, 40,
                STAT.CRIT_CHANCE, 40,
                STAT.CRIT_DAMAGE, 50,
                STAT.KNOCKBACK, -40,
                STAT.LUCK, 0.2
            )
    );



    // Items

    data.addAttribute(
        new Attribute("sword-slash")
            .setName("Sword Slash")
            .setDescription("A three hit swing combo.")
            .setMaterial("iron_sword")
            .setType(ATTRIBUTE_TYPE.ATTRIBUTE)
            .setTarget(ATTRIBUTE_TARGET.MELEE_WEAPON)
    )


    data.addAttribute(
        new Attribute("weighted")
            .setName("Weighted")
            .setDescription("Slows you down when worn.")
            .setMaterial("anvil")
            .setType(ATTRIBUTE_TYPE.CURSE)
            .setTarget(ATTRIBUTE_TARGET.ARMOR)
            .setStats(
                STAT.MOVE_SPEED, -0.2
            )
    )

    data.addAttribute(
        new Attribute("achilles-heel")
            .setName("Achilles' Heel")
            .setDescription("Increases damage taken by 20%.")
            .setMaterial("chainmail_boots")
            .setType(ATTRIBUTE_TYPE.CURSE)
            .setTarget(ATTRIBUTE_TARGET.ARMOR)
            .setTriggers(TRIGGER.HURT)
    );

    data.addAttribute(
        new Attribute("heavy")
            .setName("Heavy")
            .setDescription("Slows melee weapon swing speed.")
            .setMaterial("iron_block")
            .setType(ATTRIBUTE_TYPE.CURSE)
            .setTarget(ATTRIBUTE_TARGET.MELEE_WEAPON)
            .setStats(
                STAT.ATTACK_SPEED, -0.2
            )
    )

    data.addAttribute(
        new Attribute("two-handed")
            .setName("Two Handed")
            .setDescription("Requires both hands to wield, remove offhand items to use.")
            .setMaterial("lever")
            .setType(ATTRIBUTE_TYPE.CURSE)
            .setTarget(ATTRIBUTE_TARGET.MELEE_WEAPON)
    )

    // common

    data.addAttribute(
        new Attribute("pushback")
            .setName("Pushback")
            .setDescription("Pushes the target back on hit.")
            .setMaterial("piston")
            .setType(ATTRIBUTE_TYPE.ENCHANTMENT)
            .setTarget(ATTRIBUTE_TARGET.MELEE_WEAPON)
            .setStats(
                STAT.KNOCKBACK, 1
            )
    )
    data.addAttribute(
        new Attribute("sharp")
            .setName("Sharp")
            .setDescription("Increases the damage of melee weapons.")
            .setMaterial("wooden_sword")
            .setType(ATTRIBUTE_TYPE.ENCHANTMENT)
            .setTarget(ATTRIBUTE_TARGET.MELEE_WEAPON)
            .setStats(
                STAT.DAMAGE, 1.5
            )
    );
    data.addAttribute(
        new Attribute("plated")
            .setName("Plated")
            .setDescription("Increases armor value of armor pieces.")
            .setMaterial("oak_pressure_plate")
            .setType(ATTRIBUTE_TYPE.ENCHANTMENT)
            .setTarget(ATTRIBUTE_TARGET.ARMOR)
            .setStats(
                STAT.DEFENSE, 2
            )
    )



    data.addItem(
        new StatsItem("wooden-shiv")
            .setName("Wooden Shiv")
            .setDescription("A simple wooden blade, not very effective.")
            .setMaterial("wooden_sword")
            .setItemType(ITEM_TYPES.MELEE_WEAPON)
            .setStats(
                STAT.DAMAGE, 1,
                STAT.WEAPON_ATTACK_SPEED, 3.1
            )
    )

    data.addAttribute(
        new Attribute("recursion")
            .setName("Recursion")
            .setDescription("A strange enchantment that allows you to duplicate actions.")
            .setMaterial("ender_pearl")
            .setRarity(RARITY.MYTHIC)
            .setType(ATTRIBUTE_TYPE.ENCHANTMENT)
            .setTarget(ATTRIBUTE_TARGET.ARMOR)
    )

    data.addItem(
        new AttributedItem("illusioners-hood")
            .setName("Illusioner's Hood")
            .setDescription("A hood worn by illusioners, it has a strange aura.")
            .setMaterial("leather_helmet")
            .setColor("#00a0a0")
            .setItemType(ITEM_TYPES.HELMET)
            .setRarity(RARITY.MYTHIC)
            .setAttributes("recursion")
            .setEnchantSlots(1)
            .setStats(
                STAT.DEFENSE, 8,
                STAT.HEALTH, 4
            )
    )

    data.addAttribute(
        new Attribute("grapple")
            .setName("Grapple")
            .setDescription("Allows you to grapple onto surfaces, useful for climbing or swinging across gaps.")
            .setMaterial("lead")
            .setType(ATTRIBUTE_TYPE.ATTRIBUTE)
            .setTarget(ATTRIBUTE_TARGET.CONSUMABLE)
            .setTriggers(TRIGGER.USE)
    )

    data.addItem(
        new AttributedItem("rope")
            .setName("Rope")
            .setDescription("A long piece of rope, useful for climbing.")
            .setMaterial("lead")
            .setItemType(ITEM_TYPES.CONSUMABLE)
            .setRarity(RARITY.COMMON)
            .setAttributes("grapple")
    )
    


    data.save();
}
