/*
NOM DEL FITXER: logos:filtros.js
FUNCIONALITAT: visualitzar els icones referents als filetres a poder aplicar al cercador.
ON TROBAM AQUESTA FUNCINALITAT: cercador.html
*/


function logoVerbena() {
    const logoVerbena = document.createElement('img');
    logoVerbena.src = "assets/svg/verbena.svg"
    logoVerbena.class = "image.fluid";
    svgVerbena.appendChild(logoVerbena);
}
function logoFira() {
    const logoFira = document.createElement('img');
    logoFira.src = "assets/svg/fira.svg"
    logoFira.class = "image.fluid";
    svgFira.appendChild(logoFira);
}

function logoConcert() {
    const logoConcert = document.createElement('img');
    logoConcert.src = "assets/svg/concert.svg"
    logoConcert.class = "image.fluid";
    svgConcert.appendChild(logoConcert);
}

function logoPreferits() {
    const logoPreferits = document.createElement('img');
    logoPreferits.src = "assets/svg/preferit.svg"
    logoPreferits.class = "image.fluid";
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
        
        introduirMarcador(map,dades[index].latitude, dades[index].longitude, dades[index].identifier);
        
    }

    

}

function introduirMarcador(map, lat,long, id){
    var marker = L.marker([lat, long]).addTo(map);

    var popup = L.popup();
    popup.setContent( '<a href="event.html?eventType=' + id + '">Visit Google</a>"')
    marker.bindPopup(popup);
}

introduirLogosFiltres();
cargarDatos();