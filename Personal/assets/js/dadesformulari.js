/*
NOM DEL FITXER: dadesformulari.js
FUNCIONALITAT: obté i emmagatzema els valors dels camps del formulari a una base de dades que ens aporta el nostre host.
ON TROBAM AQUESTA FUNCINALITAT: esdeveniments.html
*/

(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyCOePpKpuQI7GfldXEDyEwAcVgp5O-9LvI",
        authDomain: "mallorcaevents.firebaseapp.com",
        projectId: "mallorcaevents",
        storageBucket: "mallorcaevents.appspot.com",
        messagingSenderId: "1084948788246",
        appId: "1:1084948788246:web:fdf3a3f0568795bf2cb137",
        measurementId: "G-TX4QMT5LTQ"
    };

    firebase.initializeApp(firebaseConfig);

    var push_to_firebase = function(data){

        var db = firebase.firestore();

        db.collection("messages").add({
            name: data["name"],
            email: data["email"],
            organizer:data["organizer"],
            startDate: data["startDate"],
            endDate: data["endDate"],
            telefon: data["telefon"],
            type: data["type"],
            program: data["program"],
            description: data["description"],
            timestamp: Date.now()
          
        })
            .then(function(docRef) {
                console.log("Message sent, ID: ", docRef.id);
                location.reload();
            })
            .catch(function(error) {
                console.error("Message could not be sent: ", error);
            });
        alert("Formulari registrat correctament.");
    }

    var contact_submit = function(){
        var name = document.getElementById("name");
        var email = document.getElementById("email");
        var organizer = document.getElementById("organizer");
        var startDate = document.getElementById("startDate");
        var endDate =  document.getElementById("endDate");
        var telefon =  document.getElementById("telefon");
        var type =  document.getElementById("type");
        var program =  document.getElementById("program");
        var description = document.getElementById("description");
        

        var data = {
            "name": name.value,
            "email": email.value,
            "organizer": organizer.value,
            "startDate": startDate.value,
            "endDate": endDate.value,
            "telefon": telefon.value,
            "type": type.value,
            "program": program.value,
            "description" : description.value
        }

        if(validateFormulari(data)){
            push_to_firebase(data);
        }else{
            alert("Formulari no enviat per incorrectesa dels camps");
        }
      

    }

    document.getElementById("submit_msg").addEventListener("click", contact_submit);
})();

function validateFormulari(data){

    if(!data.name){
        console.log("name");
        var program =  document.getElementById("program");
        return false;
    }
    if(emailVerification(data.email)){
        console.log("email");
        var correu = document.getElementById("email");
        correu.value = " ";
        return false;
    }
    if(!data.organizer){
        console.log("organizer");
        var organitzador = document.getElementById("organizer");
        organitzador.value = " ";
        return false;
    }
    if(!data.startDate){
        console.log("startDate");
        var diaInici = document.getElementById("startDate");
        diaInici.value = " ";
        return false;
    }
    if(dateVerification(data.startDate, data.endDate)){
        var diaAcaba =  document.getElementById("endDate");
        diaAcaba.value  = null;
        console.log("endaDate");
        return false;
    }
    if(telefonVerification(data.telefon)){
        console.log("telefon");
        var telefono =  document.getElementById("telefon");
        telefono.value = " ";
        return false;
    }
    if(!data.type){
        console.log("type");
        return false;
    }
    if(!data.program){
        console.log("program");
        return false;
    }
    if(!data.description){
        console.log("descripton");
        return false;
    }
    
    return true;
}


function emailVerification(email){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return ! email.match(validRegex);
}

function telefonVerification(telefon){
    var validRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{3})$/;
    return !telefon.match(validRegex);
}

function dateVerification(startDate, endDate){  
    return !(endDate && (startDate < endDate));
}