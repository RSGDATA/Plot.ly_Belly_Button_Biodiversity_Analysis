function init() {

    let selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;

    
    

    sampleNames.forEach((sample) => {
        selector
        .append ("option")
        .text (sample)
        .property ("value", sample);


        });

        let firstSample = sampleNames[0]; 
        buildCharts(firstSample);
        buildMetadata(firstSample);

    });

   } 

    init();

    function optionChanged(newSample) {
        buildMetadata(newSample);
        buildCharts(newSample);

    }

function buildMetadata(sample){
    d3.json("samples.json").then((data) => {
    let metadata = data.metadata;

    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];

    let PANEL = d3.select("#sample-metadata");

    PANEL.html("");

    Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);

    });
  
  });
}






