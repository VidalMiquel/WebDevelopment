function carregarHome() {

    cargarVideo();

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


carregarHome();