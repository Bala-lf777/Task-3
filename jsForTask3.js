document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load saved tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem('todos')) || [];
    savedTasks.forEach(task => addTask(task.text, task.done));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = input.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTask(taskText);
            input.value = '';
            input.focus();
        }
    });

    todoList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const li = e.target.parentElement;
            const taskText = li.firstChild.textContent;
            li.remove();
            removeTask(taskText);
        } else if (e.target.tagName === 'LI') {
            e.target.classList.toggle('done');
            const taskText = e.target.firstChild.textContent;
            toggleTaskDone(taskText);
        }
    });

    function addTask(text, done = false) {
        const li = document.createElement('li');
        li.textContent = text;
        if (done) {
            li.classList.add('done');
        }
        const button = document.createElement('button');
        button.textContent = 'Delete';
        li.appendChild(button);
        todoList.appendChild(li);
    }

    function saveTask(text) {
        const tasks = JSON.parse(localStorage.getItem('todos')) || [];
        tasks.push({ text, done: false });
        localStorage.setItem('todos', JSON.stringify(tasks));
    }

    function removeTask(text) {
        let tasks = JSON.parse(localStorage.getItem('todos')) || [];
        tasks = tasks.filter(task => task.text !== text);
        localStorage.setItem('todos', JSON.stringify(tasks));
    }

    function toggleTaskDone(text) {
        const tasks = JSON.parse(localStorage.getItem('todos')) || [];
        const task = tasks.find(task => task.text === text);
        if (task) {
            task.done = !task.done;
        }
        localStorage.setItem('todos', JSON.stringify(tasks));
    }
});
