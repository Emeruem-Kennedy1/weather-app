const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: false,
            grid: {
                display: false,
                color: '#f5f5f5',
                zeroLineColor: '#f5f5f5',
                zeroLineWidth: 1

            },
            ticks: {
                color: '#f5f5f5',
                fontSize: 12,
                padding: 10,
                stepSize: 10,
                callback: function (value, index, values) {
                    return value + '°C';
                }
            },
            title: {
                display: true,
                text: 'Temperature(°C)',
                color: '#f5f5f5',
            }
        },
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: '#f5f5f5',
                fontSize: 12,
                padding: 10,
                stepSize: 10,
                maxRotation: 0,
                minRotation: 0,
            },
            title: {
                display: true,
                text: 'Time',
                color: '#f5f5f5',
            }
        },
    },
    plugins: {
        title: {
          display: true,
          text: 'Temperature for the next 24 hours in °C',
          fontSize: 20,
          color: '#f5f5f5',
          padding: 10
        },
        legend: {
            display: false,
        },
        responsive: true,
    }
}

function plotChart(context, chartData) {
    const ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(context, {
        type: 'line',
        data: chartData,
        options: chartOptions
    }); 
}