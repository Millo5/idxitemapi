import DATABASE from "../src/database.js";

const textArea = document.getElementById('json-editor');
const saveButton = document.getElementById('save');
const cancelButton = document.getElementById('cancel');

let TYPE = "item"; // Default type

const itemId = window.location.pathname.split('/').pop();
console.log(itemId)

DATABASE.getItem(itemId).then(item => {
    textArea.value = JSON.stringify(item, null, 2);
}).catch(err => {
    TYPE = "attribute"; // If item not found, assume it's an attribute
    DATABASE.getAttribute(itemId).then(attribute => {
        textArea.value = JSON.stringify(attribute, null, 2);
    }).catch(err => {
        TYPE = "error";
        console.error("Item or Attribute not found:", err);
        textArea.value = "Item or Attribute not found.";
    });
});


saveButton.onclick = () => {
    const jsonText = textArea.value.trim();
    if (!jsonText) {
        alert("Please enter valid JSON.");
        return;
    }

    let data;
    try {
        data = JSON.parse(jsonText);
    } catch (error) {
        alert("Invalid JSON format.");
        return;
    }

    if (TYPE === "item") {
        DATABASE.updateItem(itemId, data).then(() => {
            alert("Item updated successfully.");
            window.location.href = "/"; // Redirect to main page
        }).catch(err => {
            console.error("Error updating item:", err);
            alert("Failed to update item.");
        });
    } else if (TYPE === "attribute") {
        DATABASE.updateAttribute(itemId, data).then(() => {
            alert("Attribute updated successfully.");
            window.location.href = "/"; // Redirect to main page
        }).catch(err => {
            console.error("Error updating attribute:", err);
            alert("Failed to update attribute.");
        });
    } else {
        alert("Unknown type for saving.");
    }
}

cancelButton.onclick = () => {
    window.location.href = "/"; // Redirect to main page
}