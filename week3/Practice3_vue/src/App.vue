<script setup>
import { ref } from 'vue'

// 1. 定義狀態 (data)
const todos = ref([])
const newTodo = ref('')

// 2. 定義方法 (methods)
const addTodo = () => {
  const todoText = newTodo.value.trim()
  if (todoText !== '') {
    todos.value.push(todoText)
    newTodo.value = ''
  }
}

const removeTodo = (index) => {
  todos.value.splice(index, 1)
}
</script>

<template>
  <div class="todo-container">
    <h1>To-Do List (Vue 3)</h1>
    
    <div class="input-group">
      <input
        type="text"
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="Add a new task"
      />
      <button @click="addTodo">Add</button>
    </div>

    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <span>{{ todo }}</span>
        <button @click="removeTodo(index)" class="remove-btn">Remove</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* 這裡貼上你原本的 CSS */
.todo-container {
  max-width: 400px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.remove-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

.remove-btn:hover {
  background-color: #cc0000;
}
</style>