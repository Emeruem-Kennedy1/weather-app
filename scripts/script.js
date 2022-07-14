// get the current weather data from the openweathermap.org api
async function getCurrentWeatherData(lat, lon, displayFunction) {
    loading()
    apuURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${keys.MY_API_KEY}&units=metric`;
    // actual API call
    try {
        const response = await fetch(apuURL);
        const weatherData = await response.json();
        const hourlyData = await weatherData.hourly.map(hour => hour.temp);
        const timestamp = await weatherData.hourly.map(hour => {
            date = new Date(hour.dt * 1000);
            return `${convertToAMPM(date.getHours())} ${getDayOfTheWeek(hour.dt).slice(0,3)}`
        });

        // plot chart using chart.js
        const chartData = {
            labels: timestamp.slice(0, 24),
            datasets: [
                {
                    label: 'Temperature(°C)',
                    data: hourlyData.slice(0, 24),
                    backgroundColor: [
                        '#f5f5f5',
                    ],
                    borderColor: [
                        '#f5f5f5',
                    ],
                    borderWidth: 1,
                },
            ],
        };
        plotChart(ctx, chartData);
        displayFunction(weatherData);

    } catch (error) {
        console.log(error);
    };
};

// use the data from the api to do something (particularly display it to the user)
function displayWeatherInformation(weatherData) {
    loading()
    // extract the weather data for current day and 7 days after it from the response

    let days = weatherData.daily;

    // loop through the days and update the weather information for each day    
    for (let day = 0; day < days.length - 1; day++) {

        // get the name of the day of the week
        dayName = getDayOfTheWeek(days[day].dt).slice(0, 3).toUpperCase(); 
        weatherDescription = days[day].weather[0].description;
        temperature = Math.round(days[day].temp.day * 10) / 10;


        // update the image, temperature and day name for the current day using the updateDay function
        updateDay(day, days[day].weather[0].icon, temperature, dayName, weatherDescription);
    }
    complete()
}


function updateDay(dayNumber, weatherIcon, temperature, dayName, weatherDescription) {
    // update the weather image
    window[`day${dayNumber}`].innerText = dayName;
    window[`day${dayNumber}WeatherImage`].src =`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    window[`day${dayNumber}Temperature`].innerText = `${temperature}°C`;
    window[`day${dayNumber}WeatherDescription`].innerText = `${weatherDescription}`;
}


async function getCoordinates() {
    // get city name from ipinfo.io
    apiUrl = `https://ipinfo.io/json?token=${keys.IP_INFO_API_KEY}`;
    // actual API call
    try {
        const response = await fetch(apiUrl);
        cityData = await response.json();
        const [lat,lon] = cityData.loc.split(',');

        // get the weather data for the current day and 7 days after it using the getCurrentWeatherData function
        getCurrentWeatherData(lat, lon, displayWeatherInformation);
    }
    catch (error) {
        console.log(error);
    }
}

getCoordinates();