const subNav = document.getElementById("subnav");
const subNavBtns = subNav.querySelectorAll("button");
const menus = document.querySelectorAll("article");
const webStorageInputs = document.querySelectorAll("#f0 input");

let menu = 0;
subNavBtns[menu].style.backgroundColor = "indigo";

subNavBtns.forEach((button, index) => {
    button.addEventListener("click", () => {
        subNavBtns.forEach(btn => {btn.style.backgroundColor = ""});
        button.style.backgroundColor = "indigo";
        menu = index;
        
        menus.forEach(x => {
            if (x.id == "f"+menu)
                x.style.display = "flex";
            else
                x.style.display = "none";
        })

    })
})

//      Web Storage

webStorageInputs.forEach((input, i) => {
    if (i < 2) {
        input.value = sessionStorage.getItem("sessionInput" + i) || '';
        input.addEventListener("input", function () {
            sessionStorage.setItem("sessionInput" + i, this.value);
        })
    }
    else {
        input.value = localStorage.getItem("localInput" + i) || '';
        input.addEventListener("input", function () {
            localStorage.setItem("localInput" + i, this.value);
        })
    }
})

//      Web Worker

let primeWorker;

function startPrimeSearch() {
    const digits = parseInt(document.getElementById("digitInput").value);
    if (isNaN(digits) || digits < 1 || digits > 8) {
        alert("A megadott szám 1 és 8 között lehet!");
        return;
    }

    if (!primeWorker) {
        primeWorker = new Worker("/JS/worker.js");
        primeWorker.addEventListener("message", function(e) {
            document.getElementById("primeResult").textContent = e.data;
        })
    }

    primeWorker.postMessage(digits);
    document.getElementById("primeResult").textContent = "A keresés folyamatban"
}

//      Server-Sent Events

let simRunning;
let prices = [];

function startSim() {
    if (simRunning) return;
    
    document.getElementById("f2OutPut").textContent = "Várakozás...";
    setTimeout(() => {
        document.getElementById("f2OutPut").textContent = "";
    }, 3000);

    simRunning = setInterval(() => {
        const newPrice = (100 + Math.random() * 20).toFixed(2);
        const time = new Date().toLocaleTimeString();

        prices.push(`${newPrice} USD (${time})`);
            document.getElementById("f2OutPut").innerText += prices[prices.length - 1] + "\n";
        
    }, 3000);
}

function stopSim() {
    clearInterval(simRunning);
    simRunning = null;
    prices = [];
    document.getElementById("f2OutPut").textContent = "Szimuláció leállítva";
}

//      Geolocation API

const geoResults = document.getElementById("geoResults");


function showCoordinates() {
    
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    else
    geoResults.textContent = "A böngésző nem támogadja a Geolocation-t.";

}

function showPosition(pos) {
    const lat = pos.coords.latitude.toFixed(6);
    const lon = pos.coords.longitude.toFixed(6);
    geoResults.innerText = `Szélesség: ${lat}°\nHosszúság: ${lon}°`;
}


function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            geoResults.textContent = "A felhasználó megtagadta a helyhozzáférést.";
            break;
        case error.POSITION_UNAVAILABLE:
            geoResults.textContent = "A helyadat nem elérhető.";
            break;
        case error.TIMEOUT:
            geoResults.textContent = "A helymeghatározás időtúllépés miatt megszakadt.";
            break;
        default:
            geoResults.textContent = "Ismeretlen hiba történt.";
            break;
    }
}

//      Drag and Drop API

function allowDrop(e) {
    e.preventDefault();
}
function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
}
function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const element = document.getElementById(data);

    if (e.target.tagName === "DIV")
        e.target.appendChild(element);
}

//      Canvas

function drawShape() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        
        ctx.beginPath();
        ctx.arc(150, 75, 40, 0, 2 * Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(86, 200, 40, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    }
    else
        alert("A böngésző nem támogadja a Canvas-t!");
}