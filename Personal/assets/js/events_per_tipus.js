/*
NOM DEL FITXER: events_per_tipus.js
FUNCIONALITAT: segons el tipus d'event a voler a visualitzar, es filtre el fitxer json i 
            es visualitza per pantalla. Per això, obtenir el tipus d'event, segons aquest
            tipus, es filtre el json, i finalment, visualitzam els events determinats.
ON TROBAM AQUESTA FUNCINALITAT:events_per_tipus.html
*/
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

var type = getUrlParameter('eventType');
console.log(type);


function cargarDatos() {
    var xmlhttp = new XMLHttpRequest();
    var url = "assets/js/events.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            dades = JSON.parse(xmlhttp.responseText);
            dataVisualizar(dades);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function dataVisualizar(data) {
    const tit = document.createElement("h1");
    tit.innerHTML = type;
    titolSeccio.appendChild(tit);

    if(type == "tots"){
        for (let index = 0; index < data.length; index++) {
            visualitzarEvent(data[index]);
        }
    }else{
        var data_filter = data.filter(element => element.about == type)
        console.log(data_filter);
        for (let index = 0; index < data_filter.length; index++) {
            visualitzarEvent(data_filter[index]);
        }
    }

}

function visualitzarEvent(data) {
    const contenidor = document.createElement("div");
    const contenidor2 = document.createElement("div");
    const contenidor3 = document.createElement("div");
    const contenidor4 = document.createElement("div");
    const titol = document.createElement("h4");
    const link1 = document.createElement("a");
    const link2 = document.createElement("a");
    const text = document.createElement("p");
    const dia = document.createElement("p");
    dia.innerHTML = data.startDate;
    contenidor.className = "col-lg-4 col-md-6 d-flex align-items-stretch ";
    contenidor2.className = "shadow icon-box";
    contenidor3.className = "icon";
    logo = document.createElement('img');
    logo = document.createElement('img');
    logo.style.height = "60px";
    logo.style.width = "60px";
    if(data.about == "fira"){
        logo.src = "assets/svg/fira.svg"
    }else if (data.about == "verbena") {
        logo.src = "assets/svg/verbena.svg";
    }else if(data.about == "concert"){
        logo.src = "assets/svg/concert.svg"
    }
    
    logo.class = "image.fluid";
    contenidor3.appendChild(logo);
    link1.innerHTML = data.name;
    text.innerHTML = data.description;
    link2.href="event.html?eventType=" + data.identifier ;
    link2.className = "btn btn-skin btn--radius-2";
    link2.innerHTML = "Veure esdeveniment";
    titol.appendChild(link1);
    contenidor2.appendChild(contenidor3);
    contenidor2.appendChild(titol);
    contenidor2.appendChild(dia);
    contenidor2.appendChild(text);
    contenidor2.appendChild(link2);
    contenidor.appendChild(contenidor2);
    eventsProximsPerTipus.appendChild(contenidor);

}

cargarDatos();