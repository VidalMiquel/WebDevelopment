/*
NOM DEL FITXER: sis_pròxims_events.js
FUNCIONALITAT: viualitzar per pantalla els pròxims sis events a partir del dia d'avui. És a dir, 
            ordenam el fitxer json pel dia de l'event i a continuació obtenim el dia d'avui. 
            Realitzant una comparació, pintam els sis pròxims events. 
ON TROBAM AQUESTA FUNCINALITAT: esdeveniments.html
*/

/*
Mètode que realitza la crida amb l'objectiu d'obtenir el fitxer JSON especificat a la URL.
*/
function cargarDatos() {
    var xmlhttp = new XMLHttpRequest();
     //Fitxer a obtenir.
    var url = "assets/js/events.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            dades = JSON.parse(xmlhttp.responseText);
            //Ordenam el fitxer segons l'indicat. De manera ascendent segons el valor de 'startDate'.
            //Tenim el fitxer ordenat de manera ascendent per dia inicial d l'event.
            sortJSON(dades, 'startDate', 'asc');
            //Passam per paràmetre el contingut del fitxer per poder integrar-ho dins la pràctica.
            dataVisualizar(dades);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/*
Mètode que prepara les dades per ser visualitzades. En aquest cas,  s'integren els sis primers
events que compleixin la condició dins l'html. 
*/
function dataVisualizar(data) {
    let date = new Date();
    var actualDate = date.toISOString().split('T')[0];
    var i = 0;
    for (let index = 0; index < data.length; index++) {
        //Integram dins l'html només 6 esdeveniments.
        if (i < 6) {
            //Comprovam que l'event encara no ha ocorregut.
            if (data[index].startDate >= actualDate && dades[index].location != "Cabrera") {
                visualitzarEvent(data[index]);
                createJSONLD(data[index]);
                i++;
            }
        } else {
            break;
        }

    }
}


function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
        y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}

function visualitzarEvent(data) {
    const contenidor = document.createElement("div");
    const contenidor2 = document.createElement("div");
    const contenidor3 = document.createElement("div");
    const contenidor4 = document.createElement("div");
    const titol = document.createElement("h2");
    const link2 = document.createElement("a");
    const text = document.createElement("p");
    const lloc = document.createElement("h3");
    const dia = document.createElement("h4");
    if (data.startDate == data.endDate) {
        dia.innerHTML = data.startDate;
    } else {
        dia.innerHTML = "Del " + data.startDate + " fins al " + data.endDate;
    }
    dia.className = "p-2";
    dia.id = "diaEvent";
    contenidor.className = "col-lg-4 pt-3 pb-3 col-md-6 d-flex align-items-stretch ";
    contenidor2.className = "shadow icon-box futur";
    contenidor3.className = "icon";
    logo = document.createElement('img');
    logo.style.height = "60px";
    logo.style.width = "60px";
    if(data.about == "fira"){
        logo.src = "assets/svg/fira.svg"
        logo.alt = "Logotip de l'event de tipus fira";
    }else if (data.about == "verbena") {
        logo.src = "assets/svg/verbena.svg";
        logo.alt = "Logotip de l'event de tipus verbena";
    }else if(data.about == "concert"){
        logo.src = "assets/svg/concert.svg"
        logo.alt = "Logotip de l'event de tipus concert";
    }
    lloc.innerHTML = data.location;
    lloc.id = "llocEvent";
    logo.class = "image.fluid";
    contenidor3.appendChild(logo);
    titol.innerHTML = data.name;
    titol.id = "titolEvent";
    text.innerHTML = data.description;
    link2.href="event.html?eventType=" + data.identifier ;
    link2.className = "btn btn-skin btn--radius-2";
    link2.innerHTML = "Veure esdeveniment";
    contenidor2.appendChild(contenidor3);
    contenidor2.appendChild(titol);
    contenidor2.appendChild(lloc);
    contenidor2.appendChild(dia);
    contenidor2.appendChild(text);
    contenidor2.appendChild(link2);
    contenidor.appendChild(contenidor2);
    eventsProxims.appendChild(contenidor);

}

function createJSONLD(dades) {


    console.log(dades);
    var esdeveniments = "";

    esdeveniments = dades;
    let s = {
        "@context": "https://schema.org",
        "about": esdeveniments.about,
        "startDate": esdeveniments.startDate,
        "endDate": esdeveniments.endDate,
        "location": esdeveniments.location,
        "description": esdeveniments.description,
        "name": esdeveniments.name,
    };
    document.getElementById("webSemantica").innerHTML += JSON.stringify(s);

}
cargarDatos();