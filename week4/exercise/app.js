const APIKEY = 'fcf35cbb33da569c78ca7c81af9764ad';
const cityEntered = document.getElementById("cityInput");
const button = document.getElementById("btn");
const weatherInfo = document.getElementById("weather-info");

button.addEventListener("click", function() {
    const city = cityEntered.value;
    if (city === ''){alert("Enter a city name.")}
    else{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ae797630955c0e75a85c4b6f459f6323&units=metric`)
        .then(response => {
            if (!response.ok){throw new Error("Network error");}
            return response.json();
        })
        .then(data => {
            const weatherDetails = `The weather in ${city} is ${data.weather[0].description}.<br> The temperature is ${data.main.temp} degrees Celsius with a wind speed of ${data.wind.speed} m/s. <br><hr><br>`;
            weatherInfo.insertAdjacentHTML('beforeend', weatherDetails);
        })

        .catch(error => {
            alert("An error occurred.");
            console.error('Error', error.message);
        });

    }
});