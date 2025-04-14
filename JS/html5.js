const subNav = document.getElementById("subnav");
const subNavBtns = subNav.querySelectorAll("button");

let menu = 0;
subNavBtns[menu].style.backgroundColor = "indigo";

subNavBtns.forEach((button, index) => {
    button.addEventListener("click", () => {
        subNavBtns.forEach(btn => btn.style.backgroundColor = "");
        button.style.backgroundColor = "indigo";
        menu = index;
        console.log(menu);
    })
})

switch (menu) {
    case 0: {   // Web Storage
        
        break;
    }
    case 1: {   // Web Workers
        
        break;
    }
    case 2: {   // Server-Sent Events
            
        break;
    }
    case 3: {   // Geolocation API
        
        break;
    }
    case 4: {   // Drag and drop API
        
        break;
    }
    case 5: {   // Canvas
        
        break;
    }
    case 6: {   // SVG
        
        break;
    }
}