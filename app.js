var url = "https://world-happiness-database.herokuapp.com/api/happiness"

fetch(url).then(function(response) {
  return response.json();
}).then(function(happyData) {

    console.log(happyData.map(d => d.happiness));
    console.log(happyData.map(d => d.country));

    happyData = happyData.sort(function (a, b) {
        return d3.ascending(a.happiness, b.happiness);
    });

    var data = [{
        type: "bar",
        x: happyData.map(d => d.happiness),
        y: happyData.map(d => d.country),
        orientation: 'h'
    }];

    var layout = {
        title: "Ranks of Happiness in the World",
        autosize: false,
        width: 800,
        height: 3000,
        margin: {
            l: 200,
            r: 20,
            b: 20,
            t: 40,
            pad: 5
        },
    }
    Plotly.newPlot("bar", data, layout);
});