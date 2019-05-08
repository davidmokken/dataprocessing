// Width and Height
var w = 1000;
var h = 300;
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

var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

d3.json("data.json").then(function(data){
    var bars = svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect");

    bars.attr("x", function(d, i) {

        return (i * w / data.length);
        })

        .attr("y", function(d) {
            d = d['Value']
            return d * 20;
            // return h - d
        })

        .attr("width", w/data.length - barPadding)
        .attr("height", function(d){
            return (h - (d.Value * 20));
            // return d
        })

        .attr("fill", function(d) {
            return "rgb(0, 0, " + (d.Value * 20) + ")";
        });

    var text = svg.selectAll("text")
                .data(data)
                .enter()
                .append("text");
                       
    text.text(function(d) {
        return d.Value;
        })

        .attr("x", function(d, i) {
            return i * (w / data.length) + 5;
        })

        .attr("y", function(d) {
            return h - (d.Value);
        })

        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white");

    });
