import {recommandToClothes} from './clothes.js';

const weatherTitle = document.querySelector(".weather-box__title"),
    weatherImg = document.querySelector(".weather-box__img"),
    weatherPlace = document.querySelector(".weather-box__place"),
    weatherTemp = document.querySelector(".weather-box__temp"),
    weatherWind = document.querySelector(".weather-box__wind");

const WEATHER_API_KEY = "e430a4e995277aa88d2d4846813d3904";
const COORDS = "coords";

function getWeather(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        if (json !== null) {
            paintWeatherInfo(json);
            recommandToClothes(json.main.temp);
        }
    });
}

function paintWeatherInfo(json) {
    // console.log(json);

    const country = json.sys.country;
    const place = json.name;
    const weatherName = json.weather[0].main;
    const weatherDesc = json.weather[0].description;
    const temperature = Math.floor(json.main.temp);
    const windSpeed = Math.floor(json.wind.speed);
    const icon = json.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

    // html
    weatherTitle.innerText = weatherDesc;
    weatherImg.src = iconUrl;
    weatherTemp.innerText = `${temperature}℃`;
    weatherPlace.innerText = `${country}, ${place}`;
    weatherWind.innerText = `Wind : ${windSpeed}m/s`;
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        // key 와 value의 이름이 같으면 아래와 같이 축약가능
        latitude,
        longitude
    }

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    // 위치정보 읽기
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        // get Weather
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();