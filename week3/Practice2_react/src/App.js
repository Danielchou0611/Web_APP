import React, { useState } from 'react'; // 從 react 套件引入 useState
import './App.css'; // 引入剛才改好的 CSS

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const addTodo = () => {
        const todoText = newTodo.trim();
        if (todoText !== '') {
            setTodos([...todos, todoText]);
            setNewTodo('');
        }
    };

    const removeTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    };

    return (
        <div id="app">
            <h1>To-Do List (React)</h1>
            <div style={{ display: 'flex', gap: '5px' }}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <span>{todo}</span>
                        <button onClick={() => removeTodo(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App; // 導出元件讓 index.js 使用