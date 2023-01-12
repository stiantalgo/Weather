//let weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}`;
//const API_KEY = "e52b7a0847c2458a8dd105332231201 ";

const showWeather = document.querySelector('.weather');
const showCity = document.querySelector('.city');
const currentTemp = document.querySelector('.currentTemp');
const searchInput = document.querySelector('.searchText');

const feelsLike = document.querySelector('.feelsLike');
const minTemp = document.querySelector('.minTemp');
const maxTemp = document.querySelector('.maxTemp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');


const API_KEY_OPEN = "b667e74ef6ac330a5de1755bb39eddd7";
let cityName = "Sunndal";
let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY_OPEN}&units=metric&lang={no}`;



searchInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        e.preventDefault();
        let city = getCity();
        loadWeather(city);
    }
})



async function loadWeather(cityInput){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY_OPEN}&units=metric&lang={no}`);
        const myWeather = await response.json();
        console.log(myWeather);
        showDisplay(myWeather);

    } catch (error) {
        console.log(error);
    }
}

function showDisplay(myWeather){
    /* Location */
    showWeather.textContent = myWeather.weather[0].main;
    showCity.textContent = myWeather.name;

    /* Currente temps */
    let curTemp = Math.round(myWeather.main.temp * 10)/10;
    currentTemp.innerHTML = `${curTemp}<span class="smaller">°C</span><span class="border"></span>`;;
    maxTemp.textContent = `Max temp: ${myWeather.main.temp_max}°C`;
    minTemp.textContent = `Min temp: ${myWeather.main.temp_min}°C`;
    feelsLike.textContent  = `Feels like: ${myWeather.main.feels_like}°C`;

    /* Extra info */
    humidity.textContent = `Humidity: ${myWeather.main.humidity}%`
    wind.textContent = `Wind: ${myWeather.wind.speed}`
}

function getCity(){
    if(searchInput.value === "" || searchInput.value === null || searchInput.value === undefined){
        console.log("SUNNDAL YO");
        return "Sunndal";
    }else{
        console.log(searchInput.value);
        console.log("searchInput.value");
        return searchInput.value;
    }
}