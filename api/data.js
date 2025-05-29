const { Item, deserialiseItem } = require("../shared/item");


class Data {
    constructor(filename) {
        this.items = {};
        this.attributes = {};
        this.datafile = filename
    }

    load() {

        const fs = require('fs');
        if (!fs.existsSync(this.datafile)) {
            throw new Error(`Data file ${this.datafile} does not exist`);
        }
        const fileContent = fs.readFileSync(this.datafile, 'utf8');
        let data;
        try {
            data = JSON.parse(fileContent);
        } catch (error) {
            throw new Error(`Error parsing data file: ${error.message}`);
        }

        
        if (!data || !data.items || !data.attributes) {
            throw new Error('Invalid data format');
        }

        data.items.forEach(itemData => {
            const item = deserialiseItem(itemData);
            this.addItem(item);
        });

        data.attributes.forEach(attrData => {
            const attribute = new Attribute(attrData.id)
                .setName(attrData.name)
                .setDescription(attrData.description)
                .setRarity(attrData.rarity)
                .setMaterial(attrData.material)
                .setType(attrData.type)
                .setTarget(attrData.target)
                .setTriggers(attrData.triggers);
            this.addAttribute(attribute);
        });
    }

    save() {
        const fs = require('fs');
        const dataToSave = this.toJSON();
        fs.writeFileSync(this.datafile, JSON.stringify(dataToSave, null, 2), 'utf8');
    }

    // ---

    
    addItem(item) {
        if (!item || !item.id || !(item instanceof Item)) {
            throw new Error('Invalid item data');
        }
        this.items[item.id] = item;
    }
    
    getItems() {
        return Object.values(this.items);
    }

    getItem(id) {
        if (!id || !this.items[id]) {
            throw new Error(`Item with id ${id} does not exist`);
        }
        return this.items[id];
    }


    addAttribute(attribute) {
        if (!attribute || !attribute.id) {
            throw new Error('Invalid attribute data');
        }
        this.attributes[attribute.id] = attribute;
    }

    getAttributes() {
        return Object.values(this.attributes);
    }
    
    getAttribute(id) {
        if (!id || !this.attributes[id]) {
            throw new Error(`Attribute with id ${id} does not exist`);
        }
        return this.attributes[id];
    }

    
    clear() {
        this.items = {};
        this.attributes = {};
    }


    toJSON() {
        return {
            items: Object.values(this.items).map(item => item.toJSON()),
            attributes: Object.values(this.attributes).map(attr => attr.toJSON())
        };
    }
}


module.exports = {
    Data
}