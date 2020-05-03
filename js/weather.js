const weather = document.querySelector(".js-weather")

const API_KEY = 'cd6344a6f1321a88887d5cb12bf0e7cd'
const COORDS = "coords"

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json) {
        const jsonObj = {
            temperature : json.main.temp,
            place : json.name,
            weatherId : json.weather[0].id,
        }
        
        weatherIcon = weather.querySelector("#icon-desc"),
        weatherTemp = weather.querySelector(".js-weather-temp"),
        weatherCity = weather.querySelector(".js-weather-city");
        
        weatherIcon.classList.add(`wi-owm-day-${jsonObj.weatherId}`)
        weatherTemp.innerText = `${jsonObj.temperature}`;
        weatherCity.innerText = `${jsonObj.place}`;
    })
}

function saveCoords(coordObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordObj));
}

function handleGeoSucces(position){
   const latitude = position.coords.latitude,
   longitude = position.coords.longitude,
   coordObj = {
    latitude,
    longitude
   };

   saveCoords(coordObj);
   getWeather(latitude,longitude)
}

function handleGeoError(){
    console.log('Cant access geo location')
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);

    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}

function init(){
    loadCoords()
}

init();