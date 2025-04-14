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
let dataShowed = false;
let editOrCreate = 0; // 0 create -- 1 edit gomb

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
            editOrCreate = 0;
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

    for (let i = 1; i < formTable.length; i++) {
        formTable[i][1].placeholder = "";
        formTable[i][1].value = "";
    }

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

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            if (formTable[0][1].value == data[i][0]) {
                errors[0].style.display = "block";
                valid = false;
            }
        }

        if (valid && errors[0].style.display === "block")
            errors[0].style.display = "none";
    }

    if (formTable[0][1].value != "" && formTable[0][1].value < 1) {
        errors[0].textContent = "A megadott ID helytelen!";
        errors[0].style.display = "block";
        valid = false;
    }
    else if (formTable[0][1].value != "" || formTable[0][1].value > 0) {
        errors[0].textContent = "A megadott ID már létezik!";
        //errors[0].style.display = "none";
    }

    for (let i = 1; i < 4; i++) {
        if (formTable[i][1].value == "") {
            errors[i].style.display = "block";
            valid = false;
        }
        else
            errors[i].style.display = "none";
    }

    return valid;
}

function dataCreated() {
    switch (editOrCreate) {
        case 0: {   // create

            if (checkCreateData()) {
                let table = document.getElementById("dataList").getElementsByTagName("tbody")[0];
                let newData = getNewData();
                let newRow = table.insertRow();
        
                if (!newData) return;
        
                data.push(newData);
        
                for (let i = 0; i < newData.length; i++) {
                    let cell = newRow.insertCell();
                    cell.textContent = newData[i];
                }
        
                let actionCell = newRow.insertCell();
                let btnEdit = document.createElement("button");
        
                let icon = document.createElement("i");
                icon.classList.add("fa", "fa-pen");
                btnEdit.appendChild(icon);
                btnEdit.onclick = (e) => rowEdit(e.target.closest("tr"));
        
                let btnDelete = document.createElement("button");
        
                let icon2 = document.createElement("i");
                icon2.classList.add("fa", "fa-trash");
                btnDelete.appendChild(icon2);
                btnDelete.onclick = (e) => rowDelete(e.target.closest("tr"));
                
                actionCell.appendChild(btnEdit);
                actionCell.appendChild(btnDelete);
        
                inputId.placeholder = data.length + 1;
                for (let i = 0; i < formTable.length; i++) {
                    formTable[i][1].value = "";
                }
        
            }

            break;
        }
        case 1: {   // edit
            
            if (checkCreateData) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i][0] == formTable[0][1].placeholder) {
                        for (let j = 0; j < data[i].length; j++) {
                            if (formTable[j][1].value !== "")
                                data[i][j] = formTable[j][1].value;
                            else 
                                data[i][j] = formTable[j][1].placeholder;
                        }
                    }
                }

                dataRead();
                editOrCreate = 0;
            }

            break;
        }
    }
}

function dataRead() {
    if (data.length === 0)
        lId.textContent = "A tábla üres";
    else {
        {
            let table = document.getElementById("dataList").querySelector("tbody");
            if (!table) return;
            if (table.firstChild) {
                while (table.firstChild) {
                    table.removeChild(table.firstChild);
                }
            }
        }
        if (!dataShowed){
            let table = document.getElementById("dataList").getElementsByTagName("tbody")[0];
            
            for (let i = 0; i < data.length; i++) {
                let newRow = table.insertRow();

                for (let j = 0; j < data[i].length; j++) {
                    let cell = newRow.insertCell();
                    cell.textContent = data[i][j];
                }

                let actionCell = newRow.insertCell();
                let btnEdit = document.createElement("button");

                let icon = document.createElement("i");
                icon.classList.add("fa", "fa-pen");
                btnEdit.appendChild(icon);
                btnEdit.onclick = (e) => rowEdit(e.target.closest("tr"));

                let btnDelete = document.createElement("button");

                let icon2 = document.createElement("i");
                icon2.classList.add("fa", "fa-trash");
                btnDelete.appendChild(icon2);
                btnDelete.onclick = (e) => rowDelete(e.target.closest("tr"));

                actionCell.appendChild(btnEdit);
                actionCell.appendChild(btnDelete);

                dataShowed = true;
                //lId.textContent = "A beolvasás megtörtént";
            }
        }
        else {
            let table = document.getElementById("dataList").querySelector("tbody");
            if (!table) return;

            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }

            dataShowed = false;
        }
    }
}

function getNewData() {
    let datas = [];
    for (let i = 0; i < formTable.length; i++) {
        if (i === 0) {
            if (formTable[i][1].value === "") // ID ellenőrzés nem tökéletes
                datas.push(data.length + 1);
            else
                datas.push(formTable[i][1].value);
        }
        else datas.push(formTable[i][1].value);
    }

    return datas;
}

function rowDelete(row) {

    row.remove();
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] == row.firstChild.textContent) {
            data.splice(i, 1);
            break;
        }
    }
}

function rowEdit(row) {
    showCreatePanel();
    btAction.textContent = "Edit";
    editOrCreate = 1;
    
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] == row.firstChild.textContent){
            for (let j = 0; j < formTable.length; j++) {
                formTable[j][1].placeholder = data[i][j];
            }
            
            break;
        }
    }
}