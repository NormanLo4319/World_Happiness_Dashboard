var url = "https://world-happiness-database.herokuapp.com/api/grouped_data"

fetch(url).then(function(response) {
  return response.json();
}).then(function(happyData) {

  console.log(happyData);

  var eas = [];
  var ecs = [];
  var lcn = [];
  var mea = [];
  var nac = [];
  var sas = [];
  var ssf = [];

  for (var i = 0; i < happyData.length; i++) {
    if (happyData[i].region_id === "EAS") {
      eas.push(happyData[i])
    }
    else if (happyData[i].region_id === "ECS") {
      ecs.push(happyData[i])
    }
    else if (happyData[i].region_id === "LCN") {
      lcn.push(happyData[i])
    }
    else if (happyData[i].region_id === "MEA") {
      mea.push(happyData[i])
    }
    else if (happyData[i].region_id === "NAC") {
      nac.push(happyData[i])
    }
    else if (happyData[i].region_id === "SAS") {
      sas.push(happyData[i])
    }
    else {
      ssf.push(happyData[i])
    }
  };


  console.log(ssf.map(d => d.gini));

  var trace1 = {
    x: eas.map(d => d.gini),
    y: eas.map(d => d.happiness),
    mode: 'markers',
    type: 'scatter',
    name: "East Asia and Pacific",
    text: eas.map(d => d.country),
    textfont : {
      family:'Times New Roman'
    },
    textposition: 'bottom center',
    marker: { size: 12 }
  };

  var trace2 = {
    x: ecs.map(d => d.gini),
    y: ecs.map(d => d.happiness),
    mode: 'markers',
    type: 'scatter',
    name: "Europe and Central Asia",
    text: ecs.map(d => d.country),
    textfont : {
      family:'Times New Roman'
    },
    textposition: 'bottom center',
    marker: { size: 12 }
  };
  
  var trace3 = {
    x: lcn.map(d => d.gini),
    y: lcn.map(d => d.happiness),
    mode: 'markers',
    type: 'scatter',
    name: "Latin American & the Caribbean",
    text: lcn.map(d => d.country),
    textfont : {
      family:'Times New Roman'
    },
    textposition: 'bottom center',
    marker: { size: 12 }
  };

  var trace4 = {
    x: mea.map(d => d.gini),
    y: mea.map(d => d.happiness),
    mode: 'markers',
    type: 'scatter',
    name: "Middle East and North Africa",
    text: mea.map(d => d.country),
    textfont : {
      family:'Times New Roman'
    },
    textposition: 'bottom center',
    marker: { size: 12 }
  };

  var trace5 = {
    x: nac.map(d => d.gini),
    y: nac.map(d => d.happiness),
    mode: 'markers',
    type: 'scatter',
    name: "North America",
    text: nac.map(d => d.country),
    textfont : {
      family:'Times New Roman'
    },
    textposition: 'bottom center',
    marker: { size: 12 }
  };

  var trace6 = {
    x: sas.map(d => d.gini),
    y: sas.map(d => d.happiness),
    mode: 'markers',
    type: 'scatter',
    name: "South Asia",
    text: sas.map(d => d.country),
    textfont : {
      family:'Times New Roman'
    },
    textposition: 'bottom center',
    marker: { size: 12 }
  };

  var trace7 = {
    x: ssf.map(d => d.gini),
    y: ssf.map(d => d.happiness),
    mode: 'markers',
    type: 'scatter',
    name: "Sub-Saharan Africa",
    text: ssf.map(d => d.country),
    textfont : {
      family:'Times New Roman'
    },
    textposition: 'bottom center',
    marker: { size: 12 }
  };

  var data = [ trace1, trace2, trace3, trace4, trace5, trace6, trace7 ];
  
  var layout = {
    xaxis: {
      title: { 
        text: "GINI Coefficient",
        font: {        
          family: 'Arial, sans-serif',
          size: 15,
          color: 'grey'
        }},
      range: [ 15, 65 ]
    },
    yaxis: {
      title: {
        text: "Happiness Score",
        font: {
          family: 'Arial, sans-serif',
          size: 15,
          color: 'grey'
        }},
      range: [2, 8]
    },
    legend: {
      y: 0.5,
      yref: 'paper',
      font: {
        family: 'Arial, sans-serif',
        size: 10,
        color: 'grey',
      }
    },
    title:'Happiness vs. Gini'
  };
  
  Plotly.newPlot('scatter', data, layout);


});






