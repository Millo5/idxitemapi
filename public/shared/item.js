import { div, html, p, getItemImageUrl } from "./htmlutil.js";
import { RARITY, isValidRarity } from "./rarity.js";
import { STAT } from "./stat.js";


/**
 * To create a new item type, add it to the ITEM_TYPES object.
 * Ensure it has a unique string identifier.
 * 
 * If required create a new class that extends the appropriate base class.
 * Keep in mind that the class here is only used as reference and are not instanciated directly.
 */

const ITEM_TYPES = {
    MATERIAL: 'material',

    // Instance must have either `attributes` or `stats`
    TRINKET: 'trinket',

    // Instance must have `attributes`
    CONSUMABLE: 'consumable',

    // Instance optionally has `attributes`
    OFFHAND: 'offhand',

    // Instance optionally has `attributes`
    MELEE_WEAPON: 'melee-weapon',
    RANGED_WEAPON: 'ranged-weapon',

    // Instance optionally has `attributes`
    HELMET: 'helmet',
    CHESTPLATE: 'chestplate',
    LEGGINGS: 'leggings',
    BOOTS: 'boots',

    // Reference requires `enchantment`
    ENCHANTMENT: 'enchantment',

    ARROW: 'arrow', // Arrow items, which can be used with bows or crossbows. They may have their own stats or attributes.

    UNIQUE: 'unique', // Unique items, with their own required supporting data, such as lore, attributes, etc.

    
    getAll() {
        return Object.values(this).filter(value => typeof value === 'string' && value !== 'getAll');
    },
    validate(item, type) {
        if (type === ITEM_TYPES.MELEE_WEAPON || type === ITEM_TYPES.RANGED_WEAPON) {
            if (item.stats && item.stats[STAT.ATTACK_SPEED]) {
                throw new Error(`Item of type ${type} cannot have attack-speed as a stat. Use weapon-attack-speed instead.`);
            }
        }
    }
}


class Item {


    validItemTypes() {
        return [
            ITEM_TYPES.MATERIAL,

            ITEM_TYPES.OFFHAND,

            ITEM_TYPES.MELEE_WEAPON,
            ITEM_TYPES.RANGED_WEAPON,

            ITEM_TYPES.HELMET,
            ITEM_TYPES.CHESTPLATE,
            ITEM_TYPES.LEGGINGS,
            ITEM_TYPES.BOOTS,

            ITEM_TYPES.UNIQUE
        ]
    }

    constructor(id) {
        this.id = id;
        this.name = null;
        this.description = null;
        this.material = null;
        this.itemType = ITEM_TYPES.MATERIAL;
        this.rarity = RARITY.COMMON;
        this.color = null;
        this.levelReq = 0;
        this.modeldata = null;


        this.setName = (name) => { this.name = name; return this; };
        this.setDescription = (description) => { this.description = description; return this; };
        this.setMaterial = (material) => { this.material = material; return this; };
        this.setColor = (color) => { this.color = color; return this; };
        this.setLevelReq = (levelReq) => { this.levelReq = levelReq; return this; };
        this.setModelData = (modeldata) => { this.modeldata = modeldata; return this; };
        
        /**
         * @default ITEM_TYPES.MATERIAL
         * 
         * @param {string} type - The item type to set. Must be one of the valid item types.
         * @throws {Error} If the item type is not valid.
         * @example
         * item.setItemType(ITEM_TYPES.MELEE_WEAPON);
         */
        this.setItemType = (type) => {
            if (!ITEM_TYPES.getAll().includes(type)) {
                throw new Error(`Invalid item type: ${type}`);
            }
            this.itemType = type;
            return this;
        };
        /**
         * @default RARITY.COMMON
         * @param {string} rarity - The rarity to set. Must be one of the valid rarities.
         * @throws {Error} If the rarity is not valid.
         * @example
         * item.setRarity(RARITY.RARE);
         *  */
        this.setRarity = (rarity) => {
            if (!isValidRarity(rarity)) {
                throw new Error(`Invalid rarity: ${rarity}`);
            }
            this.rarity = rarity;
            return this;
        };

    }

