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
        alert("missatge ep.");
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
        push_to_firebase(data);

    }

    document.getElementById("submit_msg").addEventListener("click", contact_submit);
})();