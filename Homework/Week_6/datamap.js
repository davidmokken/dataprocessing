// Creates a format to display a number in the hover/tip function 
const format = d3.format(',');

// Set tooltips
const tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(d => `<strong>Province: </strong><span class='details'>${d.properties.name}<br></span><strong>Percentage Gelovigen: </strong><span class='details'>${format(d.total_bel)}%</span>`);

// Sets constants
const margin = {top: 0, right: 0, bottom: 0, left: 0};
const width = 600 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Sets the color scale
const colorscale = d3.scaleLinear()
  .domain([0, 100])
  .range(["#EFEFFF","#02386F"]);

// Creates an svg
const svg = d3.select('#datamap')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('class', 'map');

// Adds a comment for the map
  svg.append('text')
    .attr('x', 300)
    .attr('y', 500)
    .attr('text-anchor', 'middle')
    .style('font-size', '20px')
    .style('font-family', 'Times New Roman')
    .attr('text-anchor', 'middle')
    .text('Colour based scale');

// These magic numbers show the Netherlands out of the entire and complete worldmap
const projection = d3.geoRobinson()
  .scale(8200)
  .center([0, 52])
  .rotate([-4.8, 0])
  .translate( [width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

// Calls the tip function for the hover/tip
svg.call(tip);

// Loads the different datafiles
Promise.all([d3.json('ned.json'), d3.json('data.json')
]).then(
  d => ready(null, d[0], d[1])
);
const GelovigenProvincie = {};
const ColorList = {};

// The main function to create the map
function ready(error, data, population) {
  for (key in population){
    GelovigenProvincie[key] = population[key]['Total'];
    ColorList[key] = colorscale(population[key]['Total']);  
  }
  data.features.forEach(d =>  { d.total_bel = GelovigenProvincie[d.properties.name]});
 
  // Starts shows a bar chart of the division of religion in the Netherlands as a whole
  updateBar(population['Nederland'])


  // Appends g's to create the seperate provinces
  svg.append('g')
    .attr('class', 'countries')
    .selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
    .attr('d', path)
    .style('fill', function(d){
        return ColorList[d.properties.name]
    })
    .attr("class", function(d, i) {
        return d.properties.name;
    })
    .style('stroke', 'white')
    .style('opacity', 0.8)
    .style('stroke-width', 0.3)
    
    // Mousehover function
    .on('mouseover',function(d){
        tip.show(d);
        d3.select(this)
          .style('opacity', 1)
          .style('stroke-width', 3);
    })
    .on('mouseout', function(d){
        tip.hide(d);
        d3.select(this)
          .style('opacity', 0.8)
          .style('stroke-width',0.3);
      })

      .on("click", function(d){
        updateBar(population[d.properties.name])
      })

    svg.append('path')
    .attr('class', 'names')
    .attr('d', path);
}
