const taskContentContainer = document.querySelector('.js-container');
const mainInputElement = document.querySelector('.main-input');
let matchingId = 0;

// Save tasks to localStorage
function saveTasks() {
    const tasks = Array.from(taskContentContainer.children).map(task => {
        return {
            id: task.querySelector('.input-task').dataset.inputId,
            content: task.querySelector('.input-task').value
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.id, task.content);
    });
}

function addTask(id = matchingId++, content = '') {
    const mainInputValue = content || mainInputElement.value;
    if (mainInputValue.trim() !== '') {
        const container = document.createElement('div');
        container.classList.add('container');
        container.innerHTML = `
        <input disabled class="input-task" type="text" value="${mainInputValue}" data-input-id="${id}">
        <button class="js-edit" data-edit-id="${id}">Edit</button>
        <button class="js-delete" data-del-id="${id}">Delete</button>
    `;
        mainInputElement.value = '';
        taskContentContainer.appendChild(container);
        saveTasks();  // Save tasks after adding a new one
    } else {
        alert('input value')
    }
}

taskContentContainer.addEventListener('click', function(event) {
    const target = event.target;   
    if (target.classList.contains('js-edit')) {
        const uniqueId = target.dataset.editId;
        const inputField = document.querySelector(`[data-input-id="${uniqueId}"]`);

        // Enable or disable the input field as needed
        // ! if sth is true make it false, if sth is false make it true 
        inputField.disabled = !inputField.disabled;

        const editButton = target;
        if (inputField.disabled) {
            editButton.textContent = 'Edit';
        } else {
            editButton.textContent = 'Save';
        }
        saveTasks();
    }

    if (target.classList.contains('js-delete')) {
        // two ways : using uniqueId & parentNode; or target variable + finding parent element using the child.
        // const uniqueId = target.dataset.delId;
        // const containerToRemove = document.querySelector(`[data-input-id="${uniqueId}"]`).parentNode;

        const containerToRemove = target.parentNode;

        containerToRemove.remove();
        saveTasks();
    }
});

window.addEventListener('DOMContentLoaded', loadTasks);