    validate() {
        if (!this.id) {
            throw new Error('Item must have an ID');
        }
        if (typeof this.id !== 'string' || this.id.trim() === '') {
            throw new Error('Item ID must be a non-empty string');
        }
        if (this.id.toLowerCase() !== this.id) {
            throw new Error('Item ID must be lowercase');
        }
        if (this.id.includes(' ')) {
            throw new Error('Item ID cannot contain spaces');
        }

        if (typeof this.name !== 'string' || this.name.trim() === '') {
            throw new Error('Item must have a valid name');
        }
        if (typeof this.description !== 'string') {
            throw new Error('Item must have a valid description');
        }
        if (typeof this.material !== 'string') {
            throw new Error('Item must have a valid material');
        }
        if (!ITEM_TYPES.getAll().includes(this.itemType)) {
            throw new Error(`Invalid item type: ${this.itemType}`);
        }
        if (this.validItemTypes().indexOf(this.itemType) === -1) {
            throw new Error(`Item type ${this.itemType} is not valid for this item`);
        }
        if (typeof this.rarity !== 'string' || !isValidRarity(this.rarity)) {
            throw new Error(`Invalid rarity: ${this.rarity}`);
        }
        if (typeof this.levelReq !== 'number' || this.levelReq < 0) {
            throw new Error('Item level requirement must be a non-negative number');
        }
        if (this.modeldata && (typeof this.modeldata !== 'number' || this.modeldata < 0)) {
            throw new Error('Item model data must be a non-negative number');
        }

        if (this.color && (typeof this.color !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(this.color))) {
            throw new Error('Item color must be a valid hex color code');
        }
        ITEM_TYPES.validate(this, this.itemType);
    }

    toJSON() {
        this.validate();

        const { id, name, description, material } = this;
        const json = {
            id,
            name,
            description,
            material
        };
        if (this.itemType && this.itemType !== ITEM_TYPES.MATERIAL) {
            json["item-type"] = this.itemType;
        }
        if (this.rarity && isValidRarity(this.rarity) && this.rarity !== RARITY.COMMON) {
            json.rarity = this.rarity;
        }
        if (this.color) {
            json.color = this.color;
        }
        if (this.levelReq && this.levelReq > 0) {
            json.levelReq = this.levelReq;
        }
        if (this.modeldata && this.modeldata > 0) {
            json.modeldata = this.modeldata;
        }
        return json;
    }

    toHTML() {
        const card = div('card item');

        const url = getItemImageUrl(this.material);

        const selection = div('selection');
        card.onclick = () => {
            selection.classList.toggle('selected');
        }
        selection.setAttribute('data-id', this.id);

        card.append(
            div('row',
                p('id', (this.levelReq > 0) ? `Lv. ${this.levelReq} ${this.rarity}` : `${this.rarity}`),
                selection
            ),
            html('img', this.modeldata ? 'changed' : '', { src: url, alt: this.name } ),
            html('h3', '', { textContent: this.name } ),
            html('p', '', { textContent: this.description } ),
            div('row', 
                p('id', `${this.id}`),
                p('id', `${this.itemType}`),
            )
        )

        return card;
    }
}

class StatsItem extends Item {

    validItemTypes() {
        return [
            ITEM_TYPES.TRINKET,

            ITEM_TYPES.OFFHAND,

            ITEM_TYPES.MELEE_WEAPON,
            ITEM_TYPES.RANGED_WEAPON,

            ITEM_TYPES.HELMET,
            ITEM_TYPES.CHESTPLATE,
            ITEM_TYPES.LEGGINGS,
            ITEM_TYPES.BOOTS,

            ITEM_TYPES.UNIQUE
        ]
    }

    constructor(id) {
        super(id);
        this.stats = {};

        this.setStats = (...stats) => {
            if (!stats || stats.length === 0) {
                throw new Error(id + ' Stats must be an array of [string, number] pairs or an object');
            }
            
            if (typeof stats[0] === 'object' && !Array.isArray(stats[0])) {
                this.stats = stats[0];
                return this;
            }
            
            // array of [string, number] pairs
            if (!Array.isArray(stats) || stats.length % 2 !== 0) {
                throw new Error(id + ' Stats must be an array of [string, number] pairs got: ' + JSON.stringify(stats));
            }
            this.stats = {};

            for (let i = 0; i < stats.length; i += 2) {
                const key = stats[i];
                const value = stats[i + 1];

                if (typeof key !== 'string' || typeof value !== 'number') {
                    throw new Error('Stats must be an array of [string, number] pairs, got: ' + JSON.stringify(stats));
                }
                this.stats[key] = value;
            }
            
            return this; 
        }
    }

    validate() {
        super.validate();
        if (typeof this.stats !== 'object' || Array.isArray(this.stats)) {
            throw new Error('Stats must be an object');
        }
        if (this.stats) {
            for (const [key, value] of Object.entries(this.stats)) {
                if (typeof key !== 'string' || !STAT.getAll().includes(key)) {
                    throw new Error(`Invalid stat key: ${key}`);
                }
                if (typeof value !== 'number') {
                    throw new Error(`Invalid stat value for ${key}: ${value}`);
                }
            }
        }
    }

    toJSON() {
        try {
            this.validate();
        } catch (error) {
            throw new Error(`Invalid item data for ID ${this.id}: ${error.message}`);
        }

        const baseJson = super.toJSON();
        baseJson.stackable = false;

        if (Object.keys(this.stats).length === 0) {
            return baseJson; // No stats to include
        }

        return {
            ...baseJson,
            stats: this.stats
        };
    }

