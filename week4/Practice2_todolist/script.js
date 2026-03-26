function addTask() {
    const input = document.getElementById('todo-input');
    const taskText = input.value.trim();

    if (taskText !== "") {
        // Check for duplicates
        const existingTasks = Array.from(document.querySelectorAll('#todo-items li span'))
            .map(span => span.textContent);
        
        if (existingTasks.includes(taskText)) {
            alert("This task already exists!");
            return;
        }

        const li = document.createElement('li');
        
        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.onclick = function() {
            span.classList.toggle('completed', checkbox.checked);
        };
        li.appendChild(checkbox);

        // Task text container
        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function() {
            li.classList.add('removing');
            li.addEventListener('transitionend', function() {
                li.remove();
            }, { once: true });
        };
        
        li.appendChild(deleteBtn);
        document.getElementById('todo-items').appendChild(li);
        input.value = ""; 
    }
}

document.getElementById('add-btn').addEventListener('click', addTask);

document.getElementById('todo-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});