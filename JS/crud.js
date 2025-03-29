const menu = document.getElementById("crudMenu");
const btCreate = document.getElementById("btCreate");
const btRead = document.getElementById("btRead");
const btUpdate = document.getElementById("btUpdate");
const btDelete = document.getElementById("btDelete");

const lId = document.getElementById("lId");
const lName = document.getElementById("lName");
const lAge = document.getElementById("lAge");
const lEmail = document.getElementById("lEmail");

const inputId = document.getElementById("id");
const inputName = document.getElementById("name");
const inputAge = document.getElementById("age");
const inputEmail = document.getElementById("email");

const btAction = document.getElementById("btAction");

const btTable = [btCreate, btRead, btUpdate, btDelete]
const formTable = [
    [lId, inputId],
    [lName, inputName],
    [lAge, inputAge],
    [lEmail, inputEmail],
];

let panel = 0;

function changePanel(num) {
    if (panel === num) {
        panel = 0;
    }
    else {
        let lastPanel = panel;
        panel = num;

        if (panel != 0) {
            btTable.forEach((button) => {
                button.style.backgroundColor = "black"; 
            });

            btTable[num - 1].style.backgroundColor = "indigo"; 
        }
    }

    showPanel();
}

function showPanel() {
    switch(panel) {
        case 1: { // Create
            showCreatePanel();
            break;
        }

        case 2: { // Read
            showReadPanel();
            break;
        }

        case 3: { // Update
            showUpdatePanel();
            break;
        }
        
        case 4: { // Delete
            showDeletePanel();
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

    lId.textContent = "A beolvasás sikeresen megtörtént";
}

function showUpdatePanel() {
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
    btAction.textContent = "Update";
}

function showDeletePanel() {
    lId.textContent = "Azonosító";

    menu.style.display = "flex";
    lName.style.display = "none";
    lAge.style.display = "none";
    lEmail.style.display = "none";
    inputId.style.display = "";
    inputName.style.display = "none";
    inputAge.style.display = "none";
    inputEmail.style.display = "none";
    btAction.style.display = "";
    btAction.textContent = "Delete";
}
