// set the dimensions and margins of the graph
var margin = {top: 40, right: 60, bottom: 60, left: 60},
    width = 800 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
fetch("https://world-happiness-database.herokuapp.com/api/grouped_data").then(function(response) {
  return response.json();
}).then(function(region_data) {

  region_data.forEach(function(data) {
    data.country = data.country;
    data.region_id = data.region_id
    data.happiness = +data.happiness;
    data.gini = +data.gini;
    data.gdp = +data.gdp;
    data.population = +data.population;
    data.gdpPerCap = data.gdp / data.population;
    // console.log(region_data);
  });

  // Add X axis
  var x = d3.scaleLinear()
    .domain([-3000, 120000])
    .range([ 0, width - margin.right]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(10));

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height+50 )
      .text("GDP per Capita");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([2, 8])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", -10)
      .attr("y", -20 )
      .text("Happiness Score")
      .attr("text-anchor", "start")

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([15, 70])
    .range([ 1, 30]);

  // Add a scale for bubble color
  var myColor = d3.scaleOrdinal()
    .domain(region_data.map(d => d.region_id))
    .range(d3.schemeCategory10);


  // ---------------------------//
  //      TOOLTIP               //
  // ---------------------------//

  // -1- Create a tooltip div that is hidden by default:
  var tooltip = d3.select("#my_dataviz")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  var showTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 0.8)
      .html("Country: " + d.country + "<br>" + "Happiness: " + d.happiness + 
        "<br>" + "GDP Per Capita: " + d.gdpPerCap)
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var moveTooltip = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }


  // ---------------------------//
  //       HIGHLIGHT GROUP      //
  // ---------------------------//

  // What to do when one group is hovered
  var highlight = function(d){
    // console.log(d)
    // reduce opacity of all groups
    d3.selectAll(".bubbles").style("opacity", 0.05)
    // expect the one that is hovered
    d3.selectAll("."+d).style("opacity", 1)
  }

  // And when it is not hovered anymore
  var noHighlight = function(d){
    d3.selectAll(".bubbles").style("opacity", 1)
  }

  // ---------------------------//
  //       CIRCLES              //
  // ---------------------------//

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(region_data)
    .enter()
    .append("circle")
      .attr("class", function(d) { return "bubbles " + d.region_id })
      .attr("cx", function (d) { return x(d.gdpPerCap); } )
      .attr("cy", function (d) { return y(d.happiness); } )
      .attr("r", function (d) { return z(d.gini); } )
      .style("fill", function (d) { return myColor(d.region_id); } )
      .style("opacity", 0.75)
    // -3- Trigger the functions for hover
    .on("mouseover", showTooltip)
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip)

  // ---------------------------//
  //       LEGEND              //
  // ---------------------------//


  // Add legend: segments

  
  // Add one dot in the legend for each name.
  var size = 20;
  var allgroups = ["SSF", "ECS", "LCN", "EAS", "SAS", "NAC", "MEA"];
  var region_name = ["Sub-Saharan Africa", "Europe and Central Asia", "Latin American & the Caribbean", 
      "East Asia and Pacific", "South Asia", "North America", "Middel East and North Africa"]
  svg.selectAll("myrect")
    .data(allgroups)
    .enter()
    .append("circle")
      .attr("cx", 500)
      .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("r", 10)
      .style("fill", function(d){ return myColor(d)})
      .on("mouseover", highlight)
      .on("mouseleave", noHighlight);

  // Add labels beside legend dots
  svg.selectAll("mylabels")
    .data(allgroups)
    .enter()
    .append("text")
      .attr("x", 500 + size*.8)
      .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", function(d){ return myColor(d)})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
      .on("mouseover", highlight)
      .on("mouseleave", noHighlight)
    .data(region_name)
      .text(function(d){ return d });
  
  svg.append("text")
  .attr("x", (width / 2))             
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")  
  .style("font-size", "16px") 
  .style("text-decoration", "underline")  
  .text("Happiness Score vs. GDP per Capita");
});
