var data = [{
  values: [9, 43, 20, 9, 2, 5, 32],
  labels: ["East Asia and Pacific", "Europe and Central Asia", 
    "Latin American & the Caribbean", "Middle East and North Africa", 
    "North America", "South Asia", "Sub-Saharan Africa"],
  domain: {column:0},
  name: "Total Count",
  hoverinfo: 'label+value',
  hole: 0.3,
  type:"pie"
}];

var layout = {
  title: 'Country Count in Region',
  annotation: [{
    font: {size: 40},
    showarrow: false,
    text: "Country Count",
    x: 0.5,
    y: 0.5
  }],
  height: 400,
  width: 600,
  showlegend: true,
  grid: {row: 1, columns:2}
};

Plotly.newPlot('pie', data, layout)
