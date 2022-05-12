/*
NOM DEL FITXER: generalitats.js
FUNCIONALITAT: visualitzar el contingut dinàmic del header (icone de la pw) i del footer (icones de les xarxes socials)
ON TROBAM AQUESTA FUNCINALITAT: index.html. quiSom.html, esdeveniments.html, cercador.html, events_per_tipus.html i events.html
*/



function introduirXarxes() {

    //Cream l'icone de twitter
    const twitter = document.createElement('li');
    const logoTwitter = document.createElement('a');
    const svgTwitter = document.createElement('img');
    svgTwitter.style.height = "25px";
    svgTwitter.style.width = "25px";
    logoTwitter.href = "https://twitter.com/home";
    logoTwitter.target = "_blank";
    logoTwitter.className = "nav-link";
    svgTwitter.src = "assets/svg/twitter.svg";
    svgTwitter.alt = "Logotip de Twitter";
    svgTwitter.className = "image-fluid";
    logoTwitter.appendChild(svgTwitter);
    twitter.appendChild(logoTwitter);
    xarxes.appendChild(twitter);

    //Cream l'icone d'instagram
    const instagram = document.createElement('li');
    const logoInstagram = document.createElement('a');
    const svgInstagram = document.createElement('img');
    svgInstagram.style.height = "25px";
    svgInstagram.style.width = "25px";
    logoInstagram.href = "https://www.instagram.com/";
    logoInstagram.target = "_blank";
    logoInstagram.className = "nav-link";
    svgInstagram.src = "assets/svg/instagram.svg";
    svgInstagram.alt = "Logotip de Instagram";
    svgInstagram.className = "image-fluid";
    logoInstagram.appendChild(svgInstagram);
    instagram.appendChild(logoInstagram);
    xarxes.appendChild(instagram);

    //Cream l'icone de linkedin
    const linkedin = document.createElement('li');
    const logoLinkedin = document.createElement('a');
    const svgLinkedin = document.createElement('img');
    svgLinkedin.style.height = "25px";
    svgLinkedin.style.width = "25px";
    logoLinkedin.href = "https://es.linkedin.com/";
    logoLinkedin.target = "_blank";
    logoLinkedin.className = "nav-link";
    svgLinkedin.src = "assets/svg/linkedin.svg";
    svgLinkedin.alt = "Logotip de Linkedin";
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
    svgLogo.style.height = "60px";
    svgLogo.style.width = "180px";
    svgLogo.alt = "Logotip de la pàgina web";
    logoPaginaWeb.appendChild(svgLogo);
    logo.appendChild(logoPaginaWeb);

}


introduirLogo();
introduirXarxes();






