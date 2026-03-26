<script setup>
import { ref } from 'vue'

const todos = ref([])
const newTodo = ref('')

const addTodo = () => {
  const todoText = newTodo.value.trim()
  if (todoText !== '') {
    const isDuplicate = todos.value.some(todo => todo.text === todoText)
    if (!isDuplicate) {
      todos.value.unshift({
        id: Date.now(),
        text: todoText
      })
    }
    newTodo.value = ''
  }
}

const removeTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}
</script>

<template>
  <div class="todo-card">
    <header>
      <h1>Task Master</h1>
      <p class="subtitle">Focus on your productivity today.</p>
    </header>
    
    <div class="input-group">
      <input
        type="text"
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="What needs to be done?"
      />
      <button @click="addTodo" :disabled="!newTodo.trim()" class="add-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Add
      </button>
    </div>

    <TransitionGroup name="list" tag="ul" class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <span class="todo-text">{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)" class="remove-btn" title="Remove Task">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
      </li>
    </TransitionGroup>

    <div v-if="todos.length === 0" class="empty-state">
      <p>No tasks yet. Add one to get started!</p>
    </div>

    <footer>
      <span>{{ todos.length }} tasks total</span>
    </footer>
  </div>
</template>

<style scoped>
.todo-card {
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  background: var(--card-bg);
  padding: 2.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
}

header {
  margin-bottom: 2rem;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 2.25rem;
  background: linear-gradient(135deg, var(--accent), #ff4d4d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: var(--text);
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.input-group {
  display: flex;
  gap: 12px;
  margin-bottom: 2rem;
  position: relative;
}

input[type="text"] {
  flex: 1;
  padding: 14px 18px;
  border-radius: 10px;
  border: 2px solid var(--border);
  background: var(--bg);
  color: var(--text-h);
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

input[type="text"]:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-bg);
  transform: translateY(-1px);
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--accent);
  color: white;
  border: none;
  padding: 0 24px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.add-btn:hover:not(:disabled) {
  background-color: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(170, 59, 255, 0.3);
}

.add-btn:active:not(:disabled) {
  transform: translateY(0);
}

.add-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  background: var(--bg);
  border-radius: 10px;
  margin-bottom: 12px;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.todo-item:hover {
  border-color: var(--border);
  transform: translateX(4px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.03);
}

.todo-text {
  color: var(--text-h);
  font-weight: 500;
  flex: 1;
}

.remove-btn {
  background: transparent;
  color: var(--text);
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background-color: #fee2e2;
  color: var(--danger);
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: var(--text);
  font-style: italic;
}

footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  text-align: right;
  font-size: 0.85rem;
  color: var(--text);
  font-weight: 500;
}

/* List Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>