// Define SVG area dimensions
var svgWidth = 800;
var svgHeight = 400;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 80,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// console.log("Before graph")

fetch("https://world-happiness-database.herokuapp.com/api/grouped_data").then(function(response) {
  return response.json();
}).then(function(happyData) {
  //console.log(happyData);
  happyData.forEach(function(data) {
        data.country = data.country;
        data.happiness = +data.happiness;
        data.gini = +data.gini;
        data.gdp = +data.gdp;
        data.population = +data.population;
        data.gdpPerCap = data.gdp / data.population;
    });
  
  // happyData.forEach(function(data) {
  //   console.log(data.gdpPerCap)
  // })

  // Configure a time scale with a range between 0 and the chartWidth
  // Set the domain for the xLinearScale function
  // d3.extent returns the an array containing the min and max values for the property specified
  var xLinearScale = d3.scaleLinear()
    .range([0, chartWidth])
    .domain([15, 65]);

  // Configure a linear scale with a range between the chartHeight and 0
  // Set the domain for the xLinearScale function
  var yLinearScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([2.5, d3.max(happyData, d => d.happiness)]);

  var r = d3.scaleLinear()
    .domain([200, 110000])
    .range([ 5, 30]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Append an SVG group element to the SVG area, create the left axis inside of it
  chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(bottomAxis);
  
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

  // Step 5: Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
  .data(happyData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.gini))
  .attr("cy", d => yLinearScale(d.happiness))
  .attr("r", d => r(d.gdpPerCap))
  .attr("fill", "#1DB3B3")
  .attr("opacity", ".6");

  // Step 6: Initialize tool tip
  // ==============================
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([100, -100])
    .html(function(d) {
      return (`${d.country}<br>Happiness: ${d.happiness}<br>Gini Index: ${d.gini}<br>GDP Per Capita: ${d.gdpPerCap}`);
    });

  // Step 7: Create tooltip in the chart
  // ==============================
  chartGroup.call(toolTip);

  // Step 8: Create event listeners to display and hide the tooltip
  // ==============================
  circlesGroup.on("click", function(data) {
    toolTip.show(data, this);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });


  // Append an SVG group element to the SVG area, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 10)
    .attr("x", 0 - (chartHeight/ 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Happiness Scores");

  chartGroup.append("text")
    .attr("x", svgHeight - 10)
    .attr("y", (chartWidth / 2))
    .attr("class", "axisText")
    .text("Gini Coefficient");

  chartGroup.append("text")
    .attr("x", (svgWidth / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Happiness Score vs. Gini Coefficient");

});




// // Load the json data from the API call
// d3.json("http://127.0.0.1:5000/api/grouped_data", function(error, happyData) {
  
//   if (error) throw error; 
//   console.log("After graph")

//   // Format the date and cast the miles value to a number
//   happyData.forEach(function(data) {
//     data.country = data.country;
//     data.happiness = +data.happiness;
//     data.gini = +data.gini;
//     data.gdp = +data.gdp;
//     data.population = +data.population;
//     data.gdpPerCap = data.gdp / data.population;
//   });

//   // Configure a time scale with a range between 0 and the chartWidth
//   // Set the domain for the xLinearScale function
//   // d3.extent returns the an array containing the min and max values for the property specified
//   var xLinearScale = d3.scaleTime()
//     .range([0, chartWidth])
//     .domain(d3.extent(happyData, d => d.gini));

//   // Configure a linear scale with a range between the chartHeight and 0
//   // Set the domain for the xLinearScale function
//   var yLinearScale = d3.scaleLinear()
//     .range([chartHeight, 0])
//     .domain([0, d3.max(happyData, d => d.happiness)]);

//   // Create two new functions passing the scales in as arguments
//   // These will be used to create the chart's axes
//   var bottomAxis = d3.axisBottom(xLinearScale);
//   var leftAxis = d3.axisLeft(yLinearScale);

//   // Append an SVG group element to the SVG area, create the left axis inside of it
//   chartGroup.append("g")
//   .attr("transform", `translate(0, ${chartHeight})`)
//   .call(bottomAxis);

//   chartGroup.append("g")
//     .classed("axis", true)
//     .call(leftAxis);

//   // Step 5: Create Circles
//   // ==============================
//   var circlesGroup = chartGroup.selectAll("circle")
//   .data(happyData)
//   .enter()
//   .append("circle")
//   .attr("cx", d => xLinearScale(d.gini))
//   .attr("cy", d => yLinearScale(d.happiness))
//   .attr("r", d => d.happiness)
//   .attr("fill", "green")
//   .attr("opacity", ".75");

//   // Step 6: Initialize tool tip
//   // ==============================
//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (`${d.country}<br>Happiness: ${d.happiness}<br>Gini Index: ${d.gini}`);
//     });

//   // Step 7: Create tooltip in the chart
//   // ==============================
//   chartGroup.call(toolTip);

//   // Step 8: Create event listeners to display and hide the tooltip
//   // ==============================
//   circlesGroup.on("click", function(data) {
//     toolTip.show(data, this);
//   })
//     // onmouseout event
//     .on("mouseout", function(data, index) {
//       toolTip.hide(data);
//     });


//   // Append an SVG group element to the SVG area, create the bottom axis inside of it
//   // Translate the bottom axis to the bottom of the page
//   chartGroup.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left + 40)
//       .attr("x", 0 - (height / 2))
//       .attr("dy", "1em")
//       .attr("class", "axisText")
//       .text("Happiness Index");

//     chartGroup.append("text")
//       .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//       .attr("class", "axisText")
//       .text("Gini Index");
//   });