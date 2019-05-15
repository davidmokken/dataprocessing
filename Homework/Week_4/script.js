// Width and Height
var width_svg = 1500;
var height_svg = 500;
var width_bar = 1200;
var height_bar = 300;
var max_domain = 13.2;
var spacing_xaxis = 50;
var barPadding = 2;

d3.select("head")
.append("title")
.text("Alcohol Consumption 2016");

d3.select("body")
.append("h1")
.text("Alcohol Consumption per capita 2016");

d3.select("body")
.append("h3")
.text("Name: David Mokken");

d3.select("body")
.append("h3")
.text("Student Number: 10770798");

d3.select("body")
.append("p")
.text("This dataset shows the consumption \
of pure alcohol in litres per capita (aged 15 and over) in the year 2016.");

// Creates SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", width_svg)
            .attr("height", height_svg);

// Imports the data from the json file            
d3.json("data.json").then(function(data){

    // Creates scale and variable for x-axis
    var xScale = d3.scaleBand()
    .domain(data.map(function(d) { return d.LOCATION}))
    .range([0, width_bar]);
    var xAxis = d3.axisBottom(xScale);

    // Creates scale and variable for y-axis
    var yScale = d3.scaleLinear()
    .domain([0, max_domain])
    .range([height_bar, 0]);
    var yAxis = d3.axisLeft(yScale);

    // Hovering function used from http://bl.ocks.org/Caged/6476579
    var hover = d3.select("body")
                .append("div")
                .attr("class", "mousehover");

    // Add x-axis to the bar-chart
    svg.append("g")
        .call(xAxis)
        .attr("transform", "translate(50, 300)");

    // Add y-axis to the bar-chart
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
        .text("Amount in liters of pure alcohol");

    // Draws the bars with the acquired data
    var bars = svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect");

    bars.attr("x", function(d, i) {
        return spacing_xaxis + (i * width_bar / data.length);
        })
        .attr("y", function(d) {
            d = d['Value']
            return yScale(d);
        })
        .attr("width", width_bar / data.length - barPadding)
        .attr("height", function(d){
            return height_bar - yScale(d.Value);
        })
        .attr("fill", function(d) {
            return "rgb(" + (height_bar - yScale(d.Value)) + ", 0, 0)";
        })
        // Mouse move function
        .on('mouseover', function(d){
        hover.style("left", d3.event.pageX - spacing_xaxis + "px")
                .style("top", d3.event.pageY - spacing_xaxis + "px")
                .style("display", "inline-block")
                .html((d.LOCATION) + ": " + (d.Value));
        })
        .on('mouseout', function(d) {
            hover.style("display", "none")
        });        
    
    // Draws the labels for the seperate bars    
    var text = svg.selectAll("text")
                .data(data)
                .enter()
                .append("text");
    
    // Puts labels under the different bars            
    text.text(function(d) {
        return d.LOCATION;
        })
        .attr("x", function(d, i) {
            return spacing_xaxis + (i * (width_bar / data.length) + (width_bar / data.length - barPadding) / 2);
        })
        .attr("y", function(d) {
            return height_bar + 10
        })
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black");

    });


