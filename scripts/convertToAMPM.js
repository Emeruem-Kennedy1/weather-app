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
