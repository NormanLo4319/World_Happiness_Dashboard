// Define arrays to hold created happiness scores and gini coefficient
var happyMarkers = [];
var giniMarkers = [];

// Define a markerSize function that will give each city a different radius based on its population
function hMarkerSize(happiness) {
  return happiness * 30000;
}

function gMarkerSize(gini) {
  return gini * 5000;
}

// Loop through locations and create happiness and gini markers
var url = "https://world-happiness-database.herokuapp.com/api/happiness";

fetch(url).then(function(response) {
  return response.json();
}).then(function(data)  {
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
      happyMarkers.push(
        L.circle([data[i].lat, data[i].lon], {
          stroke: false,
          color: "#9E2B2B",
          fillcolor: "green", 
          fillOpacity: 0.6,
          radius: hMarkerSize(data[i].happiness)
        })
      .bindPopup("<h1>" + data[i].country + "</h1> <hr> <h3>Happiness: " + data[i].happiness + "</h3>")
      );
    }
    var url2 = "https://world-happiness-database.herokuapp.com/api/gini";

    fetch(url2).then(function(response) {
      return response.json();
    }).then(function(data)  {
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
          giniMarkers.push(
            L.circle([data[i].lat, data[i].lon], {
              stroke: false,
              color: "#2B4D9E",
              fillcolor: "green", 
              fillOpacity: 0.5,
              radius: gMarkerSize(data[i].gini)
              })
            .bindPopup("<h1>" + data[i].country + "</h1> <hr> <h3>Gini Coefficient: " + data[i].gini + "</h3>")
          );
        }
        // Define streetmap, pirate, and darkmap layers
        var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
          attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
          maxZoom: 18,
          id: "mapbox.streets",
          accessToken: API_KEY
        });

        var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
          attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
          maxZoom: 18,
          id: "mapbox.dark",
          accessToken: API_KEY
        });

        var piratemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
          attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
          maxZoom: 18,
          id: "mapbox.pirates",
          accessToken: API_KEY
        });

        // Create separate layer groups for happiness and gini
        var happyLayer = L.layerGroup(happyMarkers);
        var giniLayer = L.layerGroup(giniMarkers);

        console.log(happyLayer);

        // Define a baseMaps object to hold our base layers
        var baseMaps = {
          "Street Map": streetmap,
          "Dark Map": darkmap,
          "Pirate Map": piratemap
        };

        // Create overlay object to hold our overlay layer
        var overlayMaps = {
          "Happiness Scores": happyLayer,
          "Gini Coefficient": giniLayer
        };

        // Create our map, giving it the streetmap and earthquakes layers to display on load
        var myMap = L.map("map", {
          center: [38.9637, 35.2433],
          zoom: 3,
          layers: [piratemap, happyLayer, giniLayer]
        });


        // Create a layer control
        // Pass in our baseMaps and overlayMaps
        // Add the layer control to the map
        L.control.layers(baseMaps, overlayMaps, {
          collapsed: false
        }).addTo(myMap);
    });
});
























// var url = "https://world-happiness-database.herokuapp.com/api/gini";

// fetch(url).then(function(response) {
//   return response.json();
// }).then(function(data)  {
//     // console.log(data);
//     for (let i = 0; i < data.length; i++) {
//       giniMarkers.push(
//         L.circle([data[i].lat, data[i].lon], {
//           stroke: false,
//           color: "#CB9515",
//           fillcolor: "green", 
//           fillOpacity: 0.5,
//           radius: gMarkerSize(data[i].gini)
//           })
//         .bindPopup("<h1>" + data[i].country + "</h1> <hr> <h3>Happiness: " + data[i].gini + "</h3>")
//       );
//     }
// });

// console.log(happyMarkers);
// console.log(giniMarkers);


// // Define streetmap, pirate, and darkmap layers
// var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.streets",
//   accessToken: API_KEY
// });

// var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.dark",
//   accessToken: API_KEY
// });

// var piratemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.pirates",
//   accessToken: API_KEY
// });

// // Create separate layer groups for happiness and gini
// var happyLayer = L.layerGroup(happyMarkers);
// var giniLayer = L.layerGroup(giniMarkers);

// console.log(happyLayer);

// // Define a baseMaps object to hold our base layers
// var baseMaps = {
//   "Street Map": streetmap,
//   "Dark Map": darkmap,
//   "Pirate Map": piratemap
// };

// // Create overlay object to hold our overlay layer
// var overlayMaps = {
//   "Happiness Scores": happyLayer,
//   "Gini Coefficient": giniLayer
// };

// // Create our map, giving it the streetmap and earthquakes layers to display on load
// var myMap = L.map("map", {
//   center: [38.9637, 35.2433],
//   zoom: 3,
//   layers: [piratemap, happyLayer, giniLayer]
// });


// // Create a layer control
// // Pass in our baseMaps and overlayMaps
// // Add the layer control to the map
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(myMap);
