import { Attribute, ATTRIBUTE_TARGET, ATTRIBUTE_TYPE } from "../public/shared/attribute.js";
import { TRIGGER } from "../public/shared/triggers.js";
import { Data } from "./data.js";


/**
 * 
 * @param {Data} data 
 */
export default function inject(data) {

    data.addAttribute(
        new Attribute("weighted")
            .setName("Weighted")
            .setDescription("Slows you down when worn.")
            .setMaterial("anvil")
            .setType(ATTRIBUTE_TYPE.CURSE)
            .setTarget(ATTRIBUTE_TARGET.ARMOR)
            .setStats({
                "movement_speed": -0.1
            })
    )

    data.addAttribute(
        new Attribute("achilles-heel")
            .setName("Achilles' Heel")
            .setDescription("Increases damage taken by 20%.")
            .setMaterial("golden_apple")
            .setType(ATTRIBUTE_TYPE.CURSE)
            .setTarget(ATTRIBUTE_TARGET.ARMOR)
            .setTriggers(TRIGGER.HURT)
    );

    data.addAttribute(
        new Attribute("Heavy")
            .setName("Heavy")
            .setDescription("Slows melee weapon swing speed.")
            .setMaterial("iron_block")
            .setType(ATTRIBUTE_TYPE.CURSE)
            .setTarget(ATTRIBUTE_TARGET.MELEE_WEAPON)
            .setStats({
                "attack_speed": -0.2
            })
    )

    data.addAttribute(
        new Attribute("Two Handed")
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
            .setStats({
                "knockback": 1
            })
    )
    data.addAttribute(
        new Attribute("sharp")
            .setName("Sharp")
            .setDescription("Increases the damage of melee weapons.")
            .setMaterial("diamond_sword")
            .setType(ATTRIBUTE_TYPE.ENCHANTMENT)
            .setTarget(ATTRIBUTE_TARGET.MELEE_WEAPON)
            .setStats({
                "damage": 2
            })
    );
    data.addAttribute(
        new Attribute("plated")
            .setName("Plated")
            .setDescription("Increases armor value of armor pieces.")
            .setMaterial("oak_pressure_plate")
            .setType(ATTRIBUTE_TYPE.ENCHANTMENT)
            .setTarget(ATTRIBUTE_TARGET.ARMOR)
            .setStats({
                "defense": 2
            })
    )

    data.save();
}
