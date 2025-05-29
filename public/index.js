import { deserialiseItem } from "./shared/item.js";
import DATABASE from "./src/database.js";

const container = document.getElementById("container");

DATABASE.getAllItems().then(items => {
    
    items.forEach(raw => {
        const item = deserialiseItem(raw);
        console.log(item);
    });

})
// DATABASE.getAllAttributes().then(attributes => {
//     console.log(attributes);
// });


// https://github.com/Owen1212055/mc-assets/blob/main/assets/ACACIA_BOAT.png?raw=true


console.log("hi");
