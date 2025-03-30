const menu = document.getElementById("crudMenu");
const btCreate = document.getElementById("btCreate");
const btRead = document.getElementById("btRead");

const dataList = document.getElementById("dataList");

const lId = document.getElementById("lId");
const lName = document.getElementById("lName");
const lAge = document.getElementById("lAge");
const lEmail = document.getElementById("lEmail");

const inputId = document.getElementById("id");
const inputName = document.getElementById("name");
const inputAge = document.getElementById("age");
const inputEmail = document.getElementById("email");

const btAction = document.getElementById("btAction");

const btTable = [btCreate, btRead]
const formTable = [
    [lId, inputId],
    [lName, inputName],
    [lAge, inputAge],
    [lEmail, inputEmail],
];

let data = [];

let panel = 0;

function changePanel(num) {
    if (panel === num) {
        panel = 0;
    }
    else {
        panel = num;
    }

    btTable.forEach((button) => {
        button.style.backgroundColor = "black"; 
    });
    
    if (panel != 0)
        btTable[num - 1].style.backgroundColor = "indigo"; 

    showPanel();
}

function showPanel() {
    switch(panel) {
        case 1: { // Create
            showCreatePanel();
            inputId.placeholder = data.length + 1;
            break;
        }

        case 2: { // Read
            showReadPanel();
            break;
        }

        case 0: {
            menu.style.display = "none";
            break;
        }
    }
}

function showCreatePanel() {
    lId.textContent = "Azonosító";

    menu.style.display = "flex";
    lId.style.display = "";
    lName.style.display = "";
    lAge.style.display = "";
    lEmail.style.display = "";
    inputId.style.display = "";
    inputName.style.display = "";
    inputAge.style.display = "";
    inputEmail.style.display = "";
    btAction.style.display = "";
    btAction.textContent = "Create";
}

function showReadPanel() {
    menu.style.display = "flex";
    lName.style.display = "none";
    lAge.style.display = "none";
    lEmail.style.display = "none";
    inputId.style.display = "none";
    inputName.style.display = "none";
    inputAge.style.display = "none";
    inputEmail.style.display = "none";
    btAction.style.display = "none";
}

function checkCreateData() {
    let valid = true;
    let errors = document.getElementsByClassName("textErrors");
    
    for (let i = 0; i < 3; i++) {
        if (formTable[i + 1][1].value == "") {
            errors[i].style.display = "block";
            valid = false;
        }
        else
            errors[i].style.display = "none";
    }

    return valid;
}

function dataCreated() {
    if (checkCreateData()) {
        menu.style.backgroundColor = "red";
    }
}

function dataRead() {
    if (data.length === 0)
        lId.textContent = "A tábla üres";
    else {
        lId.textContent = "A beolvasás sikeresen megtörtént";
    }
}