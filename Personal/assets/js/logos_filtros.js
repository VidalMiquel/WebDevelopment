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
    logoConcert.src = "assets/svg/event.svg"
    logoConcert.class = "image.fluid";
    svgConcert.appendChild(logoConcert);
}
/*assets/svg/concert.svg*/

function logoEvents() {
    const logoEvents = document.createElement('img');
    logoEvents.src = "assets/svg/event.svg"
    logoEvents.class = "image.fluid";
    svgEvents.appendChild(logoEvents);
}

function logoPreferits() {
    const logoPreferits = document.createElement('img');
    logoPreferits.src = "assets/svg/event.svg"
    logoPreferits.class = "image.fluid";
    svgPreferits.appendChild(logoPreferits);
}
/*assets/svg/preferit.svg */
function introduirLogosFiltres() {
    logoVerbena();
    logoFira();
    logoConcert();
    logoEvents();
    logoPreferits();
}

introduirLogosFiltres();