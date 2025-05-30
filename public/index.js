import { deserialiseItem } from "./shared/item.js";
import { deserialiseAttribute } from "./shared/attribute.js";
import DATABASE from "./src/database.js";

const container = document.getElementById("container");
const selectedDisplay = document.getElementById("selected-display");

DATABASE.getAllItems().then(items => {
    items.forEach(raw => {
        const item = deserialiseItem(raw);
        container.appendChild(item.toHTML());
    });
})
DATABASE.getAllAttributes().then(attributes => {
    attributes.forEach(raw => {
        const attribute = deserialiseAttribute(raw);
        container.appendChild(attribute.toHTML());
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


// Buttons
document.getElementById("add-item").onclick = () => {
    window.location.href = "/additem";
}
document.getElementById("add-attribute").onclick = () => {
    window.location.href = "/addattribute";
}
document.getElementById("edit").onclick = () => {
    const selected = document.querySelectorAll(".selected");
    if (selected.length === 1) {
        const id = selected[0].getAttribute("data-id");
        window.location.href = `/edit/${id}`;
    } else {
        alert("Please select exactly one item to edit.");
    }
}
document.getElementById("remove").onclick = () => {
    const selected = document.querySelectorAll(".selected");
    if (selected.length === 0) {
        alert("Please select at least one item to delete.");
        return;
    }

    const ids = Array.from(selected).map(el => el.getAttribute("data-id"));
    if (confirm(`Are you sure you want to delete ${ids.length} item(s)?`)) {
        DATABASE.deleteItems(ids).then(() => {
            selected.forEach(el => el.remove());
            selectedDisplay.textContent = "";
        }).catch(err => {
            console.error("Error deleting items:", err);
            alert("Failed to delete items. Please try again.");
        });
    }
}

