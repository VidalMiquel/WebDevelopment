/*
NOM DEL FITXER: events_per_tipus.js
FUNCIONALITAT: segons el tipus d'event a voler a visualitzar, es filtre el fitxer json i 
            es visualitza per pantalla. Per això, obtenir el tipus d'event, segons aquest
            tipus, es filtre el json, i finalment, visualitzam els events determinats.
ON TROBAM AQUESTA FUNCINALITAT:events_per_tipus.html
*/

/*
Mètode que obté el valor del paràmetre passat per paràmetre. 
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
Mètode que filtre les dades del JSON amb l'objectiu de descompondre el contingut per fer-lo arribar a les funcions. 
*/
function dataVisualizar(data) {
    //Obtenim l'event a visualitzar les seves dades.
    var data_filter = data.filter(element => element.identifier == type)
    //JSON ha estat filtrat.
    visualitzarEvent(data_filter[0]);
}

/* 
Per a cada un dels apectes a inegrar, ho descomposam amb l'objectiu de facilitar la comprensió.
*/
function visualitzarEvent(info) {

    //Títol de l'esdeveniment.
    crearTitol(info.name);
    //El temps de l'esdeveniment.
    APItiempo(info.latitude, info.longitude);
    //Localització de l'esdevenimet damunt un mapa.
    introduirMapa(info.latitude, info.longitude);
    //Fotografia principal de l'esdeveniment.
    introduirVideoPrincipal(info.datosextra.video, info.datosextra.careta);
    //Informació genèrique de l'esdeveniment.
    introduirInformacioEvent(info);
    //Boto per descarregar o visualitzar programa.
    crearBotoPrograma(info.datosextra.program);
    //Boto per afegir l'esdeveniment a preferits.
    botoPreferits(info.identifier);
    //Icones de lainformació rellevent (APIs).
    introduirIconesInformacio();
    //Galeria de imatges.
    galeria(info.datosextra.gallery);
}

/*
Mètode que integra el títol (nom) de l'esdeveniment dins l'html.
*/
function crearTitol(nom) {
    const titol = document.createElement("h1");
    titol.innerHTML = nom;
    titolEvent.appendChild(titol);
}

/*
Mètode que integra el botó de preferits dins l'html. Amb l'objectiu de nombrar correctament el boto 
(Afegir preferits o Eliminar preferits), realitzam una comprovació prèvia.
*/
function botoPreferits(id) {

    const boto = document.getElementById("botoPreferit");
    boto.setAttribute("value", id);
    //Comprovam si l'esdeveniment es troba entre els preferits de l'usuari o no.
    var eventsEmmagazemats = JSON.parse(localStorage.getItem('dades')) || [];
    if (eventsEmmagazemats.indexOf(id) == -1) {
        boto.innerHTML = "Afegir Preferits";

    } else {
        boto.innerHTML = "Eliminar Preferits";
    }
}

/*
Mètode que integra els dos botons relacionats amb el programa de l'event. Per la seva descàrrega o per la seva visualització.
*/
function crearBotoPrograma(programa) {
    //Botó que descarrega el programa de l'event.
    const linkDescarrega = document.createElement("a");
    linkDescarrega.href = programa;
    linkDescarrega.download = programa;
    linkDescarrega.className = "btn btn-skin btn--radius-2";
    linkDescarrega.innerHTML = "Descarrega programa";
    botoPrograma.appendChild(linkDescarrega);
    //Botó que visualitza l'event.
    const linkVisualitza = document.createElement("a");
    linkVisualitza.href = programa;
    linkVisualitza.target = "_blank";
    linkVisualitza.className = "btn btn-skin btn--radius-2";
    linkVisualitza.innerHTML = "Veure programa";
    botoPrograma.appendChild(linkVisualitza);
}


