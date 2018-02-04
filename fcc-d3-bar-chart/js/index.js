var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y-%m-%d");

var x = d3.scaleTime()
    .domain([new Date(1947, 0, 1), new Date(2016, 1, 1)])
    .range([0, 580]);

var y = d3.scaleLinear()
    .domain([0, 19000])
    .range([430, 0]);

d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(error, json) {
  if (error) return console.warn(error);

     g.selectAll("rect")
      .data(json.data)
      .enter()
      .append("rect")
      .attr("x", (d) => { return x(parseTime(d[0])); }) 
      .attr("y", (d) => { return  y(d[1]); })
      .attr("width", width / 275)
      .attr("height", (d) => { return height - y(d[1]); })
      .append("title")
      .text((d) => { return d[0] + " - " + d[1] });
  
  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  
  g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("GDP (x $1.000.000.000) - USA");
 
});