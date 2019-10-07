//Affichage des  places disponibles en temps reel

// plugin cordova envoie position utilisateur au serveur
https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/

// Requeter notre api java
var jsonData = {
    "data": [
        {
            "dp_parc_id": 5,
            "dp_libelle": "VIEUX PORT OUEST",
            "dp_date": "27-09-2019 11:31:22",
            "dp_nb_places": 375,
            "dp_y": 6570179.209243104,
            "dp_x": 379378.69605346315,
            "dp_id": 11698044,
            "dp_place_disponible": 289
        },
        {
            "dp_parc_id": 4,
            "dp_libelle": "ENCAN",
            "dp_date": "27-09-2019 11:31:24",
            "dp_nb_places": 399,
            "dp_y": 6569682.940808346,
            "dp_x": 379864.062986826,
            "dp_id": 11698045,
            "dp_place_disponible": 229
        },
        {
            "dp_parc_id": 17,
            "dp_libelle": "VIEUX PORT SUD",
            "dp_date": "27-09-2019 11:31:25",
            "dp_nb_places": 471,
            "dp_y": 6570032.623815341,
            "dp_x": 379925.9973126798,
            "dp_id": 11698046,
            "dp_place_disponible": 309
        }]
}


//Convertir les coordonnées de LAMBERT 93 vers WGS84 !!
//https://github.com/proj4js/proj4js
// Stocker les valeurs dans un tableau


function coordinatesConverter(jsonData) {
    var coordinates = [];
    
    var firstProjection = "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
    var secondProjection = "+proj=longlat +datum=WGS84 +no_defs";



    for (i = 0; i < jsonData.data.length; i++) {

        coordinates.push(proj4(firstProjection, secondProjection, [jsonData.data[i].dp_x, jsonData.data[i].dp_y]));
    }
    return coordinates
}

var coordinates = coordinatesConverter(jsonData);


// afficher sur la map

var map = L.map('map').setView([46.155468, -1.156428], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

for (let i = 0; i < coordinates.length; i++) {
  // TODO afficher nombre de places restantes et le libelle 
  // TODO le user selectionne un point et affichage de l'itinéraire https://www.liedman.net/leaflet-routing-machine/tutorials/basic-usage/
    L.marker([coordinates[i][1], coordinates[i][0]]).addTo(map)
    .bindPopup('Parking.<br>')
    .openPopup();
    
    
}


