
var hour = document.getElementById('hour');
var minute = document.getElementById('minute');
var second = document.getElementById('second');
var todayDate = document.getElementById('date');

// a simple clock that updates every second and displays the current local time and date
function showTime() {

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    var day = date.getDay();
    var month = date.getMonth();
    var year = date.getFullYear();
    var dayNumber = date.getDate();

    if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }

    hour.innerHTML = h;
    minute.innerHTML = m;
    second.innerHTML = s;


    todayDate.innerText = `${days[day]}, ${dayNumber}  ${months[month]} ${year}`;

    setTimeout(showTime, 1000);
}

showTime();
