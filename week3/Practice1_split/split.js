const newTodoInput = document.getElementById('newTodo');
const todoList = document.getElementById('todoList');

function addTodo() {
    const todoText = newTodoInput.value.trim();
    if (todoText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todoText}</span>
            <button onclick="removeTodo(this)">Remove</button>
        `;
        todoList.appendChild(li);
        newTodoInput.value = '';
    }
}

function removeTodo(button) {
    const li = button.parentElement;
    todoList.removeChild(li);
}