/*
Mètode que realitza la crida a la API de OpenWheaterMap. Necessitam la latitut i la longitud de l'event.
*/
function APItiempo(lat, lon) {
    var apiid = "17eaa46a6e0645c810da44bce335de2a";
    var xmlhttp = new XMLHttpRequest();
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + apiid;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            dades = JSON.parse(xmlhttp.responseText);
            //Mètode que filtra les dades obtingudes i les integra dins l'html.
            montarInfoTiempo(dades);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/*
Mètode que filtra les dades meteorològuiques obtingudes i les integra dins l'html.
*/
function montarInfoTiempo(dades) {

    //Dades a visualitzar.
    //Temperatura actual.
    var tmp_actual = Math.round(dades.main.temp - 273.15);
    //Temperatura mínim del dia.
    var tmp_min = Math.round(dades.main.temp_min - 273.15);
    //Temperatura màxima del dia.
    var tmp_max = Math.round(dades.main.temp_max - 273.15);
    //DEscripció del temps actual.
    var description = dades.weather[0].main;
    //Icone representatiu del temps actual.
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
    iconeTemperatura.style.height = "100px";
    iconeTemperatura.style.width = "100px";
    iconeTemperatura.className = "img-fluid";
    iconeTemperatura.alt = "Logotip informatiu del temps actual";
    temperaturaActualTitol.innerHTML = "Temperatura actual";
    temperaturaActual.innerHTML = tmp_actual + "ºC";
    temperaturaActual.style.margin = "0";
    temperaturaMaxTitol.innerHTML = "Temperatura màxima";
    temperaturaDiaMax.innerHTML = tmp_max + "ºC";
    temperaturaMinTitol.innerHTML = "Temperatura mínima";
    temperaturaDiaMin.innerHTML = tmp_min + "ºC";
    tiempo.appendChild(temperaturaActualTitol);
    tiempo.appendChild(temperaturaActual);
    tiempo.appendChild(iconeTemperatura);
    contenidor.className = "text-center";
    contenidor.appendChild(temperaturaMaxTitol);
    contenidor.appendChild(temperaturaDiaMax);
    contenidor.appendChild(temperaturaMinTitol);
    contenidor.appendChild(temperaturaDiaMin);
    tiempo.appendChild(contenidor);
}

/**
Mètode que obtè el mapa especificat gràcies a API Leaflet.
 */
function introduirMapa(lat, long) {

    //Obtenim mapa.
    var map = L.map('map').setView([lat, long], 14);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidmlkYWxlZXQiLCJhIjoiY2wybm54amo2MjIxbTNpcDltZnl5bXNwMyJ9.UIILxO61B7Jn2dICDsyUtA'
    }).addTo(map);

    //Instancima un marcador.
    var marker = L.marker([lat, long]).addTo(map);

    //Botó que té com a objecectiu centrar al mapa a la posició inicial.
    var centrar = document.getElementById("botoCentrar");
    centrar.addEventListener("click", function () {
        map.setView([lat, long], 14);
    });

}

/*
Mètode que integra els icones svg de les APIs inetgrades.
*/
function introduirIconesInformacio() {
    //Xarxes socials.
    const logoMenjar = document.createElement('img');
    logoMenjar.src = "assets/svg/menjar.svg"
    logoMenjar.class = "image.fluid";
    logoMenjar.style.height = "30px";
    logoMenjar.style.width = "30px";
    logoMenjar.alt = "Logotip informatiu de twitter";
    xsocials.appendChild(logoMenjar);
    //Localització.
    const logoLloc = document.createElement('img');
    logoLloc.src = "assets/svg/lloc.svg";
    logoLloc.class = "image.fluid";
    logoLloc.style.height = "30px";
    logoLloc.style.width = "30px";
    logoLloc.alt = "Logotip informatiu de localització";
    lloc.appendChild(logoLloc);
    //Temps.
    const logoTemps = document.createElement('img');
    logoTemps.src = "assets/svg/temps.svg"
    logoTemps.class = "image.fluid";
    logoTemps.style.height = "30px";
    logoTemps.style.width = "30px";
    logoTemps.alt = "Logotip informatiu del temps";
    weather.appendChild(logoTemps);
}

