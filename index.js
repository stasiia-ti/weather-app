//CurrentData

let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let correntHour = date.getHours();
  if (correntHour < 10) {
    correntHour = `0${correntHour}`;
  }

  let correntMinutes = date.getMinutes();
  if (correntMinutes < 10) {
    correntMinutes = `0${correntMinutes}`;
  }

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}. Time ${correntHour}:${correntMinutes}`;

  return formattedDate;
}
let nowDate = document.querySelector("p.today");
nowDate.innerHTML = formatDate(currentTime);

//  Forecast of day

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <div class="weather-forecast-temp">
                  <span class="weather-forecast-max">27° </span>
                  / <span class="weather-forecast-min">17°</span>
                  <img
                    src="http://openweathermap.org/img/wn/50d@2x.png"
                    alt=""
                    width="50"
                  />
                </div>
              </div>`;
  });

  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

// Coordinats of search city

function getForecast(coordinates) {
  let apiKey = "98f63ab964a6f17c8f87a4018e522a54";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//   Weather of city search

function temperature(response) {
  console.log(response.data);
  let temperat = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = temperat;
  let h3 = document.querySelector("#description");
  h3.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = response.data.main.pressure;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let citySearch = document.querySelector("h1");
  citySearch.innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

// Weather of geoloc
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "98f63ab964a6f17c8f87a4018e522a54";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(temperature);
}

//  Search city

function searchCity(city) {
  let key = "98f63ab964a6f17c8f87a4018e522a54";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(temperature);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityText").value;
  let citySearch = document.querySelector("h1");
  citySearch.innerHTML = city.charAt(0).toUpperCase() + city.slice(1);
  searchCity(city);
}

//Enter or click

let searchForm = document.querySelector("#cityForm");
searchForm.addEventListener("submit", citySubmit);

let searchForm2 = document.querySelector("#button");
searchForm2.addEventListener("click", citySubmit);

// Celsius to Fahrehgeit

function chengeFahrenheiTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemp = (celsiusTemperature * 9) / 5 + 35;
  temperatureElement.innerHTML = Math.round(fahrenheiTemp);
}
function chengeCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrengeit");
fahrenheitLink.addEventListener("click", chengeFahrenheiTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", chengeCelsiusTemperature);

function getPosit(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let current = document.querySelector("#current");
current.addEventListener("click", getPosit);

searchCity("Paris");
