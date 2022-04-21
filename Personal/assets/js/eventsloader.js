/*
function cargarDatos(){
    
    var xmlhttp = new XMLHttpRequest();
    var url = "events.json";

    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            dades = JSON.parse(xmlhttp.responseText);
            console.log(dades.event[1].location);
            crearTitol(dades.event[1].location);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
*/

function introduirXarxes() {

    //Cream l'icone de twitter
    const twitter = document.createElement('li');
    const logoTwitter = document.createElement('a');
    const svgTwitter = document.createElement('img');
    twitter.style.height = "50px";
    twitter.style.width = "50px";
    logoTwitter.href = "https://twitter.com/home";
    logoTwitter.target = "_blank";
    logoTwitter.className = "nav-link";
    svgTwitter.src = "assets/svg/twitter.svg";
    svgTwitter.className = "image-fluid";
    logoTwitter.appendChild(svgTwitter);
    twitter.appendChild(logoTwitter);
    xarxes.appendChild(twitter);

    //Cream l'icone d'instagram
    const instagram = document.createElement('li');
    const logoInstagram = document.createElement('a');
    const svgInstagram = document.createElement('img');
    instagram.style.height = "50px";
    instagram.style.width = "50px";
    logoInstagram.href = "https://www.instagram.com/";
    logoInstagram.target = "_blank";
    logoInstagram.className = "nav-link";
    svgInstagram.src = "assets/svg/instagram.svg";
    svgInstagram.className = "image-fluid";
    logoInstagram.appendChild(svgInstagram);
    instagram.appendChild(logoInstagram);
    xarxes.appendChild(instagram);

    //Cream l'icone de linkedin
    const linkedin = document.createElement('li');
    const logoLinkedin = document.createElement('a');
    const svgLinkedin = document.createElement('img');
    linkedin.style.height = "50px";
    linkedin.style.width = "50px";
    logoLinkedin.href = "https://es.linkedin.com/";
    logoLinkedin.target = "_blank";
    logoLinkedin.className = "nav-link";
    svgLinkedin.src = "assets/svg/linkedin.svg";
    svgLinkedin.className = "image-fluid";
    logoLinkedin.appendChild(svgLinkedin);
    linkedin.appendChild(logoLinkedin);
    xarxes.appendChild(linkedin);

}

function introduirLogo() {
    //Cream l'icone d'instagram
    const logoPaginaWeb = document.createElement('a');
    const svgLogo = document.createElement('img');
    logoPaginaWeb.href = "index.html";
    svgLogo.src = "assets/svg/logo.svg";
    svgLogo.className = "image-fluid";
    logoPaginaWeb.appendChild(svgLogo);
    logo.appendChild(logoPaginaWeb);

}



function logoVerbena(){
    const logoVerbena = document.createElement('img');
    logoVerbena.src = "assets/svg/verbena.svg"
    logoVerbena.class = "image.fluid";
    svgVerbena.appendChild(logoVerbena);
}
function logoFira(){
    const logoFira = document.createElement('img');
    logoFira.src = "assets/svg/fira.svg"
    logoFira.class = "image.fluid";
    svgFira.appendChild(logoFira);
}

function logoConcert(){
    const logoConcert = document.createElement('img');
    logoConcert.src = "assets/svg/concert.svg"
    logoConcert.class = "image.fluid";
    svgConcert.appendChild(logoConcert);
}

function logoEvents(){
    const logoEvents = document.createElement('img');
    logoEvents.src = "assets/svg/event.svg"
    logoEvents.class = "image.fluid";
    svgEvents.appendChild(logoEvents);
}

function logoPreferits(){
    const logoPreferits = document.createElement('img');
    logoPreferits.src = "assets/svg/preferit.svg"
    logoPreferits.class = "image.fluid";
    svgPreferits.appendChild(logoPreferits);
}

function introduirLogosFiltres(){
    logoVerbena();
    logoFira();
    logoConcert();
    logoEvents();
    logoPreferits();
}



introduirLogo();
introduirXarxes();
introduirLogosFiltres();




