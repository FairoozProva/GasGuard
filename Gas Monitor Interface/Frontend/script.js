const GAS_THRESHOLD = 1000;
const MAX_POINTS = 20;

let ctx = document.getElementById('gasChart').getContext('2d');
let gasChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array(MAX_POINTS).fill(''),
        datasets: [{
            label: 'Gas Sensor Value',
            data: Array(MAX_POINTS).fill(0),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            pointRadius: 2,
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 2000,
                ticks: { 
                    stepSize: 100,
                    font: {
                        size: 12
                    }
                }
            },
            x: {
                ticks: {
                    maxTicksLimit: MAX_POINTS, 
                    maxRotation: 45,
                    font: {
                        size: 12
                    }
                }
            }
        }
    }
});



function fetchGasData() {
  fetch('/api/gas/latest')
    .then(response => response.json())
    .then(data => {
      let gasValue = parseInt(data?.value) || 0;
      document.getElementById('gasValue').innerText = gasValue.toString();

      let alertBox = document.getElementById('alertBox');
      if (gasValue > GAS_THRESHOLD) {
        alertBox.innerText = "ALERT: GAS DETECTED!";
        alertBox.classList.add("alert");
      } 
      else {
        alertBox.innerText = "SAFE";
        alertBox.classList.remove("alert");
      }

      // Rotate the arrays instead of push/shift for better performance
      gasChart.data.labels = [...gasChart.data.labels.slice(1), new Date().toLocaleTimeString()];
      gasChart.data.datasets[0].data = [...gasChart.data.datasets[0].data.slice(1), gasValue];
      
      gasChart.update('none'); // no animation, smooth update
    })
  .catch(err => console.error(err));
}

setInterval(fetchGasData, 500);

document.addEventListener('DOMContentLoaded', () => {
    const muteBtn = document.getElementById('muteBtn');
    muteBtn.addEventListener('click', () => {
        fetch('/api/mute', { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                muteBtn.innerText = data.mute ? "Unmute Buzzer" : "Mute Buzzer";
            });
    });
});
