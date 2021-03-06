var mymap = L.map('map');

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmFpc3Rob3JwZSIsImEiOiJja28yMzZxa2EwMnVsMnJscmxvNTlyMTQ1In0.t3dJxPf2xoYJ8r_f7YmVHA`, {
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

    window.current_position = e.latlng;

    current_accuracy = L.circle(e.latlng, radius).addTo(mymap);
}

function onLocationError(e) {
    alert(e.message);
}

mymap.on('locationfound', onLocationFound);
mymap.on('locationerror', onLocationError);

// wrap map.locate in a function   
// Realtime Tracking Source: https://stackoverflow.com/questions/52603456/realtime-tracking-using-leaflet 
function locate() {
    mymap.locate({ setView: true, maxZoom: 16, watch: true, timeout: 600000, maximumAge: 0});
}

locate();

mymap.on('click', function (e) {
    var coord = e.latlng;
    var lat = coord.lat;
    var lng = coord.lng;
    console.log(e.latlng);
    console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
});


// Green leaf marker icon
var greenIcon = L.icon({
    iconUrl: '../images/leaf-green.png',
    shadowUrl: '../images/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// Yellow leaf marker icon
var yellowIcon = L.icon({
    iconUrl: '../images/leaf-yellow.png',
    shadowUrl: '../images/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// Red leaf marker icon
var redIcon = L.icon({
    iconUrl: '../images/leaf-red.png',
    shadowUrl: '../images/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// This creates markers from the database information
function createMarker(lat, long, text) {
    L.marker([lat, long], {icon: redIcon}).addTo(mymap).bindPopup(text);
};

// This loops over the geocache data from the database and 
// sets up the data for making a location marker and 
// creating text for the marker's popup
for (let i=0; i< window.stringGeocaches.length; i++) {
    let geocache = window.stringGeocaches[i];
    let latitude = geocache.latitude;
    let longitude = geocache.longitude;
    let text = `<h3 class="location-title">${geocache.title}</h3><br><p class="location-desc p-0">${geocache.description}</p><br><p class='location-hint p-0'>Hint: ${geocache.hint}</p>`
    // console.log(`${latitude} & ${longitude}`);
    createMarker(latitude, longitude, text);
}

