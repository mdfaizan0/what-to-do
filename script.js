// Global Variables
const plusIcon = document.getElementById("plus");
const body = document.querySelector("body");
const allTask = document.querySelector(".allTask"); // Reference to the task list container

// Function to display tasks from local storage
function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const ul = document.querySelector("#ul");

    tasks.forEach((taskObj) => {
        const newTaskLi = document.createElement("li");

        // Set class based on difficulty
        if (taskObj.difficultyValue === "Easy") {
            newTaskLi.setAttribute("class", "easy-task new-task-animation");
        } else if (taskObj.difficultyValue === "Medium") {
            newTaskLi.setAttribute("class", "medium-task new-task-animation");
        } else if (taskObj.difficultyValue === "Hard") {
            newTaskLi.setAttribute("class", "hard-task new-task-animation");
        }

        const newTaskDiv = document.createElement("div");
        newTaskDiv.setAttribute("class", "task");
        newTaskDiv.innerHTML = `
            <h3>${taskObj.titleValue}</h3>
            <p>${taskObj.descriptionValue}</p>
            <span>
                <input type="checkbox" name="complete" id="complete" ${taskObj.isCompleted ? 'checked' : ''}/> 
                <label for="complete" style="user-select: none;">Mark as complete</label>
            </span>
            <div class="options flex-center">
                <button class="deleteTask">
                    <img src="assets/delete.svg" alt="delete-button" />
                </button>
                <p class="standingBrace">|</p>
                <p class="showDifficulty" id="${taskObj.difficultyValue}">${taskObj.difficultyValue}</p>
            </div>
        `;

        if (taskObj.isCompleted) {
            newTaskDiv.classList.add("task-completed");
        }

        newTaskLi.appendChild(newTaskDiv);
        ul.insertAdjacentElement("afterbegin", newTaskLi);

        // Attach event listener to checkbox for completion toggle
        const checkbox = newTaskDiv.querySelector('input[type="checkbox"]');
        checkbox.addEventListener("change", function () {
            newTaskDiv.classList.toggle("task-completed");
            taskObj.isCompleted = checkbox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        // Attach event listener to delete button
        const deleteTask = newTaskDiv.querySelector(".deleteTask");
        deleteTask.addEventListener("click", function () {
            newTaskLi.remove();
            const updatedTasks = tasks.filter(t => t.titleValue !== taskObj.titleValue);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        });
    });
}

// Call displayTasks when the page loads
document.addEventListener("DOMContentLoaded", displayTasks);

// Listening click to Plus Icon at bottom-right
plusIcon.addEventListener("click", function () {
    const existingForm = document.querySelector(".newTaskForm");
    if (!existingForm) {
        const newTaskForm = document.createElement("div");
        newTaskForm.setAttribute("class", "newTaskForm animate");
        newTaskForm.innerHTML = `
            <form class="newForm">
                <input type="text" id="title" placeholder="Add a title here" required/>
                <textarea name="description" id="description" placeholder="Add a description here" required></textarea>
                <label for="dueDate" id="dueDatelabel">Due Date</label>
                <label for="difficulty" id="difficultylabel">Difficulty</label>
                <input type="date" name="dueDate" id="dueDate" />
                <select name="difficulty" id="difficulty">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <button class="button"><span class="button-content">Add Task</span></button>
                <div class="box">
                    <div class="close"></div>
                </div>
            </form>
        `;
        body.insertBefore(newTaskForm, allTask);

        const closeBtn = newTaskForm.querySelector(".close");
        closeBtn.addEventListener("click", function () {
            newTaskForm.remove();
        });
    }

    //Adding New Task Form
    const form = document.querySelector(".newForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const titleValue = document.getElementById("title").value.trim();
        const descriptionValue = document.getElementById("description").value.trim();
        const difficultyValue = document.getElementById("difficulty").value.trim();
        const ul = document.querySelector("#ul");
        const newTaskLi = document.createElement("li");
        const taskid = Math.random().toString(36).slice(2);
        const taskObj = {
            id:taskid,
            titleValue: titleValue,
            descriptionValue: descriptionValue,
            difficultyValue: difficultyValue,
            isCompleted: false
        };

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskObj);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        if (difficultyValue === "Easy") {
            newTaskLi.setAttribute("class", "easy-task new-task-animation");
        } else if (difficultyValue === "Medium") {
            newTaskLi.setAttribute("class", "medium-task new-task-animation");
        } else if (difficultyValue === "Hard") {
            newTaskLi.setAttribute("class", "hard-task new-task-animation");
        }

        const newTaskDiv = document.createElement("div");
        const formContainer = document.querySelector(".newTaskForm");
        newTaskDiv.setAttribute("class", "task");
        newTaskDiv.innerHTML = `
            <h3>${titleValue}</h3>
            <p>${descriptionValue}</p>
            <span>
                <input type="checkbox" name="complete" id="complete" /> 
                <label for="complete" style="user-select: none;">Mark as complete</label>
            </span>
            <div class="options flex-center">
                <button class="deleteTask">
                    <img src="assets/delete.svg" alt="delete-button" />
                </button>
                <p class="standingBrace">|</p>
                <p class="showDifficulty" id="${difficultyValue}">${difficultyValue}</p>
            </div>
        `;
        newTaskLi.appendChild(newTaskDiv);
        ul.insertAdjacentElement("afterbegin", newTaskLi);
        formContainer.remove();

        // Attach event listener to checkbox for completion toggle
        const checkbox = newTaskDiv.querySelector('input[type="checkbox"]');
        checkbox.addEventListener("change", function () {
            newTaskDiv.classList.toggle("task-completed");
            taskObj.isCompleted = checkbox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        // Attach event listener to delete button
        const deleteTask = newTaskDiv.querySelector(".deleteTask");
        deleteTask.addEventListener("click", function () {
            newTaskLi.remove();
            const updatedTasks = tasks.filter(t => t.id !== taskObj.id);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        });
    });
});

