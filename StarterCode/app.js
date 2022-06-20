function init() {

    let selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;

        console.log("hello world")
    
    

    sampleNames.forEach((sample) => {
        selector
        .append ("option")
        .text (sample)
        .property ("value",sample);


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
    d3.json("samples. json").then((data) => {
    metadata = data.metadata;



    });
}




