const table = document.querySelector("table");
const rows = table.querySelectorAll("tr");

let chart = null;
let tableData = [];
let labels = ["Első", "Második", "Harmadik", "Negyedik", "Ötödik"];

fillTable();

function fillTable() {
    if (tableData.length > 0)
        tableData = [];

    rows.forEach((row, i) => {
        const datas = row.querySelectorAll("td");
        let x = []
    
        datas.forEach(data => {
            let y = Math.floor(10 + Math.random() * 490);
            data.textContent = y;
            x.push(y);
        });
        tableData.push(x);
    });
}

function drawChart(id) {
    let ctx = document.getElementById('chart').getContext('2d');
    
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Szám",
                    data: tableData[id],
                    borderColor: 'white',
                    borderWidth: 2,
                    fill: false,
                },
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        color: "white"
                    },
                    title: {
                        display: true,
                        text: "Oszlopok",
                        color: "white",
                        font: {
                            padding: 4,
                            size: 20,
                        },
                    },
                    grid: {
                        color: "rgba(255,255,255,0.5)"
                    },
                },
                y: {
                    ticks: {
                        color: "white"
                    },
                    title: {
                        display: true,
                        text: "Értékek",
                        color: "white",
                        font: {
                            size: 20,
                            padding : 4,
                        },
                    },
                    beginAtZero: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Values',
                    },
                    grid: {
                        color: "rgba(255,255,255,0.5)"
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}