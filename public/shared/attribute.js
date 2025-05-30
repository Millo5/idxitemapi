import { RARITY, isValidRarity } from './rarity.js';
import { TRIGGER, isValidTrigger } from './triggers.js';
import { div, p, html, getItemImageUrl } from './htmlutil.js';


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
        this.stats = {};


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
        this.setStats = (stats) => {
            if (typeof stats !== 'object' || Array.isArray(stats)) {
                throw new Error('Stats must be an object');
            }
            this.stats = stats;
            return this; 
        }
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
        if (this.stats && (typeof this.stats !== 'object' || Array.isArray(this.stats))) {
            throw new Error('Stats must be an object');
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
        if (Object.keys(this.stats).length > 0) {
            result.stats = this.stats;
        }
        
        return result;
    }

    toHTML() {
        const card = div('card attribute');
        const selection = div('selection');
        card.onclick = () => {
            selection.classList.toggle('selected');
        }
        selection.setAttribute('data-id', this.id);

        const url = getItemImageUrl(this.material);
        card.append(
            div('row',
                p('id', `${this.rarity}`),
                selection
            ),
            html('img', '', { src: url, alt: this.name }),
            html('h3', '', { textContent: this.name }),
            html('p', '', { textContent: this.description }),
            div('row',
                p('id', `${this.id}`),
                p('id', `${this.type}`)
            ),
            div('row',
                p('id', `${this.target}`),
                p('id', `${this.triggers.join(', ')}`)
            )
        );

        return card;
    }
}

function deserialiseAttribute(data) {
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

    if (data.stats) {
        attribute.setStats(data.stats);
    }

    return attribute;
}


export {
    Attribute,
    ATTRIBUTE_TYPE,
    ATTRIBUTE_TARGET,
    deserialiseAttribute
}