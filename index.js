
const express = require("express");
const fs = require("fs"); 
const path = require("path");
const { Item, deserialiseItem, StatsItem } = require("./shared/item");
const { RARITY } = require("./shared/rarity");
const { Attribute, ATTRIBUTE_TYPES: ATTRIBUTE_TYPE, ATTRIBUTE_TARGETS: ATTRIBUTE_TARGET } = require("./shared/attribute");
const { TRIGGER } = require("./shared/triggers");
const { Data } = require("./api/data");
const { error } = require("console");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data.json");


const data = new Data(DATA_FILE);

// if data.json does not exist, create it with an empty array
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data.toJSON()));
}
try {
    data.load();    
} catch (error) {
    console.error("Error loading data:", error.message);
    console.error("Creating new data file...");
    fs.writeFileSync(DATA_FILE, JSON.stringify(data.toJSON(), null, 2));
}

console.log(data);

/////// ------------------------ ///////

var item = new Item("bone")
    .setName("Bone")
    .setDescription("I used to be a femur")
    .setMaterial("bone")
console.log(item.toJSON());

// var item2 = deserialiseItem({
//     "id": "bone",
//     "name": "Bone",
//     "description": "I used to be a femur.",
//     "rarity": "common",
//     "material": "bone",
//     "item-type": "material",
// });
// console.log(item2.toJSON());

var item3 = new StatsItem("wooden-targe")
    .setName("Wooden Targe")
    .setDescription("A small wooden shield.")
    .setMaterial("oak_slab")
    .setStats({
        "armor": 5,
    })
console.log(item3.toJSON());


var attribute = new Attribute("sharp")
    .setName("Sharp")
    .setDescription("Increases the damage of melee weapons.")
    .setMaterial("wooden_sword")
    .setType(ATTRIBUTE_TYPE.ENCHANTMENT)
    .setTarget(ATTRIBUTE_TARGET.MELEE_WEAPON)
console.log(attribute.toJSON());

var attribute2 = new Attribute("cursebound")
    .setName("Cursebound")
    .setDescription("This item cannot be dropped.")
    .setMaterial("weeping_vines")
    .setType(ATTRIBUTE_TYPE.CURSE)
    .setTriggers(TRIGGER.DROP)
console.log(attribute2.toJSON());

var attribute3 = new Attribute("frostbite")
    .setName("Frostbite")
    .setDescription("Slows down the target on hit.")
    .setMaterial("snow_block")
    .setType(ATTRIBUTE_TYPE.ENCHANTMENT)
    .setTarget(ATTRIBUTE_TARGET.WEAPON)
    .setTriggers(TRIGGER.HIT, TRIGGER.PASSIVE)
console.log(attribute3.toJSON());

[item, item3].forEach(i => data.addItem(i));
[attribute, attribute2, attribute3].forEach(a => data.addAttribute(a));
// data.save();


/////// ------------------------ ///////

app.use(express.json());
app.use(express.static("public"));

// Middleware to read data from data.json
app.use((req, res, next) => {
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading data file");
        }
        req.data = JSON.parse(data);
        next();
    });
});

// Route to get all items
app.get("/api/items", (req, res) => {
    res.json(req.data);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});