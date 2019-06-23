// console.log(region_data)

var region = region_data.map(d => d.region);
var happiness = region_data.map(d => d.happiness).map(x => x*10);
var gini = region_data.map(d => d.gini);

// console.log(region);
console.log(happiness);
// console.log(gini);

var trace1 = {
    x: region,
    y: happiness,
    name: "Happiness",
    type: "bar"
};

var trace2 = {
    x: region,
    y: gini,
    name: "Gini",
    type: "bar"
};

var data = [trace1, trace2];

var layout = {
    height: 500,
    title: {
        text: "Happiness & Gini Index:",
        font: {
            family: 'Courier New, monospace',
            size: 20,
            color: '#7f7f7f'
        }
    },
    xaxis: {
        title: {
            text: "Gini Coefficient",
            font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
            }
        }
    },
    yaxis: {
        title: {
            text: "Happiness Score (x10)",
            font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
            }
        }
    },

    margin:{l:80, r:50, t:50, b:160},
    barmode: "group"
};

Plotly.newPlot("bar", data, layout);