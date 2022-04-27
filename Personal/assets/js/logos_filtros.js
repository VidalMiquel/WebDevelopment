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

introduirLogosFiltres();