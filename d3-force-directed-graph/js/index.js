var margin = {top: 20, right: 20, bottom: 30, left: 50};
var w = window.innerWidth; 
var h = window.innerHeight;

var svg = d3.select(".graph")
            .append("svg")
    //        .attr("width", w)
    //        .attr("height", h);

//svg.append("div").attr("class", "flag flag-us").style("left", 0).style("top", 0);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.index; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(w / 2, h / 2));

d3.json("https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json", function(error, graph) {
  if (error) throw error;

  var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line");
  
  var node = d3.select("#flags") 
      .selectAll(".flag")
      .data(graph.nodes)
      .enter().append("div")
      .attr("class", function(d) { return "flag flag-" + d.code})
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
  

  node.append("title")
      .text(function(d) { return d.country; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .style("left", function(d) { return d.x + "px"; })
        .style("top", function(d) { return d.y + "px"; });
  }
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}