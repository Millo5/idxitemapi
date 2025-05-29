const { RARITY, isValidRarity } = require("./rarity");
const { TRIGGER, isValidTrigger } = require("./triggers");


const ATTRIBUTE_TYPE = {
    ATTRIBUTE: 'attribute',
    ENCHANTMENT: 'enchantment',
    CURSE: 'curse',

    getAll() {
        return Object.values(this).filter(value => typeof value === 'string');
    }
}

const ATTRIBUTE_TARGET = {
    ANY: 'any',
    
    TRINKET: 'trinket',
    OFFHAND: 'offhand',

    EQUIPMENT: 'equipment', // Any weapon or armor piece
    ARMOR: 'armor',
    HELMET: 'helmet',
    CHESTPLATE: 'chestplate',
    LEGGINGS: 'leggings',
    BOOTS: 'boots',
    
    WEAPON: 'weapon',
    MELEE_WEAPON: 'melee-weapon',
    RANGED_WEAPON: 'ranged-weapon',
    
    CONSUMABLE: 'consumable',

    getAll() {
        return Object.values(this).filter(value => typeof value === 'string');
    }
}


class Attribute {
    constructor(id) {
        this.id = id;
        this.name = null;
        this.description = null;
        this.rarity = RARITY.COMMON;
        this.material = null;

        this.triggers = [];
        this.type = ATTRIBUTE_TYPE.ATTRIBUTE;
        this.target = ATTRIBUTE_TARGET.ANY;



        this.setName = (name) => { this.name = name; return this; };
        this.setDescription = (description) => { this.description = description; return this; };
        this.setRarity = (rarity) => { 
            if (!isValidRarity(rarity)) {
                throw new Error(`Invalid rarity: ${rarity}`);
            }
            this.rarity = rarity; 
            return this; 
        };
        this.setMaterial = (material) => { this.material = material; return this; };
        this.setTriggers = (...triggers) => {
            if (!isValidTrigger(triggers)) {
                throw new Error(`Invalid trigger in triggers: ${triggers}`);
            }
            this.triggers = triggers; 
            return this; 
        };
        this.setType = (type) => {
            if (!Object.values(ATTRIBUTE_TYPE).includes(type)) {
                throw new Error(`Invalid type: ${type}`);
            }
            this.type = type; 
            return this; 
        };
        this.setTarget = (target) => {
            if (!Object.values(ATTRIBUTE_TARGET).includes(target)) {
                throw new Error(`Invalid target: ${target}`);
            }
            this.target = target; 
            return this; 
        };
    }

    validate() {
        if (!this.id) {
            throw new Error('Attribute must have an ID');
        }
        if (typeof this.name !== 'string' || this.name.trim() === '') {
            throw new Error('Attribute must have a valid name');
        }
        if (typeof this.description !== 'string') {
            throw new Error('Attribute must have a valid description');
        }
        if (!isValidRarity(this.rarity)) {
            throw new Error(`Invalid rarity: ${this.rarity}`);
        }
        if (!this.material || typeof this.material !== 'string') {
            throw new Error('Attribute must have a valid material');
        }
        if (!Array.isArray(this.triggers)) {
            throw new Error('Triggers must be an array');
        }
        if (this.type && !Object.values(ATTRIBUTE_TYPE).includes(this.type)) {
            throw new Error(`Invalid type: ${this.type}`);
        }
        if (this.triggers.some(trigger => !TRIGGER.getAll().includes(trigger))) {
            throw new Error(`Invalid trigger in triggers: ${this.triggers}`);
        }
        if (this.target && !Object.values(ATTRIBUTE_TARGET).includes(this.target)) {
            throw new Error(`Invalid target: ${this.target}`);
        }
    }
    
    toJSON() {
        this.validate();

        const { id, name, description, material } = this;
        const result = {id, name, description, material};

        if (this.triggers.length > 0) {
            result.triggers = this.triggers;
        }
        if (this.type && this.type !== ATTRIBUTE_TYPE.ATTRIBUTE) {
            result["attribute-type"] = this.type;
        }
        if (this.target && this.target !== ATTRIBUTE_TARGET.ANY) {
            result.target = this.target;
        }
        if (isValidRarity(this.rarity) && this.rarity !== RARITY.COMMON) {
            result.rarity = this.rarity;
        }
        
        return result;
    }
}



module.exports = {
    Attribute,
    ATTRIBUTE_TYPE,
    ATTRIBUTE_TARGET,

    deserialiseAttribute(data) {
        if (!data || !data.id) {
            throw new Error('Invalid attribute data');
        }
        
        const attribute = new Attribute(data.id);
        if (data.name) attribute.setName(data.name);
        if (data.description) attribute.setDescription(data.description);
        if (data.material) attribute.setMaterial(data.material);
        if (data.rarity) attribute.setRarity(data.rarity);
        if (data["attribute-type"]) {
            attribute.setType(data["attribute-type"]);
        }
        if (data.target) attribute.setTarget(data.target);
        if (data.rarity) attribute.setRarity(data.rarity);
        
        if (data.triggers) {
            attribute.setTriggers(...data.triggers);
        }

        return attribute;
    }
};