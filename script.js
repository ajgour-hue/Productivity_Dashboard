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


function dailyPlanner(){
    
let dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {};
 var hours = Array.from({length:18} ,(elem,idx) =>{
  let start = 6 + idx;
  let end = start + 1;

  function format(h) {
    let period = h >= 12 ? "pm" : "am";
    let hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:00 ${period}`;
  }

  return `${format(start)} - ${format(end)}`;
})



wholeDaySum = '';
hours.forEach(function(elem , idx){

    var savedData = dayPlanData[idx] ? dayPlanData[idx] : '';

    wholeDaySum += ` <div class="day-planner-time">
                    <p>${elem}</p>
                    <input id="${idx}" type="text" placeholder="...." value=${savedData} >
                </div>`
})
 
var dayPlanner = document.querySelector('.day-planner');
dayPlanner.innerHTML = wholeDaySum;


var dayPlannerInput = document.querySelectorAll('.day-planner-time input');

 dayPlannerInput.forEach(function(elem){
     elem.addEventListener('input' , function(){
        dayPlanData[elem.id] = elem.value;
        localStorage.setItem('dayPlanData' , JSON.stringify(dayPlanData));

        console.log(dayPlanData);
        
     })
     
 })

}
dailyPlanner();



function motivation(){
    
let motivationalQuote = document.querySelector('.motivation-2 h1');
 let motivationalAuthor = document.querySelector('.motivation-3 p');  


 
async function fetchQuote() {

    const url =
      "https://api.allorigins.win/raw?url=https://zenquotes.io/api/random";

    const res = await fetch(url);
    const data = await res.json();

    const [{ q, a }] = data;

motivationalQuote.innerHTML = q;
motivationalAuthor.innerHTML = a;


    // motivationalQuote.innerHTML = data[0].q;
    // motivationalAuthor.innerHTML = data[0].a;
 
}

fetchQuote();


}

motivation();

function pomodorTimer(){
    
var min5 = document.querySelector('#one');
var min10 = document.querySelector('#two');
var min20 = document.querySelector('#three');
var progressBox = document.querySelector('#box');
var timer = document.querySelector('#timer');
var timeh1 = document.querySelector('#time');
var stop = document.querySelector('#stop');

let interval = null;
let totalTime = 0;
let remainingTime = 0 ;
let min  =0 ;
let sec = 0 ;
let displayMinutes = 0;
displaySeconds = 0 ;


min5.addEventListener('click' , function(){
    
    clearInterval(interval)
    interval = null
    totalTime = 120;
    remainingTime = totalTime;
    min = 2 ;
    sec = 0 ;
    showTimer(min , sec);
    updateProgress();
        interval = setInterval(countDown, 1000);

})

min10.addEventListener('click' , function(){
     clearInterval(interval)
    interval = null
    totalTime = 600 ;
    remainingTime = totalTime;
    min = 10 ;
    sec = 0 ;
    showTimer(min , sec);
    updateProgress();
     if (interval === null && remainingTime > 0) {
        interval = setInterval(countDown, 1000);
    }
})


min20.addEventListener('click' , function(){
     clearInterval(interval)
    interval = null
    totalTime = 1200 ;
    remainingTime = totalTime;
    min = 20 ;
    sec = 0 ;
    showTimer(min , sec);
    updateProgress();
     if (interval === null && remainingTime > 0) {
        interval = setInterval(countDown, 1000);
    }
})


function showTimer(min , sec){
   displayMinutes = (min < 10 ? "0" + min : min);
displaySeconds = (sec < 10 ? "0" + sec : sec);
   timeh1.innerHTML = displayMinutes +":" +displaySeconds ;
}



function countDown(){
    remainingTime -- ;
    min = Math.floor(remainingTime/60);
    sec = remainingTime%60;
    showTimer(min , sec);
    updateProgress();
    if(remainingTime <= 0 ){
        timer.innerHTML = "TimesUp!!";
        timer.style.color = 'red';
         timeh1.innerHTML = "00:00";    
        clearInterval(interval);
        interval = null ;
    }
}


stop.addEventListener('click' , function(){
      

      if(interval != null){
clearInterval(interval);
      interval  = null ;
      stop.innerHTML = 'Resume';
      }
      else{
        interval = setInterval(countDown , 1000);
         stop.innerHTML = 'Stop';
      }
})


function updateProgress() {
    let progress = ((totalTime - remainingTime) / totalTime) * 360;

    progressBox.style.background = `
        conic-gradient(#5a72ff ${progress}deg, #b8c8ff 0deg)
    `;
}
}

pomodorTimer();

function weatherFunctionality() {


    // I have removed API key for security purpose
    var apiKey = null
    var city = 'Bhopal'



    var header1Time = document.querySelector('.header1 h1')
    var header1Date = document.querySelector('.header1 h2')
    var header2Temp = document.querySelector('.header2 h2')
    var header2Condition = document.querySelector('.header2 h4')
    var precipitation = document.querySelector('.header2 .precipitation')
    var humidity = document.querySelector('.header2 .humidity')
    var wind = document.querySelector('.header2 .wind')

    var data = null

    async function weatherAPICall() {
        var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        data = await response.json()

        header2Temp.innerHTML = `${data.current.temp_c}°C`
        header2Condition.innerHTML = `${data.current.condition.text}`
        wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`
        humidity.innerHTML = `Humidity: ${data.current.humidity}%`
        precipitation.innerHTML = `Heat Index : ${data.current.heatindex_c}%`
    }

    weatherAPICall()


    function timeDate() {
        const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date()
        var dayOfWeek = totalDaysOfWeek[date.getDay()]
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var tarik = date.getDate()
        var month = monthNames[date.getMonth()]
        var year = date.getFullYear()

        header1Date.innerHTML = `${tarik} ${month}, ${year}`

        if (hours > 12) {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`

        } else {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`
        }
    }

    setInterval(() => {
        timeDate()
    }, 1000);

}

weatherFunctionality()


function functionality(){

  function showSection(className){

    document.querySelectorAll('.fullElem').forEach(sec => {
      sec.style.display = 'none';
    });

    const section = document.querySelector(`.${className}`);
    if(section){
      section.style.display = 'block';
    }
  }

  document.querySelector('#nav-todo')
    .addEventListener('click', e => {
      e.preventDefault();
      showSection('todo-list-fullpage');
    });

  document.querySelector('#nav-planner')
    .addEventListener('click', e => {
      e.preventDefault();
      showSection('daily-planner-fullpage');
    });

  document.querySelector('#nav-motivation')
    .addEventListener('click', e => {
      e.preventDefault();
      showSection('motivational-fullpage');
    });

  document.querySelector('#nav-pomodoro')
    .addEventListener('click', e => {
      e.preventDefault();
      showSection('pomodoro-fullpage');
    });
}

functionality();




function changeTheme(){
    document.querySelector('.theme')
  .addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });

}
changeTheme();





function updateProgress(){

  const now = new Date();

  /* ========== MONTH PROGRESS ========== */
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const currentMonth = now.getMonth();
  const year = now.getFullYear();

  const totalMonthDays = new Date(year, currentMonth + 1, 0).getDate();
  const passedMonthDays = now.getDate();

  const monthPercent = ((passedMonthDays / totalMonthDays) * 100).toFixed(2);

  document.getElementById("monthTitle").innerText =
    `${monthNames[currentMonth]} Progress`;

  document.getElementById("monthDays").innerText =
    `${passedMonthDays} / ${totalMonthDays} days`;

  document.getElementById("monthPercent").innerText =
    `${monthPercent}% month completed`;

  document.getElementById("monthFill").style.width =
    monthPercent + "%";


  /* ========== YEAR PROGRESS ========== */
  const startOfYear = new Date(year, 0, 1);
  const dayOfYear = Math.floor(
    (now - startOfYear) / (1000 * 60 * 60 * 24)
  ) + 1;

  const isLeap =
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const totalYearDays = isLeap ? 366 : 365;

  const yearPercent = ((dayOfYear / totalYearDays) * 100).toFixed(2);

  document.getElementById("yearTitle").innerText =
    `Year ${year} Progress`;

  document.getElementById("yearDays").innerText =
    `${dayOfYear} / ${totalYearDays} days`;

  document.getElementById("yearPercent").innerText =
    `${yearPercent}% year completed`;

  document.getElementById("yearFill").style.width =
    yearPercent + "%";
}

updateProgress();
