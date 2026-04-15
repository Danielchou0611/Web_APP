const express = require('express');
const path = require('path');
const todoStorage = require('./storage/todoStorage');

const app = express();
const PORT = 3234;

app.use(express.json());
app.use(express.static(__dirname));

// API Endpoints
app.get('/api/todos', (req, res) => {
    res.json(todoStorage.getAll());
});

app.post('/api/todos', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    const newTodo = todoStorage.add(text);
    res.status(201).json(newTodo);
});

app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const removedTodo = todoStorage.remove(id);
    if (removedTodo) {
        res.json({ success: true, removedTodo });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
