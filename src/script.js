function formatDay(timestamp) {
	let date = new Date(timestamp);
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"];
	let day = days[date.getDay()];
	return day;
}

function formatDate(timestamp) {
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


function showWeather(response) {
	console.log(response.data);
	let temperatureElement = document.querySelector("#main-temperature");
	let descriptionElement = document.querySelector("#current-weather");
	let humidityElement = document.querySelector("#current-humidity");
	let windElement = document.querySelector("#current-wind");
	let cityElement = document.querySelector("#current-city-title");
	let dayElement = document.querySelector("#current-weekday");
	let dataElement = document.querySelector("#current-time");
	let mounthElement = document.querySelector("#current-data");

	temperatureElement.innerHTML = Math.round(response.data.main.temp);
	descriptionElement.innerHTML = response.data.weather[0].main;
	humidityElement.innerHTML = response.data.main.humidity;
	windElement.innerHTML = Math.round(response.data.wind.speed);
	cityElement.innerHTML = response.data.name;
	dayElement.innerHTML = formatDay(response.data.dt * 1000);
	dataElement.innerHTML = formatDate(response.data.dt * 1000);
	mounthElement.innerHTML = formatMounth(response.data.dt * 1000);
}


let apiKey = "e35e5d7beb72c9d9170e247ad8a56db2";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showWeather);
