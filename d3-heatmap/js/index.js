var margin = {top: 20, right: 20, bottom: 30, left: 50};
var w = 640; 
var h = 480;
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var colors = ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"];
var gridSizeX = (w - margin.left - margin.right) / 262; 
var gridSizeY = (h - margin.top - margin.bottom) / 12;

//Create SVG element
var svg = d3.select(".d3Heatmap")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

// ranges
var xScale = d3.scaleLinear()
    .domain([1753, 2015])
    .range([0, w - margin.left - margin.right]);

var yScale = d3.scaleLinear()
    .domain([1, 13])
    .range([0, h - margin.top - margin.bottom]);


var colorScale = d3.scaleQuantile()
                    .domain([1, 12])
                    .range(colors);
       

// axis
svg.append("g")
   .attr("transform", "translate("+ margin.left + "," + (h - margin.bottom) + ")")
   .call(d3.axisBottom().scale(xScale).ticks(15));

  svg.selectAll(".monthLabel") 
          .data(months)
          .enter()
          .append("text")
          .text(function (d) { return d; })
          .attr("x", 0)
          .attr("y", function (d, i) { return (i+1) * gridSizeY; })
          .attr("class", "monthLabel");

// data
d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(error, json) {
  if (error) return console.warn(error);
  var base = json.baseTemperature;
  
// plot
svg.selectAll("rect")
   .data(json.monthlyVariance)
   .enter()
   .append("rect")
   .attr("x", (d) => xScale(d.year) + margin.left)
   .attr("y", (d) => yScale(d.month) + margin.top)
   .attr("width", gridSizeX)
   .attr("height", gridSizeY)
   .attr("fill", (d) => colorScale(base + d.variance))
   
 // tooltip
   .append("title")
   .attr("class", "tooltip")
   .text((d) =>  d.year + " - " + months[d.month] + "\n" +
                "Absolute: " + (base - d.variance) +"\n" +
                "Variance: " + d.variance + "\n" );
  
 });