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

    crearTitol(info.name);
    APItiempo(info.latitude, info.longitude);
    introduirMapa(info.latitude, info.longitude);
    introduirFotografiaPrincipal(info.datosextra.gallery[0]);
    introduirInformacioEvent(info);
    crearBotoPrograma(info.datosextra.program);
}

function crearTitol(nom){
    const titol = document.createElement("h1");
    titol.innerHTML = nom;
    titolEvent.appendChild(titol);

}

function crearBotoPrograma(programa) {
    const linkDescarrega = document.createElement("a");
    linkDescarrega.href = programa;
    linkDescarrega.download = programa;
    linkDescarrega.className = "btn btn-skin btn--radius-2";
    linkDescarrega.innerHTML = "Descarrega programa";
    botoPrograma.appendChild(linkDescarrega);
    const linkVisualitza = document.createElement("a");
    linkVisualitza.href = programa;
    linkVisualitza.target = "_blank";
    linkVisualitza.className = "btn btn-skin btn--radius-2";
    linkVisualitza.innerHTML = "Veure programa";
    botoPrograma.appendChild(linkVisualitza);

}



function APItiempo(lat, lon) {


    var apiid = "17eaa46a6e0645c810da44bce335de2a";
    var xmlhttp = new XMLHttpRequest();
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + apiid;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            dades = JSON.parse(xmlhttp.responseText);
            console.log(dades);
            montarInfoTiempo(dades);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function montarInfoTiempo(dades) {

    var tmp_actual = Math.round(dades.main.temp - 273.15);
    var tmp_min = Math.round(dades.main.temp_min - 273.15);
    var tmp_max = Math.round(dades.main.temp_max - 273.15);
    var description = dades.weather[0].main;
    var url = "http://openweathermap.org/img/wn/" + dades.weather[0].icon + "@2x.png";

    const contenidor = document.createElement("div");
    const temperaturaActualTitol = document.createElement("h5");
    const temperaturaMaxTitol = document.createElement("h8");
    const temperaturaMinTitol = document.createElement("h8");
    const temperaturaActual = document.createElement("p");
    const temperaturaDiaMax = document.createElement("p");
    const temperaturaDiaMin = document.createElement("p");
    const iconeTemperatura = document.createElement("img");
    iconeTemperatura.src = url;
    iconeTemperatura.className = "img-fluid";
    temperaturaActualTitol.innerHTML = "Temperatura actual";
    temperaturaActual.innerHTML = tmp_actual + "C";
    temperaturaActual.style.margin = "0";
    temperaturaMaxTitol.innerHTML = "Temperatura màxima";
    temperaturaDiaMax.innerHTML = tmp_max + "C";
    temperaturaMinTitol.innerHTML = "Temperatura mínima";
    temperaturaDiaMin.innerHTML = tmp_min + "C";
    tiempo.appendChild(temperaturaActualTitol);
    tiempo.appendChild(temperaturaActual);
    tiempo.appendChild(iconeTemperatura);
    contenidor.className = "text-justify";
    contenidor.appendChild(temperaturaMaxTitol);
    contenidor.appendChild(temperaturaDiaMax);
    contenidor.appendChild(temperaturaMinTitol);
    contenidor.appendChild(temperaturaDiaMin);
    tiempo.appendChild(contenidor);



}

function introduirMapa(lat, long) {

    var map = L.map('map').setView([lat, long], 14);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidmlkYWxlZXQiLCJhIjoiY2wybm54amo2MjIxbTNpcDltZnl5bXNwMyJ9.UIILxO61B7Jn2dICDsyUtA'
    }).addTo(map);

    var marker = L.marker([lat,long]).addTo(map);

    var home = document.getElementById("botoCentrar");
    home.addEventListener("click", function(){
        map.setView([lat,long], 14);
    });

}

function introduirFotografiaPrincipal(fotografia){
    const imatge = document.createElement("img");
    imatge.className = "img-fluid";
    imatge.src = fotografia;
    imatgeEvent.appendChild(imatge);
}

function introduirInformacioEvent(event){

    //Lloc de l'event
    const lloc = document.createElement("h1");
    lloc.innerHTML = event.location;
    lloc.id = "idEvent";;
    //Organitzador de l'event
    const organitzador = document.createElement("h3");
    organitzador.innerHTML = event.organizer;
    organitzador.id = "organitzadorEvent";
    //Dia de l'event
    const dia = document.createElement("h5");
    dia.id = document.id = "diaEvent";
    if(event.startDate == event.endDate){
        dia.innerHTML = event.startDate;
        
    }else{
        dia.innerHTML = "Del " + event.startDate + " fins al " + event.endDate;
      
    }
    textHome.appendChild(lloc);
    textHome.appendChild(organitzador);
    textHome.appendChild(dia);
   

    
}

cargarDatos();