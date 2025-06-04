import { Item, deserialiseItem } from "../public/shared/item.js";
import { Attribute, deserialiseAttribute } from "../public/shared/attribute.js";
import fs from 'fs';


class Data {
    constructor(filename) {
        this.items = {};
        this.attributes = {};
        this.datafile = filename
        this.loaded = false;
    }

    load() {

        if (!fs.existsSync(this.datafile)) {
            fs.writeFileSync(this.datafile, JSON.stringify({ items: [], attributes: [] }, null, 2), 'utf8');
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
            const attribute = deserialiseAttribute(attrData);
            this.addAttribute(attribute);
        });

        console.log("\nValidating data...")
        // Validate
        Object.values(this.items).forEach(item => {
            try {
                item.validate(); // Ensure each item is valid
            } catch (error) {
                console.error(`Invalid item data for ID ${item.id}: ${error.message}`);
            }
        });

        Object.values(this.attributes).forEach(attr => {
            try {
                attr.validate(); // Ensure each attribute is valid
            } catch (error) {
                console.error(`Invalid attribute data for ID ${attr.id}: ${error.message}`);
            }
        });
        console.log("Data loaded and validated.\n");

        this.loaded = true;
    }

    save() {
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
            return null;
        }
        return this.items[id];
    }

    updateItem(id, item) {
        item.validate(); // Ensure the item data is valid
        this.items[id] = item;
    }

    removeItem(id) {
        if (!id || !this.items[id]) {
            throw new Error(`Item with id ${id} does not exist`);
        }
        delete this.items[id];
    }


    addAttribute(attribute) {
        if (!attribute || !attribute.id || !(attribute instanceof Attribute)) {
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

    removeAttribute(id) {
        if (!id || !this.attributes[id]) {
            throw new Error(`Attribute with id ${id} does not exist`);
        }
        delete this.attributes[id];
    }

    updateAttribute(id, attributeData) {
        if (!id || !this.attributes[id]) {
            throw new Error(`Attribute with id ${id} does not exist`);
        }
        const attribute = deserialiseAttribute(attributeData);
        attribute.validate(); // Ensure the attribute data is valid
        this.attributes[id] = attribute;
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


export {
    Data
}