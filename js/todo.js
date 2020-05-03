const toDoform = document.querySelector(".js-toDoForm"),
toDoinput = toDoform.querySelector("input"),
toDoList = document.querySelector(".js-toDoList"),
TODOS_LS ='toDos';

let toDos = [];

function deleteToDo(event) {
    const btn = event.target,
    li = btn.parentNode;

    toDoList.removeChild(li);
    
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id)
    })
    
    toDos = cleanToDos;
    saveToDos();
} 

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function createToDo(text, newId) {
    const li = document.createElement("li"),
    span =  document.createElement("span"),
    tagI = document.createElement("i");
   
    tagI.className = "fas fa-times";
    tagI.addEventListener("click", deleteToDo)
    span.innerText = text;
    li.appendChild(tagI);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
}

function paintToDo(text) {
    const newId = toDos.length + 1,
    toDoObj = {
        text : text,
        id : newId
    }
    createToDo(text, newId);         
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoinput.value;
   
    if (currentValue.trim() !== "" ) {
        if (toDos.length +1  < 5) {
            paintToDo(currentValue);
        } else {
           alert("No more TO DO LIST can be added")
        }
    }
    toDoinput.value="";  
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const paredToDos = JSON.parse(loadedToDos)
        
        paredToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function inint() {

    loadToDos();
    toDoform.addEventListener("submit", handleSubmit)
}
inint();


