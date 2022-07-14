var daystyle = document.getElementsByClassName("Day");
// change the visibilty values in the dom to hidden or visible based on the boolean value input
function changeDomLoading(boolVal) {
    for (let dayNumber = 0; dayNumber < 7; dayNumber++) {
        window[`day${dayNumber}`].hidden = boolVal;
        window[`day${dayNumber}WeatherImage`].hidden = boolVal;
        window[`day${dayNumber}Temperature`].hidden = boolVal;
        window[`day${dayNumber}WeatherDescription`].hidden = boolVal; ;
    }
}

// functions to display the loader svg or only the weather information 
function loading() {
    for (let div = 0; div < loader.length; div++) {
        loader[div].hidden = false;
        window[`day${div}`].style.display = "none";
    }
    changeDomLoading(true);
};

function complete() {
    changeDomLoading(false);
    for (let div = 0; div < loader.length; div++) {
        loader[div].hidden = true;
        window[`day${div}`].style.display = "block";
    };
};