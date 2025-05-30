import { deserialiseItem } from "./shared/item.js";
import { deserialiseAttribute } from "./shared/attribute.js";
import { ItemCard, AttributeCard } from "./src/card.js";
import DATABASE from "./src/database.js";

const container = document.getElementById("container");
const selectedDisplay = document.getElementById("selected-display");

DATABASE.getAllItems().then(items => {
    items.forEach(raw => {
        const item = deserialiseItem(raw);
        const card = new ItemCard(item);
        container.appendChild(card.toHTML());
    });

})
DATABASE.getAllAttributes().then(attributes => {
    attributes.forEach(raw => {
        const attribute = deserialiseAttribute(raw);
        const card = new AttributeCard(attribute);
        container.appendChild(card.toHTML());
    })
});


const loop = () => {
    const selected = document.querySelectorAll(".selected");
    const targetText = selected.length === 0 ? "" : `${selected.length} Selected`;
    if (selectedDisplay.textContent !== targetText) {
        selectedDisplay.textContent = targetText;
    }

    requestAnimationFrame(loop);
}
loop();

console.log("hi");
