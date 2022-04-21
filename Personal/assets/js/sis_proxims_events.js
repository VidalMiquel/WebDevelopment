

function cargarDatos(){
    
    var xmlhttp = new XMLHttpRequest();
    var url = "assets/js/events.json";

    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            dades = JSON.parse(xmlhttp.responseText);
            dataVisualizar(dades);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function dataVisualizar(data){
    let date = new Date();
    var actualDate = date.toISOString();

    for (let index = 0; index < data.length; index++) {
            if(data[index].startDate > actualDate){
                visualitzarEvent(data[index]);
            }else{
                console.log("Hola");
            }     
    }
}

function visualitzarEvent(data){
    const contenidor = document.createElement("div");
    const contenidor2 = document.createElement("div");
    const contenidor3 = document.createElement("div");
    const titol = document.createElement("h4");
    const link1 = document.createElement("a");
    const link2 = document.createElement("a");
    const text = document.createElement("p");
    contenidor.className = "col-lg-4 col-md-6 d-flex align-items-stretch mt-4";
    contenidor2.className = "shadow icon-box";
    link1.innerHTML = data.name;
    text.innerHTML = data.description;
    link2.href = "#";
    link2.className = "btn btn-skin btn--radius-2";
    link2.innerHTML = "Veure esdeveniment";
    titol.appendChild(link1);
    contenidor2.appendChild(titol);
    contenidor2.appendChild(text);
    contenidor2.appendChild(link2);
    contenidor.appendChild(contenidor2);
    eventsProxims.appendChild(contenidor);
    
}

cargarDatos();