const format = d3.format(',');

// Set tooltips
const tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(d => `<strong>Province: </strong><span class='details'>${d.properties.name}<br></span><strong>Percentage Gelovigen: </strong><span class='details'>${format(d.total_bel)}%</span>`);

const margin = {top: 0, right: 0, bottom: 0, left: 0};
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const colorscale = d3.scaleLinear()
  .domain([0, 100])
  .range(["#EFEFFF","#02386F"]);

const svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('class', 'map');

const projection = d3.geoRobinson()
  .scale(8200)
  .center([0, 52])
  .rotate([-4.8, 0])
  .translate( [width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

svg.call(tip);

// var datamap = "nld.json"
// var nld = "data.json"
// var request = [d3.json(datamap), d3.json(nld)]

Promise.all([d3.json('ned.json'), d3.json('data.json')
]).then(
  d => ready(null, d[0], d[1])
);
const GelovigenProvincie = {};
const ColorList = {};

function ready(error, data, population) {
  for (key in population){
    GelovigenProvincie[key] = population[key]['Total'];
    ColorList[key] = colorscale(population[key]['Total']);  
  }
  data.features.forEach(d =>  { d.total_bel = GelovigenProvincie[d.properties.name]});

  svg.append('g')
    .attr('class', 'countries')
    .selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
    .attr('d', path)
    .style('fill', function(d){
        console.log(d)
        console.log(ColorList[d.properties.name])
        return ColorList[d.properties.name]
    })
    .attr("class", function(d, i) {
        return d.properties.name;
    })
    .style('stroke', 'white')
    .style('opacity', 0.8)
    .style('stroke-width', 0.3)
    
    // Mousehover
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
      });

  svg.append('path')
    .datum(topojson.mesh(data.features, (a, b) => a.id !== b.id))
    .attr('class', 'names')
    .attr('d', path);
}