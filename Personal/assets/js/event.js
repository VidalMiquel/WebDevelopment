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


    var data_filter = data.filter(element => element.identifier == type)
    for (let index = 0; index < data_filter.length; index++) {
        visualitzarEvent(data_filter[index]);
        
    }
    




}

function visualitzarEvent(info) {
    console.log(info.name);
    console.log(info.location);
    console.log(info.organizer);

    crearTitol(info.name, info.location, info.organizer);
    crearBotoPrograma(info.datosextra.program);
}

function crearTitol(nom, lloc, organitzador){
    console.log(nom);
    console.log(lloc);
    console.log(organitzador);
    const titol = document.createElement("h1");
    const geo = document.createElement("h2");
    const org = document.createElement("h3");
    titol.innerHTML = nom;
    titol.id ="titolEsdeveniments";
    geo.innerHTML = lloc;
    geo.id ="llocEvent";
    org.innerHTML = organitzador;
    org.id = "organitzadorEvent";
    titolEvent.appendChild(titol);
    titolEvent.appendChild(geo);
    titolEvent.appendChild(org);

}

function crearBotoPrograma(programa){
    const linkDescarrega = document.createElement("a");
    linkDescarrega.href= programa;
    linkDescarrega.download = programa;
    linkDescarrega.className = "btn btn-skin btn--radius-2";
    linkDescarrega.innerHTML = "Descarrega programa";
    botoPrograma.appendChild(linkDescarrega);
    const linkVisualitza = document.createElement("a");
    linkVisualitza.href= programa;
    linkVisualitza.target = "_blank";
    linkVisualitza.className = "btn btn-skin btn--radius-2";
    linkVisualitza.innerHTML = "Veure programa";
    botoPrograma.appendChild(linkVisualitza);

}
cargarDatos();