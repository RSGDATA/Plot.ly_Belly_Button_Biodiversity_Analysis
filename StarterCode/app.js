function init() {

   // Grab a reference to dropdown select element 
    let selector = d3.select("#selDataset");
   
   // Use the list of sample names to populate the select options

    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;

    
    

    sampleNames.forEach((sample) => {
        selector
        .append ("option")
        .text (sample)
        .property ("value", sample);


        });

        // Ise the first sample from the list to build the initial plots
        let firstSample = sampleNames[0]; 
        buildCharts(firstSample);
        buildMetadata(firstSample);

    });

   } 
    //Initialize the dashboard
    init();


    
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

// 1. Create the buildCharts function.
function buildingCharts(sample) {

    // 2. Use  d3.json to load and retrieve the samples.json file
    d3.json("samples.json").then(data) => {

        // 3. Create a variable that holds the samples array.
        
        // 4. Create a variable that filters the samples for the object with the desired sample number.

        // 5. Create a variable that holds the first sample in the array

        // 6 Create variables that hold the otu_ids, otu_labels, and sample_values.


        // 7. Create the yticks for the bar chart.
        // Hint: Get the top 1- otu_ids and map them in descending order
        // so the otu_ids with the most bacteria are last.

        let yticks =

        // 8. Create the trace for thebar chart.
        let barData = [


        ];
        // 9. Create the trace for the bar chart.
        let barLayout = {

        }
        // 10. Use Plotly to plot the data with the layout

    });
}










