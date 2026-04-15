const fs = require('fs');
const path = require('path');

const STORAGE_FILE = path.join(__dirname, 'todos.json');

// Initialize storage file if it doesn't exist
if (!fs.existsSync(STORAGE_FILE)) {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify([]));
}

function readStorage() {
    const data = fs.readFileSync(STORAGE_FILE, 'utf-8');
    return JSON.parse(data);
}

function writeStorage(data) {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2));
}

const todoStorage = {
    getAll: () => {
        return readStorage();
    },

    add: (text) => {
        const todos = readStorage();
        const newTodo = {
            id: Date.now().toString(), // Using timestamp as simple ID
            text: text
        };
        todos.push(newTodo);
        writeStorage(todos);
        return newTodo;
    },

    remove: (id) => {
        let todos = readStorage();
        const initialLength = todos.length;
        const removedTodo = todos.find(t => t.id === id.toString());
        todos = todos.filter(t => t.id !== id.toString());
        
        if (todos.length < initialLength) {
            writeStorage(todos);
            return removedTodo;
        }
        return null;
    }
};

module.exports = todoStorage;
