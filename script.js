/* Logic Layer */

// Array to store all task objects
let tasks = [];

/**
 * Load tasks from localStorage into the tasks array
 * @returns {Array} The list of tasks retrieved from localStorage
 */
function loadTasks() {
    const stored = window.localStorage.getItem("tasks");
    tasks = stored ? JSON.parse(stored) : [];
    return tasks;
}

/**
 * Add a new task object to the tasks list 
 * @param {string} title - The title of the task
 * @returns {object} The newly created task
 */
function addTask(title) {
    const task = {id: Date.now(), title, completed: false};
    tasks.push(task);
    saveTasks();
    return task;
}

/**
 * Delete a task object from the tasks list using its ID
 * @param {number} id - The unique identifier of the task
 * @returns {Array} The list of tasks after deleting a task
 */
function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    return tasks;
}

/**
 * Toggle the completion state of a task
 * @param {number} id - The unique identifier of the task
 * @returns {Array} The list of tasks after toggling the completion state
 */
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = ! task.completed;
        saveTasks();
    }
    return tasks;
}

/**
 * Save the current tasks array into localStorage
 * This ensures tasks persist even after page reload
 */
function saveTasks() {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* UI Layer */

/**
 * Render all tasks from the tasks array into the UI
 */
function renderTasks() {
    const container = document.querySelector(".tasks");
    container.innerHTML = ""; // Clear old tasks
    tasks.forEach ((task) => renderTask(task));
}

/**
 * Render a single task into the UI
 * @param {object} task - The task object to render
 */
function renderTask(task) {
    const container = document.querySelector(".tasks");
    const div = document.createElement("div");

    const p = document.createElement("p");
    p.textContent = task.title;
    if (task.completed) {
        p.style.textDecoration = "line-through";
    }

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.onclick = () => {
        toggleTask(task.id);
        renderTasks();
    }

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
        deleteTask(task.id);
        renderTasks();
    }

    div.append(p, doneBtn, delBtn);
    container.appendChild(div);
}

/* Connect "Add Task" button to addTask and renderTasks functions*/
document.querySelector("#addTaskBtn").onclick = () => {
    const input = document.querySelector("#taskInput");
    if (input.value.trim() !== "") {
        addTask(input.value);
        input.value = ""; // Clear input field
        renderTasks();
    }
}