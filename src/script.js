function showWeather(response) {
	console.log(response.data);
	let temperatureElement = document.querySelector("#main-temperature");
	let descriptionElement = document.querySelector("#current-weather");
	let humidityElement = document.querySelector("#current-humidity");
	let windElement = document.querySelector("#current-wind");
	let cityElement = document.querySelector("#current-city-title");

	temperatureElement.innerHTML = Math.round(response.data.main.temp);
	descriptionElement.innerHTML = response.data.weather[0].main;
	humidityElement.innerHTML = response.data.main.humidity;
	windElement.innerHTML = Math.round(response.data.wind.speed);
	cityElement.innerHTML = response.data.name;
}



let apiKey = "e35e5d7beb72c9d9170e247ad8a56db2";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showWeather);
