function openCards(){
    
var allElems = document.querySelectorAll('.elem');
 var fullElemPage = document.querySelectorAll('.fullElem');
var fullElemPageBtn = document.querySelectorAll('.fullElem .back')
 
allElems.forEach( function(elem){
        elem.addEventListener('click' , function(){
           fullElemPage[elem.id].style.display = 'block';
        })
});

fullElemPageBtn.forEach(function(back){
    back.addEventListener('click' , function(){
      fullElemPage[back.id].style.display = 'none'
    })
})
}
openCards();


function todoList(){
    // ===================== ELEMENTS =====================
const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');

let dragElement = null;
let taskData = {};


// ====================================================
// ============= LOAD TASKS FROM LOCALSTORAGE =========
// ====================================================
function loadTasks() {

    if (!localStorage.getItem("tasks")) return;

    const data = JSON.parse(localStorage.getItem("tasks"));

    for (const col in data) {
        const column = document.querySelector(`#${col}`);

        data[col].forEach(task => createTaskElement(task.title, task.desc, column));
    }

    updateCounts();
}

loadTasks();


// ====================================================
// ============= CREATE A NEW TASK DIV  ===============
// ====================================================
function createTaskElement(title, desc, column) {

    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button class="del-btn">Delete</button>
    `;

    // Drag event
    div.addEventListener("drag", () => dragElement = div);

    // Delete event
    div.querySelector(".del-btn").addEventListener("click", () => {
        div.remove();
        updateCounts();
    });

    column.appendChild(div);
}



// ====================================================
// ============= DRAG & DROP SYSTEM ===================
// ====================================================
function enableDragDrop(column) {

    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", (e) => e.preventDefault());

    column.addEventListener("drop", () => {
        column.appendChild(dragElement);
        column.classList.remove("hover-over");
        updateCounts();
    });
}

enableDragDrop(todo);
enableDragDrop(progress);
enableDragDrop(done);



// ====================================================
// ============= UPDATE COUNTS + LOCALSTORAGE =========
// ====================================================
function updateCounts() {

    [todo, progress, done].forEach(col => {

        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        if (count) count.textContent = tasks.length;

        // Save tasks
        taskData[col.id] = Array.from(tasks).map(t => ({
            title: t.querySelector("h2").innerText,
            desc: t.querySelector("p").innerText,
        }));
    });

    localStorage.setItem("tasks", JSON.stringify(taskData));
}



// ====================================================
// =============== MODAL SYSTEM =======================
// ====================================================
const addModalButton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".bg");
const addTaskButton = document.querySelector("#add-new-task");

addModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});



// ====================================================
// =============== ADD NEW TASK =======================
// ====================================================
addTaskButton.addEventListener("click", () => {

    const title = document.querySelector('#task-title-input').value.trim();
    const desc = document.querySelector('#task-desc-input').value.trim();

    if (title === "") return alert("Please enter a task title!");

    createTaskElement(title, desc, todo);

    updateCounts();
    modal.classList.remove("active");
});
}
todoList();

