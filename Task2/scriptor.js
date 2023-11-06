// Function to add a task
function addTask() {
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskList = document.getElementById("task-list");

        // Create a new list item (li) to hold the task, checkbox, label, and delete button
        const li = document.createElement("li");

        // Create a checkbox element
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        // Create a label element to display the task text
        const label = document.createElement("label");
        label.textContent = taskText;

        // Create a delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        // Add a click event listener to the label (not the entire li)
        label.addEventListener("click", function () {
            li.classList.toggle("completed");
            updateLocalStorage();
        });

        // Add a click event listener to the delete button
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(li);
            removeFromLocalStorage(taskText);
            updateLocalStorage();
        });

        // Append the checkbox, label, and delete button to the li
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteButton);

        // Append the li to the taskList
        taskList.appendChild(li);

        // Save the task to local storage
        saveTaskToLocalStorage(taskText, false);

        // Clear the input field
        taskInput.value = "";
    } else {
        // Display an alert if the input is empty
        alert("Please enter a task before clicking 'Add Task'");
    }
}

// Function to save a task to local storage
function saveTaskToLocalStorage(taskText, isCompleted) {
    // Check if local storage is available
    if (typeof (Storage) !== "undefined") {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Add the new task to the tasks array
        tasks.push({ text: taskText, completed: isCompleted });

        // Save the updated tasks array to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Function to remove a task from local storage
function removeFromLocalStorage(taskText) {
    // Check if local storage is available
    if (typeof (Storage) !== "undefined") {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Remove the task with the matching text
        tasks = tasks.filter(task => task.text !== taskText);

        // Save the updated tasks array to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Function to update local storage
function updateLocalStorage() {
    const taskItems = document.querySelectorAll("#task-list li");

    const tasks = [];
    taskItems.forEach((item) => {
        const label = item.querySelector("label");
        const checkbox = item.querySelector("input[type='checkbox']");
        const taskText = label.textContent;
        const isCompleted = checkbox.checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });

    // Save the updated tasks array to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    // Check if local storage is available
    if (typeof (Storage) !== "undefined") {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        tasks.forEach((task) => {
            const taskList = document.getElementById("task-list");

            const li = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            const label = document.createElement("label");
            label.textContent = task.text;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";

            label.addEventListener("click", function () {
                li.classList.toggle("completed");
                updateLocalStorage();
            });

            deleteButton.addEventListener("click", function () {
                taskList.removeChild(li);
                removeFromLocalStorage(task.text);
                updateLocalStorage();
            });

            checkbox.checked = task.completed;

            li.appendChild(checkbox);
            li.appendChild(label);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }
}

// Load tasks from local storage when the page loads
loadTasksFromLocalStorage();

