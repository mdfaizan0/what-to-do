const plusIcon = document.getElementById("plus");
const body = document.querySelector("body");
const allTask = document.querySelector(".allTask"); //reference

plusIcon.addEventListener("click", function (event) {
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

        const closeBtn = document.querySelector(".close");
        closeBtn.addEventListener("click", function (event) {
            newTaskForm.remove();
        });
    }

    const form = document.querySelector(".newForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const titleValue = document.getElementById("title").value;
        const descriptionValue = document.getElementById("description").value;
        const difficultyValue = document.getElementById("difficulty").value;
        const ul = document.querySelector("#ul");
        const newTaskLi = document.createElement("li");
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
                <p>
                  ${descriptionValue}
                </p>
                <span>
                    <input type="checkbox" name="complete" id="complete" /> Mark as complete
                </span>
                <p class="showDifficulty" id="${difficultyValue}">${difficultyValue}</p>
        `;
        newTaskLi.appendChild(newTaskDiv);
        ul.insertAdjacentElement("afterbegin", newTaskLi);
        formContainer.remove();
    });
});
