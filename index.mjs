import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { Item, StatsItem, deserialiseItem } from "./public/shared/item.js";
import { Attribute, ATTRIBUTE_TYPE, ATTRIBUTE_TARGET, deserialiseAttribute } from "./public/shared/attribute.js";
import { TRIGGER } from "./public/shared/triggers.js";
import { Data } from "./api/data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data.json");


const data = new Data(DATA_FILE);

// if data.json does not exist, create it with an empty array
try {
    data.load();
} catch (error) {
    console.error("Error loading data:", error.message);
    console.error("Creating new data file...");
    fs.writeFileSync(DATA_FILE, JSON.stringify(data.toJSON(), null, 2));
}

/////// ------------------------ ///////

// var item = new Item("bone")
//     .setName("Bone")
//     .setDescription("I used to be a femur")
//     .setMaterial("bone")
// console.log(item.toJSON());

// var item3 = new StatsItem("wooden-targe")
//     .setName("Wooden Targe")
//     .setDescription("A small wooden shield.")
//     .setMaterial("oak_slab")
//     .setStats({
//         "armor": 5,
//     })
// console.log(item3.toJSON());


// var attribute = new Attribute("sharp")
//     .setName("Sharp")
//     .setDescription("Increases the damage of melee weapons.")
//     .setMaterial("wooden_sword")
//     .setType(ATTRIBUTE_TYPE.ENCHANTMENT)
//     .setTarget(ATTRIBUTE_TARGET.MELEE_WEAPON)
// console.log(attribute.toJSON());

// var attribute2 = new Attribute("cursebound")
//     .setName("Cursebound")
//     .setDescription("This item cannot be dropped.")
//     .setMaterial("weeping_vines")
//     .setType(ATTRIBUTE_TYPE.CURSE)
//     .setTriggers(TRIGGER.DROP)
// console.log(attribute2.toJSON());

// var attribute3 = new Attribute("frostbite")
//     .setName("Frostbite")
//     .setDescription("Slows down the target on hit.")
//     .setMaterial("snow_block")
//     .setType(ATTRIBUTE_TYPE.ENCHANTMENT)
//     .setTarget(ATTRIBUTE_TARGET.WEAPON)
//     .setTriggers(TRIGGER.HIT, TRIGGER.PASSIVE)
// console.log(attribute3.toJSON());

// [item, item3].forEach(i => data.addItem(i));
// [attribute, attribute2, attribute3].forEach(a => data.addAttribute(a));
// data.save();

/////// ------------------------ ///////

app.use(express.json());
app.use(express.static("public"));

// Route to get all items
app.get("/api/items", (req, res) => {
    const items = data.getItems();
    res.json(items.map(item => item.toJSON()));
});
app.get("/api/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = data.getItem(itemId);
    if (!item) {
        return res.status(404).send("Item not found");
    }
    res.json(item);
});
app.post("/api/items", (req, res) => {
    const itemData = req.body;
    if (!itemData || !itemData.id) {
        return res.status(400).send("Invalid item data");
    }

    try {
        const newItem = deserialiseItem(itemData);
        newItem.validate();

        data.addItem(newItem);
        data.save();
    } catch (error) {
        return res.status(400).send(`Error validating item: ${error.message}`);
    }
    
    res.status(201).json(newItem.toJSON());
});
app.delete("/api/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = data.getItem(itemId);
    if (!item) {
        return res.status(404).send("Item not found");
    }
    
    data.removeItem(itemId);
    data.save();
    
    res.status(204).send(); // No content
});


app.get("/api/attributes", (req, res) => {
    const attributes = data.getAttributes();
    res.json(attributes.map(attr => attr.toJSON()));
});
app.get("/api/attributes/:id", (req, res) => {
    const attributeId = req.params.id;
    const attribute = data.getAttribute(attributeId);
    if (!attribute) {
        return res.status(404).send("Attribute not found");
    }
    res.json(attribute);
});
app.post("/api/attributes", (req, res) => {
    const attributeData = req.body;
    if (!attributeData || !attributeData.id) {
        return res.status(400).send("Invalid attribute data");
    }

    try {
        const newAttribute = deserialiseAttribute(attributeData);
        newAttribute.validate();

        data.addAttribute(newAttribute);
        data.save();
    } catch (error) {
        return res.status(400).send(`Error validating attribute: ${error.message}`);
    }
    
    res.status(201).json(newAttribute.toJSON());
});
app.delete("/api/attributes/:id", (req, res) => {
    const attributeId = req.params.id;
    const attribute = data.getAttribute(attributeId);
    if (!attribute) {
        return res.status(404).send("Attribute not found");
    }
    
    data.removeAttribute(attributeId);
    data.save();
    
    res.status(204).send(); // No content
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});