function cargarDatos() {

    var xmlhttp = new XMLHttpRequest();
    var url = "assets/js/events.json";

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            dades = JSON.parse(xmlhttp.responseText);
            crateJSONLD(dades);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function crateJSONLD(dades) {

    var esdeveniments = "";

    for (let index = 0; index < dades.length; index++) {
        esdeveniments = dades[index];
        let s = {
            "@context": "https://schema.org",
            "identifier": esdeveniments.identifier,
            "about": esdeveniments.about,
            "startDate": esdeveniments.startDate,
            "endDate": esdeveniments.endDate,
            "location": esdeveniments.location,
            "organizer": esdeveniments.organizer,
            "description": esdeveniments.description,
            "name": esdeveniments.name,
            "latitude": esdeveniments.latitude,
            "longitude": esdeveniments.longitude,
            "primaryImageOfPage": esdeveniments.primaryImageOfPage,
            "datosextra": {
                "socialnetworks": {
                    "hashtag": esdeveniments.datosextra.socialnetworks.hashtag
                },
                "gallery": [esdeveniments.datosextra.gallery[0], esdeveniments.datosextra.gallery[1], esdeveniments.datosextra.gallery[2]],
                "program": esdeveniments.datosextra.program
            }
        };
        document.getElementById("webSemantica").innerHTML +=
        JSON.stringify(s);

    }

}




crateJSONLD();