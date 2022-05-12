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

    let date = new Date();
    var actualDate = date.toISOString();

    const tit = document.createElement("h1");
    tit.innerHTML = type;
    titolSeccio.appendChild(tit);


    if(type != 'preferits'){
        var data_filter = data.filter(element => element.about == type)
        sortJSON(data_filter, 'startDate', 'asc');
        for (let index = 0; index < data_filter.length; index++) {
            visualitzarEvent(data_filter[index]);
        }
    }else{
        var preferits = JSON.parse(localStorage.getItem('dades'));
        console.log(preferits);
        if(preferits){
            for (let i = 0; i < preferits.length; i++) {
                var data_filter = data.filter(element => element.identifier == preferits[i]);
                console.log(data_filter);
                visualitzarEvent(data_filter[0]);
            }    
        }else{
            alert("No hi ha preferits")
        }

    }

}

function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
        y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}

function visualitzarEvent(data) {
    const contenidor = document.createElement("div");
    const contenidor2 = document.createElement("div");
    const contenidor3 = document.createElement("div");
    const contenidor4 = document.createElement("div");
    const titol = document.createElement("h2");
    const link2 = document.createElement("a");
    const text = document.createElement("p");
    const lloc = document.createElement("h3");
    const dia = document.createElement("h4");
    dia.innerHTML = data.startDate;
    dia.id = "diaEvent";
    contenidor.className = "col-lg-4 pt-3 pb-3 col-md-6 d-flex align-items-stretch ";
    contenidor2.className = "shadow icon-box";
    contenidor3.className = "icon";
    logo = document.createElement('img');
    logo.style.height = "60px";
    logo.style.width = "60px";
    if(data.about == "fira"){
        logo.src = "assets/svg/fira.svg"
        logo.alt = "Logotip de l'event de tipus fira";
    }else if (data.about == "verbena") {
        logo.src = "assets/svg/verbena.svg";
        logo.alt = "Logotip de l'event de tipus verbena";
    }else if(data.about == "concert"){
        logo.src = "assets/svg/concert.svg"
        logo.alt = "Logotip de l'event de tipus concert";
    }
    lloc.innerHTML = data.location;
    lloc.id = "llocEvent";
    logo.class = "image.fluid";
    contenidor3.appendChild(logo);
    titol.innerHTML = data.name;
    titol.id = "titolEvent";
    text.innerHTML = data.description;
    link2.href="event.html?eventType=" + data.identifier ;
    link2.className = "btn btn-skin btn--radius-2";
    link2.innerHTML = "Veure esdeveniment";
    contenidor2.appendChild(contenidor3);
    contenidor2.appendChild(titol);
    contenidor2.appendChild(lloc);
    contenidor2.appendChild(dia);
    contenidor2.appendChild(text);
    contenidor2.appendChild(link2);
    contenidor.appendChild(contenidor2);
    eventsProximsPerTipus.appendChild(contenidor);

}

cargarDatos();