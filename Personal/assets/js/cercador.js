/*
NOM DEL FITXER: logos:filtros.js
FUNCIONALITAT: visualitzar els icones referents als filetres a poder aplicar al cercador.
ON TROBAM AQUESTA FUNCINALITAT: cercador.html
*/


function logoVerbena() {
    const logoVerbena = document.createElement('img');
    logoVerbena.src = "assets/svg/verbena.svg";
    logoVerbena.alt = "Logotip event verbena";
    logoVerbena.class = "image.fluid";
    logoVerbena.style.height = "60px";
    logoVerbena.style.width = "60px";
    svgVerbena.appendChild(logoVerbena);
}
function logoFira() {
    const logoFira = document.createElement('img');
    logoFira.src = "assets/svg/fira.svg";
    logoFira.alt = "Logotip event fira";
    logoFira.class = "image.fluid";
    logoFira.style.height = "60px";
    logoFira.style.width = "60px";
    svgFira.appendChild(logoFira);
}

function logoConcert() {
    const logoConcert = document.createElement('img');
    logoConcert.src = "assets/svg/concert.svg";
    logoConcert.alt = "Logotip event concert";
    logoConcert.class = "image.fluid";
    logoConcert.style.height = "60px";
    logoConcert.style.width = "60px";
    svgConcert.appendChild(logoConcert);
}

function logoPreferits() {
    const logoPreferits = document.createElement('img');
    logoPreferits.src = "assets/svg/preferit.svg";
    logoPreferits.alt = "Logotip event preferits";
    logoPreferits.class = "image.fluid";
    logoPreferits.style.height = "60px";
    logoPreferits.style.width = "60px";
    svgPreferits.appendChild(logoPreferits);
}

function introduirLogosFiltres() {
    logoVerbena();
    logoFira();
    logoConcert();
    logoPreferits();
}

function cargarDatos() {

    var xmlhttp = new XMLHttpRequest();
    var url = "assets/js/events.json";

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            dades = JSON.parse(xmlhttp.responseText);
            introduirMapa(dades);
           
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function introduirMapa(dades) {

    var map = L.map('map2').setView([39.61799455956194,2.9738029562237323 ], 9);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 24,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidmlkYWxlZXQiLCJhIjoiY2wybm54amo2MjIxbTNpcDltZnl5bXNwMyJ9.UIILxO61B7Jn2dICDsyUtA'
    }).addTo(map);

    for (let index = 0; index < dades.length; index++) {
        let date = new Date();
        var actualDate = date.toISOString().split('T')[0];
        if(dades[index].endDate >= actualDate && dades[index].location != "Cabrera"){
            introduirMarcador(map,dades[index]);
        }   
    }


    var home = document.getElementById("botoCentrar");
    home.addEventListener("click", function () {
        map.setView([39.61799455956194, 2.9738029562237323 ], 9);
    });
}

function introduirMarcador(map, event){

    var myIcon = L.icon({
        iconUrl: icone(event.about),
        iconSize: [20, 20]
    });

    var marker = L.marker([event.latitude, event.longitude], {icon: myIcon}).addTo(map);

    var popup = L.popup();
    popup.setContent( '<a style = " text-decoration: none;" href="event.html?eventType=' + event.identifier + '">'+ event.name +'</a>')
    marker.bindPopup(popup);

}

function icone(tipus){
    if(tipus == "fira"){
        return "assets/svg/llocVerd.svg";
    }else if (tipus == "verbena" ){
        return "assets/svg/llocBlau.svg";
    }else{
        return "assets/svg/llocVermell.svg";
    }
}

function afegirLlegenda(){

    const llista = document.createElement("ul");
    llista.id = "llegenda";
    llista.className = "text-center justify-content-center";

    const elementVerbena = document.createElement("li");
    elementVerbena.className = "text-center";
    elementVerbena.id = "elementllegenda1";
    elementVerbena.style.paddingRight = "30px";


    const elementFira = document.createElement("li");
    elementFira.id = "elementllegenda2";
    elementFira.className = "text-center";
    elementFira.style.paddingRight = "20px";
    elementFira.style.paddingLeft = "20px";

    const elementConcert = document.createElement("li");
    elementConcert.id = "elementllegenda3";
    elementConcert.className = "text-center";
   
    const titolVerbena = document.createElement("h3");
    const iconeVerbena = document.createElement("img");
    titolVerbena.innerHTML = "Verbena";
    iconeVerbena.src = "assets/svg/llocBlau.svg";
    iconeVerbena.alt = "Marcador event verbena";
    iconeVerbena.style.height = "50px";
    iconeVerbena.style.width = "50px";
    iconeVerbena.className = "img-fluid";

    const titolFira = document.createElement("h3");
    const iconeFira = document.createElement("img");
    titolFira.innerHTML = "Fira";
    iconeFira.src = "assets/svg/llocVerd.svg";
    iconeFira.alt = "Marcador event fira";
    iconeVerbena.style.height = "50px";
    iconeFira.style.width = "50px";
    iconeFira.className = "img-fluid";

    const titolConcert = document.createElement("h3");
    const iconeConcert = document.createElement("img");
    titolConcert.innerHTML = "Concert";
    iconeConcert.src = "assets/svg/llocVermell.svg";
    iconeConcert.alt = "Marcador event concert";
    iconeConcert.style.height = "50px";
    iconeConcert.style.width = "50px";
    iconeConcert.className = "img-fluid";
    

    elementVerbena.appendChild(titolVerbena);
    elementVerbena.appendChild(iconeVerbena);
    elementFira.appendChild(titolFira);
    elementFira.appendChild(iconeFira);
    elementConcert.appendChild(titolConcert);
    elementConcert.appendChild(iconeConcert);
  
    llista.appendChild(elementConcert);
    llista.appendChild(elementFira);
    llista.appendChild(elementVerbena);
 

    llegendaMapaCercador.appendChild(llista);

}

introduirLogosFiltres();
cargarDatos();
afegirLlegenda();