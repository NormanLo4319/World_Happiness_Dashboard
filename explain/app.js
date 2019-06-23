var url = "https://world-happiness-database.herokuapp.com/api/happiness_explain";

var country = [];
var corruption = [];
var freedom = [];
var gdpPerCap = [];
var generosity = [];
var happiness = [];
var health = [];
var social = [];
var residual = [];


fetch(url).then(function(response) {
  return response.json();
}).then(function(explainData) {

    // console.log(explainData[1].happiness)
    // console.log(explainData[1] ["Finland", "Denmark", "Norway", "Iceland", "Netherlands", "Rwanda", "Tanzania", "Afghanistan", "Central African Republic", "South Sudan"]);

    for (var i = 0; i < explainData.length; i++) {
        if (explainData[i].happiness > 7.48 || explainData[i].happiness < 3.38) {
          country.push(explainData[i].country);
          corruption.push(explainData[i].corruption);
          freedom.push(explainData[i].freedom);
          gdpPerCap.push(explainData[i].gdpPerCap);
          generosity.push(explainData[i].generosity);
          health.push(explainData[i].health);
          social.push(explainData[i].social);
          residual.push(explainData[i].residual);
        }
      };
    console.log(country);
    console.log(residual);
    
    var trace1 = {
      x: country, //["Finland", "Denmark", "Norway", "Iceland", "Netherlands", "Rwanda", "Tanzania", "Afghanistan", "Central African Republic", "South Sudan"],
      y: corruption, //[0.39299999999999996, 0.41, 0.341, 0.11800000000000001, 0.298, 0.41100000000000003, 0.147, 0.025, 0.035, 0.091],
      name: "Corruption",
      type: "bar",
      marker: {color: "#EE8A37"}
  };
  // console.log(trace1);
  
  var trace2 = {
      x: country, //["Finland", "Denmark", "Norway", "Iceland", "Netherlands", "Rwanda", "Tanzania", "Afghanistan", "Central African Republic", "South Sudan"],
      y: freedom, //[0.596, 0.5920000000000001, 0.603, 0.591, 0.557, 0.555, 0.41700000000000004, 0, 0.225, 0.01],
      name: "Freedom",
      type: "bar",
      marker: {color: "#DAD613"}
  };
  
  var trace3 = {
      x: country, //["Finland", "Denmark", "Norway", "Iceland", "Netherlands", "Rwanda", "Tanzania", "Afghanistan", "Central African Republic", "South Sudan"],
      y: gdpPerCap, //[1.34, 1.383, 1.4880000000000002, 1.38, 1.396, 0.359, 0.47600000000000003, 0.35, 0.026000000000000002, 0.306],
      name: "GDP Per Capita",
      type: "bar",
      marker: {color: "#43B20B"}
  };
  
  var trace4 = {
      x: country, //["Finland", "Denmark", "Norway", "Iceland", "Netherlands", "Rwanda", "Tanzania", "Afghanistan", "Central African Republic", "South Sudan"],
      y: generosity, //[0.153, 0.252, 0.271, 0.354, 0.322, 0.217, 0.276, 0.158, 0.235, 0.20199999999999999],
      name: "Generosity",
      type: "bar",
      marker: {color: "#0BB288"}
  };
  
  var trace5 = {
      x: country, //["Finland", "Denmark", "Norway", "Iceland", "Netherlands", "Rwanda", "Tanzania", "Afghanistan", "Central African Republic", "South Sudan"],
      y: health, //[0.986, 0.996, 1.028, 1.026, 0.9990000000000001, 0.614, 0.499, 0.361, 0.105, 0.295],
      name: "Health",
      type: "bar",
      barmode: "stack",
      marker: {color: "#0B77B2"}
  };
  
  var trace6 = {
      x: country, //["Finland", "Denmark", "Norway", "Iceland", "Netherlands", "Rwanda", "Tanzania", "Afghanistan", "Central African Republic", "South Sudan"],
      y: social, //[1.587, 1.5730000000000002, 1.5819999999999999, 1.624, 1.5219999999999998, 0.711, 0.885, 0.517, 0, 0.575],
      name: "Social Supoort",
      type: "bar",
      barmode: "stack",
      marker: {color: "#0B23B2"}
  };
  
  var trace7 = {
      x: country, //["Finland", "Denmark", "Norway", "Iceland", "Netherlands", "Rwanda", "Tanzania", "Afghanistan", "Central African Republic", "South Sudan"],
      y: residual, //[2.714, 2.3930000000000002, 2.241, 2.401, 2.3930000000000002, 0.467, 0.531, 1.7930000000000001, 2.456, 1.374],
      name: "Residual",
      type: "bar",
      barmode: "stack",
      marker: {color: "#610BB2"}
  };
  // console.log(trace7)
  
  var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7];
  console.log(data);
  
  var layout = {
      title: "Contribution to Happiness (Top & Bottom 5 Countries)",
      xaxis: {title: "Country"},
      yaxis: {title: "Happiness Attributions"},
      barmode: "stack"
  };
  
  Plotly.newPlot("stack", data, layout);
});


