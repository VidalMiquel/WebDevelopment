/*
NOM DEL FITXER: jsonextern.js
FUNCIONALITAT: obetenir dades del json extern. 
ON TROBAM AQUESTA FUNCINALITAT: event.html
*/
let datos_json = [];

window.onload = async function () {

    await cargarDatos(); //Carrega les dades de la pagina web
    dataVisualizar(datos_json);

};

async function cargarDatos() {

    let respuesta = await fetch("https://gastronomiaesp.000webhostapp.com/JSON/gastronomia.json");
    let datos = await respuesta.json();
    datos_json = datos;

}


//Visualitzar plat del json extern.
function dataVisualizar(dades) {
    
    for (let index = 0; index < 6; index++) {

        const numero = generateRandomInt(0, 80);
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
