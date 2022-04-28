function carregarHome() {

    cargarVideo();
    cargarFoto();


}

function cargarVideo() {
    const video = document.createElement("video");
    if (video.canPlayType) {
        if (video.canPlayType("video/mp4")) {
            video.src = "assets/video/prova.mp4";
        }
    }

    video.className = "img-fluid";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.muted = true;
    video.id = "videoHome";
    video.play();

    videoHome.appendChild(video);
}

function cargarFoto() {


    const fotografia = document.createElement("img");
    fotografia.src = "assets/img/meva.png";
    fotografia.className = "img-fluid";
    fotografia.height = "300";
    fotografia.width = "300";

    fotoHome.appendChild(fotografia);


}


carregarHome();