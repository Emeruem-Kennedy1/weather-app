// this file finds the an image of the person's city and displays it
// I will use the unsplash API to query the image

async function getImageUrl(city) {
    // get the city name from the input field
    let cityName = city;

    apiURL = `https://api.unsplash.com/search/photos?query=${cityName}&client_id=${keys.UNSPLASH_ACCESS_KEY}`;
    // actual API call
    try {
        const response = await fetch(apiURL);
        imageData = await response.json();

        imgUrl = imageData.results[Math.floor(Math.random() * imageData.results.length)].urls.regular;
        document.body.style.background = "url(" + imgUrl + ") rgba(46, 51, 104, 0.678) no-repeat";
        document.body.style.backgroundSize = "cover";

        setInterval(() => {
            // get a random image url from the response
            let randomImageUrl = imageData.results[Math.floor(Math.random() * imageData.results.length)].urls.full;

            // update the image with the random image url
            document.body.style.background = "url(" + randomImageUrl + ") rgba(46, 51, 104, 0.678) no-repeat";
            document.body.style.backgroundSize = "cover";   
        }, 300000); // get a new image every 5 minutes
        // set the image url to the background image of the page

    }
    catch (error) {
        console.log(error);
    }

}

async function getCityName() {
    apiUrl = `https://ipinfo.io/json?token=${keys.IP_INFO_API_KEY}`;
    // actual API call
    try {
        const response = await fetch(apiUrl);
        cityData = await response.json();
        cityName = cityData.city;

        // get country name from country code
        countryName = getCountryName(cityData.country);
        
        country.innerText = countryName;
        city.innerText = cityName;
        getImageUrl(cityName);
    }
    catch (error) {
        console.log(error);
    }
}

// get country name from country code
function getCountryName(countryCode) {
    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
    );

    return regionNames.of(countryCode);
}


getCityName();