 
    //Initialize the dashboard
function buildCharts(selected) {
    //console.log(selected)

    d3.json("samples.json").then((data) => {

    console.log(data)
    // You need to filter by selected
    
    let sample = data.samples.filter(values => values.id == selected);
        

        xValues = sample[0].sample_values.slice(0,10).reverse()
        hoverText = sample[0].otu_labels.slice(0,10).reverse()
            
        
        // .slice, .map and dot reverse to add values in descending order
        yValues  = sample[0].otu_ids.slice(0,10).map(x => "OTU " + x.toString()).reverse()
    
        console.log(hoverText)
//     })
    
    // Bar Chart    
    var barchart = [
        {
          x: xValues,
          y:  yValues ,
          type: 'bar',
          orientation: 'h',
          mode: 'markers',
          marker: {size:5},
          text: hoverText
        }
      ];
      var layout = {title: hoverText};
      Plotly.newPlot('bar', barchart, layout);

      // Bubble chart 

      xValues1 = sample[0].otu_ids
      yValues1 = sample[0].sample_values

      console.log(xValues)

      var trace1 = {
        x: xValues1,
        y: yValues1,
        mode: 'markers',
        text: hoverText,
        
        marker: {
          size: yValues1,
          colorscale: 'YlGnBu',
            color: xValues1,
        },
        // type: 'scatter'
      };
      
      var data1 = [trace1];
      
      var layout = {showlegend: false};
      
      Plotly.newPlot('bubble', data1, layout);
      
      let metadata = data.metadata;
    // Filter the data for the object with the desired sample number

    let resultArray = metadata.filter(dict => dict.id == selected);
    let result = resultArray[0];
      console.log(result)
      var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: result.wfreq,
          
          title: { text: "Belly Button Washing Frequency<br>Scrubs Per Week" },
          type: "indicator",
          mode: "gauge+number+delta",
          delta: { reference: 5 },
          gauge: {
            axis: { range: [null, 10] },
            steps: [
              { range: [0, 5], color: "lightgray" },
              { range: [5, 10], color: "gray" }
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: 490
            }
          }
        }
      ];
      
      var layout = { margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);

    })
}


 
    

d3.json("samples.json").then((data) => {


    let dropdown = d3.select("#selDataset")

    data.names.forEach((id) => {

        dropdown.append('option').text(id).property("value", id)

    })
    
    buildMetadata(data.names[0])
    buildCharts(data.names[0])
 })

function optionChanged(selected) {

    buildCharts(selected)
}

    function optionChanged(newSample) {

        // fetch new data each time a new sample is selected
        buildMetadata(newSample);
        buildCharts(newSample);

    }
// Demographics Panel
function buildMetadata(sample){
    
    
    d3.json("samples.json").then((data) => {
    let metadata = data.metadata;
    // Filter the data for the object with the desired sample number

    let resultArray = metadata.filter(dict => dict.id == sample);
    let result = resultArray[0];
    
    // d3 to select the panel with id of `#sample-metadata`
    let meta = d3.select("#sample-metadata");
    
    //.html("") to clear any existing metadata
    meta.html("");
    
    
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
        meta.append("h6").text(`${key.toUpperCase()}: ${value}`);

    });
  
  });
}











