/*
NOM DEL FITXER: jsonextern.js
FUNCIONALITAT: obetenir dades del json extern. 
ON TROBAM AQUESTA FUNCINALITAT: event.html
*/


function cargarDatos() {
    var xmlhttp = new XMLHttpRequest();
    //Fitxer a obtenir.
    var url = "https://gastronomiaesp.000webhostapp.com/JSON/gastronomia.json";
    //Realitzam crida.
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //Parsejam el resultat de la crida per poder tractar les dades.
            dades = JSON.parse(xmlhttp.responseText);
            //Passam per paràmetre el contingut del fitxer per poder integrar-ho dins la pràctica.
            dataVisualizar(dades);
            console.log(dades);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function dataVisualizar(dades) {
    let max = dades.gastronomia.length;
    for (let index = 0; index < 6; index++) {
        let numero = generateRandomInt(0, max);
        console.log("https://gastronomiaesp.000webhostapp.com/" + dades.gastronomia[numero].image[0].name.substr(3));

        const nomPlat = document.createElement("h1");
        nomPlat.innerHTML = dades.gastronomia[numero].name;
        nomPlat.id = "nomPlat";
        const imatgePlat = document.createElement("img");
        imatgePlat.src = "https://gastronomiaesp.000webhostapp.com/" + dades.gastronomia[numero].image[0].name.substr(3);
        imatgePlat.id = "fotoPlat";
        imatgePlat.className = "img-fluid";
        const localitzacioPlat = document.createElement("h2");
        localitzacioPlat.id = "localitzacioPlat";
        localitzacioPlat.innerHTML = dades.gastronomia[numero].datosextra.comunidadAutonoma;
        const element = document.createElement("div");
        if (index == 0) {
            element.className = "carousel-item active";
        } else {
            element.className = "carousel-item";
        }
        element.appendChild(nomPlat);
        element.appendChild(localitzacioPlat);
        element.appendChild(imatgePlat);
        caruselPlats.appendChild(element);
    }







}


function generateRandomInt(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

cargarDatos();