/*
Mètode que integra la fotogrfia principal.
*/
function introduirVideoPrincipal(videos, careta) {

    const video = document.createElement("video");
    if (video.canPlayType) {
        if (video.canPlayType("video/mp4")) {
            video.src = videos[0];
        }else if (video.canPlayType("video/webm")){
            video.src = videos[1];
        }
        //video.poster = careta;
        video.className = "img-fluid";
        video.autoplay = false;
        video.muted = true;
        video.loop = true;
        video.controls = true;
        video.id = "videoEvent";
        video.play();
        imatgeEvent.appendChild(video);
    }else{
        const error = document.createElement("div");
        error.innerHTML = "No ha estat possible carregar el video."
        imatgeEvent.appendChild(error);
    }



}

/*
Mètode que integra les dades genèriques de l'esdeveniment dins l'html.
*/
function introduirInformacioEvent(event) {
    //Lloc de l'event
    const lloc = document.createElement("h1");
    lloc.innerHTML = event.location;
    lloc.id = "idEvent";
    //Organitzador de l'event
    const organitzador = document.createElement("h2");
    organitzador.innerHTML = event.organizer;
    organitzador.id = "organitzadorEvent";
    //Dia de l'event
    const dia = document.createElement("h3");
    if (event.startDate == event.endDate) {
        dia.innerHTML = event.startDate;
    } else {
        dia.innerHTML = "Del " + event.startDate + " fins al " + event.endDate;
    }
    //Descripció de l'event.
    const descripcio = document.createElement("p");
    descripcio.innerHTML = event.description;
    descripcio.className = "pt-2";
    textHome.appendChild(lloc);
    textHome.appendChild(organitzador);
    textHome.appendChild(dia);
    textHome.appendChild(descripcio);
}

/*
Mètode que gestiona l'afegir o eliminar un esdeveniment dels preferits. Ús de WebStorage. Sebre si l'element està inclós o no, es fa 
comprovant el nom del botó. El funcionament és el següent: emmagatzemam una array contingut de la qual són els ids dels events.
*/
function afegirPreferits(objecte) {
    if (objecte.innerHTML == "Afegir Preferits") {
        //Llegim el localStorage.
        var eventsEmmagazemats = JSON.parse(localStorage.getItem('dades')) || [];
        //Si l'event no està emmagatzemat dins l'array, l'afegim.
        if (eventsEmmagazemats.indexOf(objecte.value) == -1) {
            eventsEmmagazemats.push(objecte.value);
            localStorage.setItem('dades', JSON.stringify(eventsEmmagazemats));
        }
        //Actualitzam el text associat al botó.
        objecte.innerHTML = "Eliminar Preferits";
    } else if (objecte.innerHTML == "Eliminar Preferits") {
        //Llegim el localStorage.
        var eventsEmmagazemats = JSON.parse(localStorage.getItem('dades'));
        console.log(eventsEmmagazemats);
        console.log(objecte.value);
        //Eliminar l'ide associat a l'event.
        eventsEmmagazemats = eventsEmmagazemats.filter(item => item !== objecte.value);
        //let amen = eventsEmmagazemats.pop(objecte.value);
        console.log(eventsEmmagazemats);
        //Actualitzam el localStorage.
        if (eventsEmmagazemats.length) {
            localStorage.setItem('dades', JSON.stringify(eventsEmmagazemats));
        } else {
            localStorage.clear();
        }
        //Actualitzam el text associat al botó.
        objecte.innerHTML = "Afegir Preferits";
    }
}

function galeria(galleria) {

    for (let index = 0; index < galleria.length; index++) {
        const element = document.createElement("div");
        if (index == 0) {
            element.className = "carousel-item active";
        } else {
            element.className = "carousel-item";
        }
        const imatge = document.createElement("img");
        imatge.src = galleria[index];
        imatge.alt = "imatge carusel";
        imatge.id = "imatgecarusel";
        imatge.className = "img-fluid";
        element.appendChild(imatge);
        carusel.appendChild(element);
    }
}


cargarDatos();