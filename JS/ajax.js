const output = document.getElementById("readData");

const nameInput = document.getElementById("name");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const uId = document.getElementById("uId");
const uName = document.getElementById("uName");
const uHeight = document.getElementById("uHeight");
const uWeight = document.getElementById("uWeight");

const delId = document.getElementById("delId");

const code = "K1L4WMxyz123";
const url = "http://gamf.nhely.hu/ajax2/";

async function readData() {
    try {
        output.innerHTML = "";

        let response = await fetch(url, {
            method: "post",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "code="+code+"&op=read"
        })

        let data = await response.json();
        let list = data.list;
        const p1 = document.createElement("p");
        p1.textContent = "Adatok száma: " + data.rowCount;
        output.appendChild(p1);

        const p2 = document.createElement("p");
        p2.textContent = "Adatok (max " + data.maxNum + "):";
        output.appendChild(p2);

        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        ["ID", "Név", "Magasság", "Súly"].forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        
        list.forEach(row => {
            const tr = document.createElement("tr");
        
            const tdId = document.createElement("td");
            tdId.textContent = row.id;
            tr.appendChild(tdId);

            const tdName = document.createElement("td");
            tdName.textContent = row.name;
            tr.appendChild(tdName);
        
            const tdHeight = document.createElement("td");
            tdHeight.textContent = row.height;
            tr.appendChild(tdHeight);
        
            const tdWeight = document.createElement("td");
            tdWeight.textContent = row.weight;
            tr.appendChild(tdWeight);
        
            tbody.appendChild(tr);
        });
        

        table.appendChild(tbody);
        output.appendChild(table);

        const p3 = document.createElement("p");
        let sum = 0, avg = 0, max = 0;
        for (let i = 0; i < list.length; i++) {
            sum += parseInt(list[i].height);
            if (parseInt(list[i].height) > max) max = parseInt(list[i].height);
        }
        avg = (sum / list.length).toFixed(2);

        p3.innerText = "Magasságok összege: " + sum + "\nÁtlag magasság: " + avg + "\nLegnagyobb magasság: " + max;
        output.appendChild(p3);
    }
    catch (e) {
        console.error("Hiba történt: " + e);
    }
}

async function createData() {
    if (
        nameInput.value.trim().length > 0 && nameInput.value.trim().length <= 30 &&
        heightInput.value.trim().length > 0 && heightInput.value.trim().length <= 30 &&
        weightInput.value.trim().length > 0 && weightInput.value.trim().length <= 30
      )
      {
        try {
            let response = await fetch(url, {
                method: "post",
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: "code="+code+"&op=create&name="+nameInput.value+"&height="+heightInput.value+"&weight="+weightInput.value
            })
    
            let data = await response.text();
            const resultText = document.getElementById("cResult");
            resultText.style.visibility = "visible";
    
            if (parseInt(data) > 0)
                resultText.textContent = "Az új adat létrehozva!";
            else
                resultText.textContent = "Új adat létrehozása sikertelen!";

            nameInput.value = "";
            heightInput.value = "";
            weightInput.value = "";
    
            readData();
    
            setTimeout(() => {
                resultText.style.visibility = "hidden";
            }, 5000);
        }
        catch (e) {
            console.error("Hiba történt: " + e);
        }
    }
    else {
        alert("A mezők kitöltése kötelező!\nAz adatok maximum 30 karakter hosszúak lehetnek!");
    }
}

async function updateData() {
    if (
        uId.value.trim().length > 0 && uId.value.trim().length <= 30 &&
        uName.value.trim().length > 0 && uName.value.trim().length <= 30 &&
        uHeight.value.trim().length > 0 && uHeight.value.trim().length <= 30 &&
        uWeight.value.trim().length > 0 && uWeight.value.trim().length <= 30
      )
      {
        try {
            let response = await fetch(url, {
                method: 'post',
                cache: 'no-cache',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: "code="+code+"&op=update&id="+uId.value+"&name="+uName.value+"&height="+uHeight.value+"&weight="+uWeight.value
              });
    
              let data = await response.text(); 
              const resultText = document.getElementById("uResult");
              resultText.style.visibility = "visible";
    
              if (parseInt(data) > 0)
                resultText.textContent = "A(z) (" + uId.value + ") sikeresen módosult!";
            else
                resultText.textContent = "A(z) (" + uId.value + ") adat módosítása sikertelen!";

            uId.value = "";
            uName.value = "";
            uHeight.value = "";
            uWeight.value = "";
    
            readData();
    
            setTimeout(() => {
                resultText.style.visibility = "hidden";
            }, 5000);
        }
        catch (e) {
            console.error("Hiba történt: " + e);
        }
      }
      else {
        alert("A mezők kitöltése kötelező!\nAz adatok maximum 30 karakter hosszúak lehetnek!");
      }
}

async function deleteData() {
    if (delId.value.trim().length > 0 && delId.value.trim().length <= 30) {
        try {
            let response = await fetch(url, {
                method: 'post',
                cache: 'no-cache',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: "code="+code+"&op=delete&id="+delId.value
              });
    
            let data = await response.text();
            const resultText = document.getElementById("dResult");
            resultText.style.visibility = "visible";
    
            if (parseInt(data) > 0)
                resultText.textContent = "A(z) (" + delId.value + ") adat törölve lett!";
            else
                resultText.textContent = "A(z) (" + delId.value + ") adatot nem sikerült törölni!";
            
            delId.value = "";
    
            readData();
    
            setTimeout(() => {
                resultText.style.visibility = "hidden";
            }, 5000);
        }
        catch (e) {
            console.error("Hiba történt: " + e);
        }
    }
    else {
        alert("A megadott ID helytelen!");
    }
}

async function getDataForId() {
    try {
        let response = await fetch(url, {
            method: "post",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "code="+code+"&op=read"
        })
    
        let data = await response.json();
        let list = data.list;
    
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == uId.value) {
                uName.value = list[i].name;
                uHeight.value = list[i].height;
                uWeight.value = list[i].weight;
    
                break;
            }
        }
    }
    catch (e) {
        console.error("Hiba történt: " + e);
    }
}