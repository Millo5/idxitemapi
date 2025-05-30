
function get(uri) {
    return fetch("http://localhost:3000" + uri).then(response => response.json());
}
function post(uri, data) {
    return fetch("http://localhost:3000" + uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => response.json());
}
function del(uri) {
    return fetch("http://localhost:3000" + uri, {
        method: "DELETE"
    }).then(response => {
        if (!response.ok) {
            throw new Error("Failed to delete resource");
        }
    });
}
function put(uri, data) {
    return fetch("http://localhost:3000" + uri, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => response.json());
}

// This module provides a simple interface to interact with the database API.

const DATABASE = {
    getAllItems: () => get("/api/items"),
    getItem: (id) => get(`/api/items/${id}`),
    addItem: (item) => post("/api/items", item),
    deleteItem: (id) => del(`/api/items/${id}`),
    updateItem: (id, item) => put(`/api/items/${id}`, item),

    getAllAttributes: () => get("/api/attributes"),
    getAttribute: (id) => get(`/api/attributes/${id}`),
    addAttribute: (attribute) => post("/api/attributes", attribute),
    deleteAttribute: (id) => del(`/api/attributes/${id}`),
    updateAttribute: (id, attribute) => put(`/api/attributes/${id}`, attribute),
}

export default DATABASE;