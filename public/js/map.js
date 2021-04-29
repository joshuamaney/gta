var mymap = L.map('map');

// .setView([51.505, -0.09], 13)

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmFpc3Rob3JwZSIsImEiOiJja28yMzZxa2EwMnVsMnJscmxvNTlyMTQ1In0.t3dJxPf2xoYJ8r_f7YmVHA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

// Source: https://gis.stackexchange.com/questions/182068/getting-current-user-location-automatically-every-x-seconds-to-put-on-leaflet

// placeholders for the L.marker and L.circle representing user's current position and accuracy    
var current_position, current_accuracy;

function onLocationFound(e) {
    // if position defined, then remove the existing position marker and accuracy circle from the map
    if (current_position) {
        mymap.removeLayer(current_position);
        mymap.removeLayer(current_accuracy);
    }

    var radius = e.accuracy / 2;

    current_position = L.marker(e.latlng).addTo(mymap)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    current_accuracy = L.circle(e.latlng, radius).addTo(mymap);
}

function onLocationError(e) {
    alert(e.message);
}

mymap.on('locationfound', onLocationFound);
mymap.on('locationerror', onLocationError);

// wrap map.locate in a function    
function locate() {
    mymap.locate({ setView: true, maxZoom: 16 });
}

// call locate every 3 seconds... forever
setInterval(locate, 3000);