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


/*
Mètode que realitza la crida amb l'objectiu d'obtenir el fitxer JSON especificat a la URL.
*/
function cargarDatos() {
    var xmlhttp = new XMLHttpRequest();
    //Fitxer a obtenir.
    var url = "assets/js/events.json";
    //Realitzam crida.
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //Parsejam el resultat de la crida per poder tractar les dades.
            dades = JSON.parse(xmlhttp.responseText);
            //Passam per paràmetre el contingut del fitxer per poder integrar-ho dins la pràctica.
            dataVisualizar(dades);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/*
Mètode que filtra les dades segons l'indicat pre part de l'usuari. Feim servir el tipus obtingut anteriorment.
*/
function dataVisualizar(data) {
    //Introduim el títiol de la seccio.
    const tit = document.createElement("h1");
    tit.innerHTML = type;
    titolSeccio.appendChild(tit);
    //Obtenim el tipus d'esdeveniments a visualitzar.
    if(type != 'preferits'){
        //Cas no preferits. Filtram segons tipus.
        //Filtram el fitxer segons el tipus.
        var data_filter = data.filter(element => element.about == type)
        //Ordenam segons la data d'inici
        sortJSON(data_filter, 'startDate', 'asc');
        for (let index = 0; index < data_filter.length; index++) {
            visualitzarEvent(data_filter[index]);
        }
    }else{
        //Cas preferits.
        var preferits = JSON.parse(localStorage.getItem('dades'));
        //Si hi ha preferits.
        if(preferits){
            for (let i = 0; i < preferits.length; i++) {
                //Filtram segons l'id.
                var data_filter = data.filter(element => element.identifier == preferits[i]);
                visualitzarEvent(data_filter[0]);
            }    
        }else{
            const missatgeError = document.createElement("h1");
            const botoEnrrere = document.createElement("a");
            botoEnrrere.href = "cercador.html";
            botoEnrrere.className = "btn btn-skin btn--radius-2";
            botoEnrrere.innerHTML = "VEURE EVENTS";
            missatgeError.className = "pb-3";
            missatgeError.innerHTML = "No hi ha events preferits guardats";
            eventsProximsPerTipus.className = "text-center p-5";
            eventsProximsPerTipus.appendChild(missatgeError);
            eventsProximsPerTipus.appendChild(botoEnrrere);
            
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
    if (data.startDate == data.endDate) {
        dia.innerHTML = data.startDate;
    } else {
        dia.innerHTML = "Del " + data.startDate + " fins al " + data.endDate;
    }
    dia.id = "diaEvent";
    dia.className = "p-2";

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