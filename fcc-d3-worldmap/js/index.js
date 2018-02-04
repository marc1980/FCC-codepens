var margin = {top: 20, right: 20, bottom: 20, left: 20},
            width = 800 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;


var path = d3.geoPath();

var svg = d3.select(".meteorites-map")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

 var map = svg.append("g")
      .attr("class", "countries");

var projection = d3.geoMercator()
                   .scale(100)
                  .translate( [width / 2, height / 2]);

var path = d3.geoPath().projection(projection);

d3.json("https://unpkg.com/world-atlas@1/world/110m.json", function( error, world ) 
{
    map.selectAll("path")
      .data(topojson.feature( world, world.objects.countries ).features )
    .enter().append("path")
      .attr("d", path);


    map.append("path")
        .attr( "class", "country-borders" )
        .attr("d", path(topojson.mesh( world, world.objects.countries, function( a, b) 
        {
            return a !== b;
        })));
});

d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json", function( error, meteorites ) 
{
console.log(meteorites);
  svg.append("g")
      .attr("class", "meteorites")
    .selectAll("circle")
      .data(meteorites.features )
    .enter().append("circle")
   .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
      .attr("r", function(d) { 
    if (d.properties.mass < 10000) return  2;
    else if (d.properties.mass >= 10000 && d.properties.mass < 100000) return  5;
    else if (d.properties.mass >= 100000 && d.properties.mass < 1000000) return  10;
    else if (d.properties.mass >= 100000 ) return  20;
 })
    .append("title")
      .text(function(d) {
        return "Name: " + d.properties.name + "\n" +
        "Mass: " + d.properties.mass + "\n" +
        "Latitude: " + d.properties.reclat + "\n" +
        "Longitude: " + d.properties.reclong + "\n" +
   //     "Year: " + d.properties.year.substr(0,4) + "\n" +
        "Fall: " + d.properties.fall + "\n" +
        "Class: " + d.properties.recclass + "\n" 
      });
  
});