    toHTML() {
        const card = super.toHTML();

        // Add stats display
        const statsDiv = div('stat-container');
        for (const [key, value] of Object.entries(this.stats)) {
            statsDiv.append(p('stat', `${key}: ${value}`));
        }
        card.append(statsDiv);

        return card;
    }
}

/**
 * An item that with initial attributes.
 */
class AttributedItem extends StatsItem {

    validItemTypes() {
        return [
            ITEM_TYPES.TRINKET,
            ITEM_TYPES.OFFHAND,

            ITEM_TYPES.MELEE_WEAPON,
            ITEM_TYPES.RANGED_WEAPON,

            ITEM_TYPES.HELMET,
            ITEM_TYPES.CHESTPLATE,
            ITEM_TYPES.LEGGINGS,
            ITEM_TYPES.BOOTS,

            ITEM_TYPES.ARROW,
            ITEM_TYPES.CONSUMABLE
        ];
    }

    constructor(id) {
        super(id);
        this.attributes = [];
        this.enchantSlots = 0;

        this.setAttributes = (...attributes) => {
            if (!Array.isArray(attributes)) {
                throw new Error('Attributes must be an array');
            }
            this.attributes = attributes;
            return this;
        }
        this.setEnchantSlots = (enchantSlots) => { this.enchantSlots = enchantSlots; return this; };
    }

    validate() {
        super.validate();
        if (!Array.isArray(this.attributes)) {
            throw new Error('Attributes must be an array');
        }
        this.attributes.forEach(attr => {
            if (typeof attr !== 'string') {
                throw new Error(`Invalid attribute: ${attr}`);
            }
        });
        if (typeof this.enchantSlots !== 'number' || this.enchantSlots < 0) {
            throw new Error('Enchant slots can\'t be negative!');
        }
    }

    toJSON() {
        this.validate();

        const baseJson = super.toJSON();
        if (this.attributes && this.attributes.length > 0) {
            baseJson.attributes = this.attributes;
        }

        if (this.enchantSlots > 0) {
            baseJson.enchantSlots = this.enchantSlots;
        }

        return baseJson;
    }


    toHTML() {
        const card = super.toHTML();

        if (this.attributes && this.attributes.length > 0) {
            const attributesDiv = div('row',
                p('id', 'Attributes:')
            );
            this.attributes.forEach(attr => {
                attributesDiv.append(p('id', attr));
            });
            card.append(attributesDiv);
        }

        if (this.enchantSlots > 0) {
            card.append(p('id', `Enchant Slots: ${this.enchantSlots}`));
        }

        return card;
    }

}


class EnchantmentItem extends Item {
    constructor(id, enchantment) {
        super(id);
        this.enchantment = enchantment;
        this.setItemType(ITEM_TYPES.ENCHANTMENT);
    }

    validate() {
        super.validate();
        if (typeof this.enchantment !== 'string') {
            throw new Error('Enchantment must be a string');
        }
    }

    toJSON() {
        this.validate();

        const baseJson = super.toJSON();
        return {
            ...baseJson,
            enchantment: this.enchantment
        };
    }
}


function deserialiseItem(data) {
    if (!data || !data.id) {
        throw new Error('Invalid item data');
    }

    const setBasicItemProperties = (item, data) => {
        if (data.name) item.setName(data.name);
        if (data.description) item.setDescription(data.description);
        if (data.material) item.setMaterial(data.material);
        if (data["item-type"]) item.setItemType(data["item-type"]);
        if (data.rarity && isValidRarity(data.rarity)) item.setRarity(data.rarity);
        if (data.color) item.setColor(data.color);
        if (data.levelReq && typeof data.levelReq === 'number') item.setLevelReq(data.levelReq);
        if (data.modeldata && typeof data.modeldata === 'number') item.setModelData(data.modeldata);
    }

    if (data.stats || data.attributes) {
        if (data.attributes && Array.isArray(data.attributes)) {
            const item = new AttributedItem(data.id);
            setBasicItemProperties(item, data);
            if (data.stats && typeof data.stats === 'object') {
                item.setStats(data.stats);
            }
            item.attributes = data.attributes;

            if (data.enchantSlots && typeof data.enchantSlots === 'number') {
                item.setEnchantSlots(data.enchantSlots);
            }

            return item;
        }

        const item = new StatsItem(data.id);
        setBasicItemProperties(item, data);

        if (data.stats && typeof data.stats === 'object') {
            item.setStats(data.stats);
        }
        return item;
    }

    if (data.enchantment) {
        const item = new EnchantmentItem(data.id, data.enchantment);
        setBasicItemProperties(item, data);
        return item;
    }

    const item = new Item(data.id);
    setBasicItemProperties(item, data);
    return item;
}

export {
    ITEM_TYPES,
    Item,
    StatsItem,
    AttributedItem,
    EnchantmentItem,
    deserialiseItem
}