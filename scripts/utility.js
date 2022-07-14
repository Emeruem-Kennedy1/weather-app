const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// convert dt to a date and get the day of the week
function getDayOfTheWeek(dt) {
    const date = new Date(dt * 1000);
    day = date.getDay();
    return daysOfTheWeek[day];
}

// function that converts 24-hour time to 12-hour time
function convertToAMPM(hour) {
    if (hour > 12) {
        return hour - 12 + ' pm';
    } else if (hour === 0) {
        return 12 + ' am';
    } else {
        return hour + ' am';
    }
}