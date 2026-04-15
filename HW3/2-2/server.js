const express = require('express');
const app = express();
const port = 4234;

// Set EJS as template engine
app.set('view engine', 'ejs');

// Body parser middleware for handling form submissions
app.use(express.urlencoded({ extended: true }));

// In-memory data storage
let todos = [];

// Main route: Display the list
app.get('/', (req, res) => {
    res.render('index', { todos: todos });
});

// Add a new todo item
app.post('/add', (req, res) => {
    const todoText = req.body.todo.trim();
    if (todoText) {
        todos.push(todoText);
    }
    res.redirect('/');
});

// Remove a todo item
app.post('/delete', (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index) && index >= 0 && index < todos.length) {
        todos.splice(index, 1);
    }
    res.redirect('/');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
