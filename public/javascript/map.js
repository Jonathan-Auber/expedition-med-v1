// Création des icônes pour la carte
var LeafIcon = L.Icon.extend({
    options: {
        iconSize: [38, 50],
        // shadowSize: [50, 64],
        // iconAnchor: [22, 94],
        // shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
    }
});

var blackIcon = new LeafIcon({ iconUrl: 'assets/icons/black.png' }),
    maroonIcon = new LeafIcon({ iconUrl: 'assets/icons/maroon.png' }),
    redIcon = new LeafIcon({ iconUrl: 'assets/icons/red.png' }),
    orangeIcon = new LeafIcon({ iconUrl: 'assets/icons/orange.png' }),
    yellowIcon = new LeafIcon({ iconUrl: 'assets/icons/yellow.png' });

// Conversion de la position en décimal
function convertDMSToDecimal(degrees, minutes, seconds, direction) {
    // Calcul du degré décimal
    let decimalDegrees = degrees + (minutes / 60) + (seconds / 3600);

    // Vérification de la direction (N, S, E, W)
    if (direction === 'S' || direction === 'W') {
        decimalDegrees = -decimalDegrees;
    }

    return decimalDegrees;
}

// Récupération des données de prélèvement
fetch("users/data", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
}).then(function (response) {
    return response.json();
}).then(function (response) {
    response.forEach(element => {
        let latitude = element['Start_Latitude'];
        latitude = latitude.split(/[^\d\w]+/);
        console.log(latitude);
        let latitudeDecimal = convertDMSToDecimal(parseInt(latitude[0]), parseInt(latitude[1]), parseInt(latitude[2]), parseInt(latitude[3])).toFixed(2);
        let longitude = element['Start_Longitude'];
        longitude = longitude.split(/[^\d\w]+/);
        console.log(longitude);
        let longitudeDecimal = convertDMSToDecimal(parseInt(longitude[0]), parseInt(longitude[1]), parseInt(longitude[2]), parseInt(longitude[3])).toFixed(2);
        // var marker = L.marker([latitudeDecimal, longitudeDecimal]);
        var marker = L.marker([latitudeDecimal, longitudeDecimal], {icon: blackIcon});
        marker.addTo(map);
        marker.bindPopup(`
        <b>Echantillon : <a href="#">${element['Sample']}</a></b>
        <p>Mer : ${element['Sea']}</p>
        <p>Date : ${element['Date']}</p>
        `);
    });
});


const mediterranean = {
    lat: 40,
    lng: 20
}

const zoomLevel = 5;

var map = L.map('map').setView([mediterranean.lat, mediterranean.lng], zoomLevel);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

