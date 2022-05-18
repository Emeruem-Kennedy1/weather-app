var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


// get the current weather data from the openweathermap.org api
async function getCurrentWeatherData(lat, lon) {
    apuURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${config.MY_API_KEY}&units=metric`;
    // actual API call
    try {
        const response = await fetch(apuURL);
        weatherData = await response.json();

        // extract the weather data from the response
        extractWeatherInformation(weatherData, 1);

    } catch (error) {
        console.log(error);
    }
}

// fuction to check what to do if there is a succesful request. we should call the getCurrentWeatherData function
const succesfulRequest = (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    // call the getCurrentWeatherData function to get the weather data from the latitude and longitude
    getCurrentWeatherData(lat, long);
}

// function to show what to do if there is a failed request 
const failedRequest = () => {
    console.error(error);
}

// attempt getting the user location from the browser using the geolocation API and then call the succesfulRequest function if the request is succesful and the failedRequest function if it fails
navigator.geolocation.getCurrentPosition(succesfulRequest, failedRequest);


// use the data from the api to do something (particularly display it to the user)
function extractWeatherInformation(weatherData) {
    // extract the weather data for current day and 7 days after it from the response

    days = weatherData.daily;

    // loop through the days and update the weather information for each day    
    for (let day = 0; day < days.length - 1; day++) {
        // get the name of the day of the week
        dayName = getDayOfTheWeek(days[day].dt).slice(0, 3).toUpperCase(); 
        weatherDescription = days[day].weather[0].description;
        temperature = Math.round(days[day].temp.day * 10) / 10;
        // update the image, temperature and day name for the current day using the updateDay function
        updateDay(day, days[day].weather[0].icon, temperature, dayName, weatherDescription);
        
    }
}


// convert dt to a date and get the day of the week
function getDayOfTheWeek(dt) {
    let date = new Date(dt * 1000);
    day = date.getDay();
    return daysOfTheWeek[day];
}


function updateDay(dayNumber, weatherIcon, temperature, dayName, weatherDescription) {
    // update the weather image
    window[`day${dayNumber}`].innerText = dayName;
    window[`day${dayNumber}WeatherImage`].src =`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    window[`day${dayNumber}Temperature`].innerText = `${temperature}°C`;
    window[`day${dayNumber}WeatherDescription`].innerText = `${weatherDescription}`;
}