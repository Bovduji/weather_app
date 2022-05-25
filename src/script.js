function formatDay(timestamp) {
	let date = new Date(timestamp);
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"];
	let day = days[date.getDay()];
	return day;
}

function formatTime(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	return `${hours}:${minutes}`;
}

function formatMounth(timestamp) {
	let date = new Date(timestamp);
	let currentData = date.getDate();
	let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	return `${currentData}/${months[date.getMonth()]}`;
}

function formatedDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"];
	let day = days[date.getDay()];
	return day;
}

function formatedData(timestamp) {
	let date = new Date(timestamp * 1000);
	let currentData = date.getDate();
	let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	return `${currentData}/${months[date.getMonth()]}`;
}

function showForecast(response) {
	let forecast = response.data.daily;

	let forecastElement = document.querySelector("#forecast");

	let forecastHtml = `<div class="row">`;

	forecast.forEach(function (forecastDay, index) {

		if (index < 6) {
			forecastHtml = forecastHtml + `
			<div class="col-2 week" id="weekday-1">
			${index}
				<div class="day">${formatedDay(forecastDay.dt)}</div>
				<div class="date">${formatedData(forecastDay.dt)}</div>
				<img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="45px">
				<div class="forecast-temperature">
				${Math.round(forecastDay.temp.day)}°C
				</div>
			</div>
		`;
		}
	});

	forecastHtml = forecastHtml + `</div>`;
	forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
	let apiKey = "e35e5d7beb72c9d9170e247ad8a56db2";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
	let temperatureElement = document.querySelector("#main-temperature");
	let descriptionElement = document.querySelector("#current-weather");
	let humidityElement = document.querySelector("#current-humidity");
	let windElement = document.querySelector("#current-wind");
	let cityElement = document.querySelector("#current-city-title");
	let dayElement = document.querySelector("#current-weekday");
	let dataElement = document.querySelector("#current-time");
	let mounthElement = document.querySelector("#current-data");
	let iconElement = document.querySelector("#icon");

	temperatureMain = response.data.main.temp;

	temperatureElement.innerHTML = Math.round(response.data.main.temp);
	descriptionElement.innerHTML = response.data.weather[0].description;
	humidityElement.innerHTML = response.data.main.humidity;
	windElement.innerHTML = Math.round(response.data.wind.speed);
	cityElement.innerHTML = response.data.name;
	dayElement.innerHTML = formatDay(response.data.dt * 1000);
	dataElement.innerHTML = formatTime(response.data.dt * 1000);
	mounthElement.innerHTML = formatMounth(response.data.dt * 1000);
	iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
	iconElement.setAttribute("alt", response.data.weather[0].description);

	getForecast(response.data.coord);
}

function search(city) {

	let apiKey = "e35e5d7beb72c9d9170e247ad8a56db2";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

	axios.get(apiUrl).then(showWeather);
}

function searchUserCity(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#search-text");
	search(cityInputElement.value);
}

function showFahrenheit(event) {
	event.preventDefault();
	celsium.classList.remove("active");
	fahrenheit.classList.add("active");
	let fahrenheitTemperature = Math.round(temperatureMain * 9 / 5) + 32;
	let showTemperature = document.querySelector("#main-temperature");
	showTemperature.innerHTML = fahrenheitTemperature;
}

function showCelsium(event) {
	event.preventDefault();
	celsium.classList.add("active");
	fahrenheit.classList.remove("active");
	let celsiumTemperature = Math.round(temperatureMain);
	let showTemperature = document.querySelector("#main-temperature");
	showTemperature.innerHTML = celsiumTemperature;
}

let temperatureMain = null;

let form = document.querySelector("#search");
form.addEventListener("submit", searchUserCity);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

let celsium = document.querySelector("#celsium-link");
celsium.addEventListener("click", showCelsium);

search("Kyiv");
