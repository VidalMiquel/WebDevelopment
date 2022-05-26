function cargarDatos() {
    var xmlhttp = new XMLHttpRequest();
     //Fitxer a obtenir.
    var url = "assets/js/events.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            dades = JSON.parse(xmlhttp.responseText);
            //Passam per paràmetre el contingut del fitxer per poder integrar-ho dins la pràctica.
            generatePieChart(dades);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}



function setHighchartsOptions() {
    // Radialize the colors
    Highcharts.setOptions({
        colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7,
                },
                stops: [
                    [0, color],
                    [1, Highcharts.color(color).brighten(-0.3).get("rgb")], // darken
                ],
            };
        }),
    });
}


function generatePieChart(dades) {
    let events = 0;
    let jsonArray = [];
    let verbena = 0;
    let fira = 0;
    let concert = 0;

    for (let index = 0; index < dades.length; index++) {
        events++;
        if(dades[index].about == "fira"){
            fira++;
        }else if(dades[index].about == "verbena"){
            verbena++;
        }else if(dades[index].about == "concert"){
            concert++;
        }
    }
    jsonArray.push({ name: "Concerts", y: (concert / events) * 100 });
    jsonArray.push({ name: "Verbenes", y: (verbena / events) * 100 });
    jsonArray.push({ name: "Fires", y: (fira / events) * 100 });


    // Build the chart
    Highcharts.chart("pieChartContainer", {
        chart: {
            plotBackgroundColor: null,
            backgroundColor: 'rgba(0, 0, 0, 0.658)',
            borderColor: 'transparent',
            plotBorderWidth: null,
            type: "pie",
        },
        title: {
            text: "QUANTITAT D'EVENTS SEGONS EL TIPUS",
            style: {
                color: '#FFFF',
            }
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                    connectorColor: "white",
                    color: "white"
                },
            },
        },
        series: [
            {
                name: "Percentatge",
                data: jsonArray,
            },
        ],
    });
}

cargarDatos();