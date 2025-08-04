// API key is now securely stored and used on the server side only.
const form = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const resultSection = document.getElementById('result');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchTemperature(city);
    } else {
        resultSection.innerHTML = `<p>Please enter a city name.</p>`;
    }
});

function fetchTemperature(city) {
    const url = `/api/weather?city=${encodeURIComponent(city)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayTemperature(data);
        })
        .catch(error => {
            resultSection.innerHTML = `<p>${error.message}</p>`;
        });
}

function displayTemperature(data) {
    const temperature = data.main.temp;
    const feelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const cityName = data.name;
    const country = data.sys.country;
    const weatherDesc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    resultSection.innerHTML = `
        <div class="weather-card">
            <h2>${cityName}, ${country}</h2>
            <img src="${iconUrl}" alt="${weatherDesc}" />
            <p><strong>${weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)}</strong></p>
            <p>Temperature: <strong>${temperature}°C</strong></p>
            <p>Feels like: ${feelsLike}°C</p>
            <p>Humidity: ${humidity}%</p>
        </div>
    `;
}