// Current time and date
let now = new Date();

let currentWeekday = document.querySelector("div.current-weekday");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"];
let day = days[now.getDay()];
currentWeekday.innerHTML = `${day}`;

let currentTime = document.querySelector("div.current-time");
let hours = now.getHours();
if (hours < 10) {
	hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
	minutes = `0${minutes}`;
}
currentTime.innerHTML = `${hours}:${minutes}`;

let currentData = document.querySelector("div.current-data");
let date = now.getDate();
let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
let month = now.getMonth();
currentData.innerHTML = `${date}/${months[now.getMonth()]}`;

// Data output in HTML
function showWeather(response) {

	document.querySelector("div.current-city-title").innerHTML = response.data.name;
	document.querySelector("#main-temperature").innerHTML = `${Math.round(response.data.main.temp)}°C`;
	document.querySelector("#current-precipitation").innerHTML = response.data.main.humidity;
	document.querySelector("#current-wind").innerHTML = Math.round(response.data.wind.speed);
	document.querySelector("div.current-weather").innerHTML = response.data.weather[0].main;
}

// Processing a request for a city + communication with the WeatherApp server
function currentCity(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-text");
	let currentCity = document.querySelector("div.current-city-title");

	if (searchInput.value) {
		currentCity.innerHTML = `${searchInput.value}`;
	} else {
		currentCity.innerHTML = null;
		alert(`Please type a city`);
	}

	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=e35e5d7beb72c9d9170e247ad8a56db2&units=metric`;

	axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", currentCity);


// Bonus point
// Adding a button showing the current weather by geolocation

function showPosition(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;

	let userLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e35e5d7beb72c9d9170e247ad8a56db2&units=metric`;

	function showTemp(response) {

		function showUserData(event) {
			event.preventDefault();

			document.querySelector("div.current-city-title").innerHTML = response.data.name;
			document.querySelector("#main-temperature").innerHTML = `${Math.round(response.data.main.temp)}°C`;
			document.querySelector("#current-precipitation").innerHTML = response.data.main.humidity;
			document.querySelector("#current-wind").innerHTML = Math.round(response.data.wind.speed);
			document.querySelector("div.current-weather").innerHTML = response.data.weather[0].main;

		}
		let btCurrent = document.querySelector("#input-location");
		btCurrent.addEventListener("click", showUserData);
	}
	axios.get(userLocation).then(showTemp);
}
navigator.geolocation.getCurrentPosition(showPosition);



//function fahrenheit(event) {
//	let temperature = 18;
//	let resultFar = document.querySelector("#main-temperature");
//	resultFar.innerHTML = Math.round((temperature * 9) / 5 + 32);

//	function celsium(event) {
//		let resultCel = document.querySelector("#main-temperature");
//		resultCel.innerHTML = `${temperature}`;
//	}
//
//	let countCel = document.querySelector("#celsium-link");
//	countCel.addEventListener("click", celsium);
//}
//
//let countFar = document.querySelector("#fahrenheit-link");
//countFar.addEventListener("click", fahrenheit);
