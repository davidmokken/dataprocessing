// David Mokken
// 10770798
// Purpose of the file:

window.onload = function() {

    console.log('Yes, you can!')

  };

var teensInViolentArea = "https://stats.oecd.org/SDMX-JSON/data/CWB/AUS+AUT+BEL+BEL-VLG+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+OAVG+NMEC+BRA+BGR+CHN+COL+CRI+HRV+CYP+IND+IDN+MLT+PER+ROU+RUS+ZAF.CWB11/all?startTime=2010&endTime=2017"
var teenPregnancies = "https://stats.oecd.org/SDMX-JSON/data/CWB/AUS+AUT+BEL+BEL-VLG+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+OAVG+NMEC+BRA+BGR+CHN+COL+CRI+HRV+CYP+IND+IDN+MLT+PER+ROU+RUS+ZAF.CWB46/all?startTime=1960&endTime=2017"
var GDP = "https://stats.oecd.org/SDMX-JSON/data/SNA_TABLE1/AUS+AUT+BEL+CAN+CHL+CZE+DNK+EST+FIN+FRA+DEU+GRC+HUN+ISL+IRL+ISR+ITA+JPN+KOR+LVA+LTU+LUX+MEX+NLD+NZL+NOR+POL+PRT+SVK+SVN+ESP+SWE+CHE+TUR+GBR+USA+EU28+EU15+OECDE+OECD+OTF+NMEC+ARG+BRA+BGR+CHN+COL+CRI+HRV+CYP+IND+IDN+MLT+ROU+RUS+SAU+ZAF+FRME+DEW.B1_GE.HCPC/all?startTime=2012&endTime=2018&dimensionAtObservation=allDimensions"

var requests = [d3.json(teensInViolentArea), d3.json(teenPregnancies), d3.json(GDP)];

Promise.all(requests).then(function(response) {
    cleaned_data = clean_data(response);
    create_scatter(cleaned_data);
}).catch(function(e){
    throw(e);
});

function clean_data(data){

    let violence = transformResponse(data[0]);
    let preg = transformResponse(data[1]);
    let gdp = transformResponse2(data[2]);
    var cleaned_data = {};

    // Create keys from data
    for (key in violence){
        cleaned_data[key] = {}
        for (year in violence[key]){
            cleaned_data[key][violence[key][year]["Time"]] = {} 
            cleaned_data[key][violence[key][year]["Time"]]["Violence"] = violence[key][year]['Datapoint']

        };  
         
    }
    for (country in preg){
        if (country in cleaned_data){
            for (year in preg[country]){
                if ((preg[country][year]["Time"]) in cleaned_data[country]){
                    cleaned_data[country][preg[country][year]["Time"]]["Pregnancy"] = preg[country][year]['Datapoint']
                }
            }  
        }
    }
    for (country in gdp){
        if (country in cleaned_data){
            for (year in gdp[country]){
                if ((gdp[country][year]["Year"]) in cleaned_data[country]){
                    cleaned_data[country][gdp[country][year]["Year"]]["GDP"] = gdp[country][year]['Datapoint']
                }
            }  
        }
    }

    // Deletes the years 2010 and 2011 from the dict
    //since they do not have all three values
    for (country in cleaned_data){
        delete cleaned_data[country]['2010']
        delete cleaned_data[country]['2011']

    }
    console.log(cleaned_data)    
    
    return cleaned_data
}

function create_scatter(data){

    // Width and Heights
    var width_svg = 600;
    var height_svg = 600;
    var width_chart = 400;
    var height_chart = 400;
    var max_violence = 25;
    var max_pregnancy = 30;

    // Creates SVG element
    var svg = d3.select("body")
                .append("svg")
                .attr("width", width_svg)
                .attr("height", height_svg);

    var data = data     
    // var country = Object.keys(data)  
    console.log(data['Violence'])

    // Creates scale and variable for x-axis
    var xScale = d3.scaleLinear()
                    .domain([0, max_violence])
                    //.domain([0, d3.max(data, function(d) { return d.Violence })])
                    .range([0, width_chart]);
    var xAxis = d3.axisBottom(xScale);

    // Creates scale and variable for y-axis
    var yScale = d3.scaleLinear()
                    .domain([0, max_pregnancy])
                    //.domain([0, d3.max(data, function(d) { return d['Pregnancy']; })])
                    .range([height_chart, 0]);
    var yAxis = d3.axisLeft(yScale);

    // Creates the r scale 
    // var rScale = d3.scaleLinear()
    //                 .


    // Add x-axis and its description to scatterplot
    svg.append("g")
        .call(xAxis)
        .attr("transform", "translate(50, 400)");

    // Add y-axis and its description to scatterplot
    svg.append("g")
        .call(yAxis)
        .attr("transform", "translate(50, 10)");

    // Description of the y-axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 25)
        .style("text-anchor", "end")
        .attr("font-size", "13px")
        .attr("font-family", "sans-serif")
        .text("Teen Pregnancies rate");

    // Description of the x-axis
    svg.append("text")
        .attr("transform", "translate(200, 430)")
        .attr("font-size", "13px")
        .attr("font-family", "sans-serif")
        .text("Teen Violence rate");
    

    // Draws the circles with the acquired data
    var circles = svg.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d) {
                        return xScale(d);
                   })
                   .attr("cy", function(d) {
                        return yScale(d);
                   })
                   .attr("r", 5);

    }
