
const form = document.querySelector(".js-form"),
input = form.querySelector("input"),
greeting = document.querySelector(".js-greetings"),

USER_LS = "currentUser",
SHOWING_CN = "showing";

let greetingMessage = ["You can do it.", "Go for it.", "You can make it. ", "Anything is possible. "
,"Do your best.", "Nothing can stop you.", "Good luck.", "Keep working on it.", "Have a Good Day!"
]

function genRandom(){
    const greetingNumber = greetingMessage.length ; 
    const number = Math.floor(Math.random() * greetingNumber);
    return number;
}

function saveName (text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;

    if (currentValue.trim() !== "") {
        paintGreeting(currentValue);
        saveName(currentValue);
    }
    input.value= ""
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    const genNumber = genRandom();

    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `${greetingMessage[genNumber]} ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);

    if(currentUser === null) {
        askForName();    
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
    setInterval(loadName, 20000);
}

init();
