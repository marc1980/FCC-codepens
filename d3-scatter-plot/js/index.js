var margin = {top: 20, right: 20, bottom: 30, left: 50};
var w = 640; 
var h = 480;

//Create SVG element
var svg = d3.select(".d3ScatterPlot")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

// ranges
var xScale = d3.scaleTime()
 .domain([new Date(0), new Date(210000)])
    .range([w - margin.left - margin.right, 0]);

var yScale = d3.scaleLinear()
   .domain([1, 36])
    .range([0, h - margin.top - margin.bottom]);

// axis
svg.append("g")
   .attr("transform", "translate("+ margin.left + "," + (h - margin.bottom) + ")")
   .call(d3.axisBottom().scale(xScale).ticks(5).tickFormat(d3.timeFormat("%M:%S")));

svg.append("g")
   .attr("transform", "translate("+ margin.left + "," + (margin.top) + ")")
   .call(d3.axisLeft().scale(yScale));


// data
d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json", function(error, json) {
  if (error) return console.warn(error);
   var lowest = d3.min(json, function(d) { return d.Seconds; });
   json.forEach(function(d) {
      d.Seconds = d.Seconds - lowest;
   });

// plot
svg.selectAll("circle")
   .data(json)
   .enter()
   .append("circle")
   .attr("cx", (d) => xScale(new Date(d.Seconds * 1000)) + margin.left)
   .attr("cy", (d) => yScale(d.Place) + margin.top)
   .attr("r", 5)
   .style("fill", (d) => d.Doping ? "red" : "black")
 // tooltip
   .append("title")
   .attr("class", "tooltip")
   .text((d) => "Name: " + d.Name + "\n" +
                "Place: " + d.Place + "\n" +
                "Time: " + d.Time + "\n" +
                "Year: " + d.Year + "\n" +
                "Nationality: " + d.Nationality + "\n" +
                "Doping: " + d.Doping + "\n"
        );
  
   });