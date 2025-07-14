const API_KEY = VITE_WEATHER_API_KEY;
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            return {
                name: data.name,
                temp: data.main.temp,
                weather: data.weather[0].main
            };
        });
}

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (!city) {
        weatherResult.textContent = "Please enter a city name.";
        return;
    }

    weatherResult.textContent = "Loading...";

    getWeatherData(city)
        .then(weather => {
            weatherResult.innerHTML = `
        <h3>${weather.name}</h3>
        <p>Temperature: ${weather.temp}°C</p>
        <p>Weather: ${weather.weather}</p>
      `;
        })
        .catch(error => {
            weatherResult.textContent = `Error: ${error.message}`;
        });
});
