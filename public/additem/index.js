import { button, div, p } from "../shared/htmlutil.js";
import { AttributedItem, deserialiseItem, EnchantmentItem, Item, ITEM_TYPES, StatsItem } from "../shared/item.js";
import { RARITY } from "../shared/rarity.js";
import { Option, SelectOption, TextOption } from "./options.js";

const validateButton = document.getElementById("validate");
const saveButton = document.getElementById("save");
const cancelButton = document.getElementById("cancel");
const optionsContainer = document.getElementById("options-container");
const preview = document.getElementById("serialized-preview");

function buildItem() {
    const itemData = {
        id: options.id.getValue(),
        name: options.name.getValue(),
        description: options.description.getValue(),
        material: options.material.getValue(),
        rarity: options.rarity.getValue(),
        itemType: options.itemType.getValue()
    };

    // attributes
    if (options.attributes.getValue()) {
        itemData.attributes = Array.from(attributes.children).map(attr => attr.querySelector('input').value.trim()).filter(attr => attr);
        console.log(itemData.attributes);
    }

    const json = {
        id: itemData.id,
        name: itemData.name,
        description: itemData.description,
        material: itemData.material,
        rarity: itemData.rarity,
        "item-type": itemData.itemType
    }
    if (itemData.attributes && itemData.attributes.length > 0) {
        json.attributes = itemData.attributes;
    }

    console.log(json);

    const item = deserialiseItem(json);
    item.validate();
    preview.textContent = JSON.stringify(item.toJSON(), null, 2);

    return item;
}

cancelButton.onclick = () => {
    window.location.href = "/"; // Redirect to main page
}
validateButton.onclick = () => {
    try {
        const item = buildItem();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}


// options
const options = {
    id: new TextOption("Item ID"),
    name: new TextOption("Item Name"),
    description: new TextOption("Item Description"),
    material: new TextOption("Material"),
    rarity: new SelectOption("Rarity", RARITY.getAll().map(r => ({ value: r, label: r })), RARITY.COMMON),
    itemType: new SelectOption("Item Type", ITEM_TYPES.getAll().map(type => ({ value: type, label: type })), ITEM_TYPES.MATERIAL),
    attributes: new Option("Has Default Attributes"),
    stats: new Option("Has Stats"),
    enchantment: new Option("Is Enchantment")
}

const attributes = div('attributes');
const attributeOptions = div('container',
    p("", "Attributes"),
    button("", "Add Attribute", () => {
        const attribute = new TextOption("", "");
        attributes.appendChild(
            div('row',
                attribute.element,
                button("", "X", () => {
                    attributes.removeChild(attribute.element.parentElement);
                })
            )
        );
    }),
    attributes
);

options.attributes.element.onclick = () => {
    if (options.attributes.getValue()) {
        optionsContainer.appendChild(attributeOptions);
    } else {
        optionsContainer.removeChild(attributeOptions);
    }
};

Object.values(options).forEach(option => {
    option.addTo(optionsContainer);
});
