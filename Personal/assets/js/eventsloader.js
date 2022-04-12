// Add your javascript here
console.log("lol");
$.getJSON("http://mallorcaevents.web.app/events.json", function(data){
    //$('#demo').text(out);
    var out = " ";
    for(var i = 0; i < data.event.length; i++) {
        out += ' <div class="col-lg-4 col-md-6 d-flex align-items-stretch">\n' +
            '    <div class="shadow icon-box">\n' +
            '        <div class="icon"><i class="bi bi-geo"></i></div>\n' +
            '           <h4><a href="">' + data.event[i].name +
            '           </a></h4>\n ' +
            '<p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>\n' +
            '        <a href="#" class="btn btn-skin btn--radius-2">Learn more</a>\n' +
            '    </div>\n' +
            '</div>\n';
    }
    out += " ";
    console.log(out);
    $('#events').html(out);
});