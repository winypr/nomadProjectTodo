const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h1"),
      dateTitle =  clockContainer.querySelector("h2");

function getTime() {
    const date = new Date(),
    month = date.getMonth(),
    day = date.getDate(),
    week = date.getDay(),
    minutes = date.getMinutes(),
    hours = date.getHours(),
    seconds = date.getSeconds();
    
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"];
    let weekNames = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
        
    dateTitle.innerText = `${weekNames[week]}, ${monthNames[month]} ${day}`

    clockTitle.innerText = `${hours <10 ? `0${hours}` : hours}:${
        minutes<10 ? `0${minutes}`: minutes}:${ 
       seconds<10 ? `0${seconds}`: seconds}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();