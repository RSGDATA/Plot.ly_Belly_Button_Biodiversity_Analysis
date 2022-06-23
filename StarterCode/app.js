 
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
          text: hoverText.toString()
        }
      ];
      var layout = {title: hoverText};
      Plotly.newPlot('bar', barchart, layout);

      // Bubble chart filter

      xValues1 = sample[0].otu_ids
      yValues1 = sample[0].sample_values

      console.log(xValues)

      var trace3 = {
        x: xValues1,
        y: yValues1,
        mode: 'markers',
        marker: {
          size: yValues1,
          line: {
            color: xValues1,
            width: [2, 2, 6, 2]
          }
        },
        type: 'scatter'
      };
      
      var data = [trace3];
      
      var layout = {showlegend: false};
      
      Plotly.newPlot('bubble', data, layout);
      

    })
}


 
    

d3.json("samples.json").then((data) => {


    let dropdown = d3.select("#selDataset")

    data.names.forEach((id) => {

        dropdown.append('option').text(id).property("value", id)

    })

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

    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    
    //Use d3 to select the panel with id of `#sample-metadata`
    let PANEL = d3.select("#sample-metadata");
    
    // Use `.html("") to clear any existing metadata
    PANEL.html("");
    
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you eill need to use d3 to appen new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);

    });
  
  });
}











