

































//////////////////////////////////////////////////////////////////////
//////Graph II -Oil & Gas Production By Year In Loving County, TX//// 
////////////////////////////////////////////////////////////////////

//url to oil&gas prod json data 
var prod_url = "https://gist.githubusercontent.com/hmakhlouf/1ff8fec36385fbd6c4c9a162b655de46/raw/2196c76e95e6b92a1f47aa35c04fbff3a92cdc0f/Prod_LovingCounty"


// pulling the data 
function buildProductionPlot() {
  d3.json(prod_url).then(function(prod_data) {
    console.log(prod_data);

       
    years = [];
    oil_production = [];
    gas_production = [];
  
for (var i = 0; i < prod_data.length; i++) {
  
  var  yrs = prod_data[i].Years;
  var  prod_oil = prod_data[i]["Oil(BBLs)"]; 
  var  prod_gas = prod_data[i]["Gas(MCF)"]
  
  years.push(yrs);
  oil_production.push(prod_oil);
  gas_production.push(prod_gas);

  }
//   console.log(years);
//   console.log(oil_production);
//   console.log(gas_production);


 //  create a line and scatter plot to visualize the yearly O&G production in loving county 
  var trace1 = {
  type: "scatter",
  mode: "lines+markers",
  name: "Oil(BBL)",        
  marker: { 
    size: 8,
    opacity: 0.9,
  },    
  x: years,
  y: oil_production,
  line: {
    color: "green"
  }

  };
  var plot_data = [trace1];  


  var layout = {
    title:'Oil & Gas Production By Year In Loving County, TX',
    
    "titlefont": {
      // family: 'Courier New, monospace',
    "size": 32,
  },
  plot_bgcolor: "#fffce4",   
  xaxis: {
    title: {
      text: 'Years',
      font: {
        family: 'Courier New, monospace',
        size: 25,
        color: '#7f7f7f'
      }
    },
  type: "date", 
  },
  yaxis: {
    title: {
      text: 'Production',
      font: {
        family: 'Courier New, monospace',
        size: 25,
        color: '#7f7f7f'
      }
    }
  }
};
    

  Plotly.newPlot("graph_prod", plot_data, layout); 

  });

}


// dropdown event  "oil production" "gas production" 

var LINE = document.getElementById("graph_prod");
function updatePlotly(newx, newy, newline) {
  var LINE = document.getElementById("graph_prod");

  
  Plotly.restyle(LINE, "x", [newx]);
  Plotly.restyle(LINE, "y", [newy]);
  Plotly.restyle(LINE, "line", [newline]);
  // Plotly.restyle(LINE, "name", [newname]);
}

function getData(dataset) {
  var x = [];
  var y = [];
  var line = [];
  // var name = [];

  switch (dataset) {
  case "dataset1":
    x = years;
    y = oil_production;
    line = {
          color: "green"
        };
    name = "Oil(BBLs)";
    
    
    break;

  case "dataset2":
    x = years;
    y = gas_production;
    line =  {
          color: "red"
        };
    name =  "Gas(MCF)";
    
  }

  updatePlotly(x, y, line);
}

buildProductionPlot();