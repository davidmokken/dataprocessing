// Javascript Piechart
// David Mokken
// 10770798

// Constant values
const width_svg = 700;
const height_svg = 700;
const width_pie = 500;
const height_pie = 500;
const margin_pie = 40;
const legendRectSize = 25;
const legendSpacing = 6;

// The radios of the piechart
const radius_pie = Math.min(width_pie, height_pie) / 2.5 - margin_pie;

// Set tooltips
const tip_pie = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(d => `<strong>Religion: </strong><span class='details'>${d.data.key}<br></span><strong>Percentage: </strong><span class='details'>${format(d.value)}%</span>`);

// Append svg object to the div "pie_chart"
const svg_pie = d3.select("#pie_chart")
            .append("svg")
            .attr("width", width_svg)
            .attr("height", height_svg)
            .append("g")
            .attr("transform", `translate(${width_pie / 2}, ${height_pie / 2})`)
svg_pie.call(tip_pie);
    // Sets the color scale
    const color = d3.scaleOrdinal()
                    .domain(['Athiest', 'Dutch Reformed', 'Islam', 'Other', 'Protestant', 'Reformed', 'Roman Catholic'])
                    .range(["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f", "#0f60e2"]);
  
    // A function that creates/updates the plot for a given province
    function updateBar(data) {
        delete data.Total;
        
        // Computes the position of each religion on the pie
        var pie = d3.pie()
                    .value(function(d) {
                        return d.value;
                    })
                    .sort(function(a, b) {
                        return d3.ascending(a.key, b.key);
                    })
        
        var data_ready = pie(d3.entries(data))
        
        // Sorts the data by index
        data_ready.sort(function(a,b){
            return a.index - b.index;
        })
        
        // Map to data
        var u = svg_pie.selectAll("path")
                    .data(data_ready)

                // Build the pie chart
                u
                    .enter()
                    .append('path')

                    // Mousehover function
                    .on('mouseover',function(d){
                        tip_pie.show(d);
                        d3.select(this)
                        .style('opacity', 1)
                        .style('stroke-width', 3);
                    })
                    .on('mouseout', function(d){
                        tip_pie.hide(d);
                        d3.select(this)
                        .style('opacity', 0.8)
                        .style('stroke-width',0.3);
                    })

                    // The merge and transition function seem to call for an error in the console.
                    // However everything does work
                    // Tim himself couldn't find the problem either and said I should mention it as a comment
                    .merge(u)
                    .transition()
                    .duration(1000)
                    .attr('d', d3.arc()
                        .innerRadius(0)
                        .outerRadius(radius_pie)
                    )
                    .attr('fill', function(d){
                        return(color(d.index))
                    })
                    .attr("class", function(d, i) {
                        return d.data.key;
                    })
                    .attr("stroke", "white")
                    .style("stroke-width", "2px")
                    .style("opacity", 1)

                u
                    .exit()
                    .remove()
    }

    // Appends a title to the piechart
    svg_pie.append('text')
    .attr('x', 0)
    .attr('y', -200)
    .attr('text-anchor', 'middle')
    .style('font-size', '20px')
    .style('font-family', 'Times New Roman')
    .text('At start: Division of religion in The Netherlands as a whole.');
                 
// Adds a legend                    
var legend = svg_pie.selectAll(".legend")
    .data(color.domain())
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr('transform', function(d, i) {
        var height = legendRectSize;
        var x = 8 * legendRectSize;
        var y = i * height;
        return 'translate(' + x + ',' + y + ')';

    });

    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);

    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)             
        .attr('y', legendRectSize - legendSpacing)             
        .text(function(d) { 
            return d; }); 


