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

//   Weather of city search

function temperature(response) {
  console.log(response.data);
  let temperat = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = temperat;
  let h3 = document.querySelector("h3");
  h3.innerHTML = response.data.weather[0].description;
  console.log(temperat);
  console.log(response.data.weather[0].description);
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
  citySearch.innerHTML = city;

  searchCity(city);
}

searchCity("Paris");

//Enter or click
let searchForm = document.querySelector("#cityForm");
searchForm.addEventListener("submit", citySubmit);

let searchForm2 = document.querySelector("#button");
searchForm2.addEventListener("click", citySubmit);

// Celsius to Fahrehgeit

function neo(event) {
  event.preventDefault();
  let link = document.querySelector("#temperature");
  link.innerHTML = 29;
}

let temp = document.querySelector("#celsius");
temp.addEventListener("click", neo);

function neo2(event) {
  event.preventDefault();
  let link1 = document.querySelector("#temperature");
  let currentTemp = 29;
  let tempFah = Math.round(currentTemp * 1.8 + 32);
  link1.innerHTML = tempFah;
}

let temp1 = document.querySelector("#fahrengeit");
temp1.addEventListener("click", neo2);

// Weather of geoloc
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "98f63ab964a6f17c8f87a4018e522a54";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let head = document.querySelector("#temperature");
  head.innerHTML = temperature;

  let nameCity = response.data.name;
  let headCity = document.querySelector("h1");
  headCity.innerHTML = nameCity;

  let sky = response.data.weather[0].description;
  let headSky = document.querySelector("h3");
  headSky.innerHTML = sky;
}
//navigator.geolocation.getCurrentPosition(showPosition);
let current = document.querySelector("#current");
current.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(showPosition)
);
