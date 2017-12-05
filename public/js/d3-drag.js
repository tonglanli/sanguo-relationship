var width = 960,
height = 500;

var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height);

d3.json("graph.json", function(error, graph) {
if (error) throw error;

graph.links.forEach(function(d) {
d.source = graph.nodes[d.source];
d.target = graph.nodes[d.target];
});

var link = svg.append("g")
  .attr("class", "link")
.selectAll("line")
.data(graph.links)
.enter().append("line")
  .attr("x1", function(d) { return d.source.x; })
  .attr("y1", function(d) { return d.source.y; })
  .attr("x2", function(d) { return d.target.x; })
  .attr("y2", function(d) { return d.target.y; });

var node = svg.append("g")
  .attr("class", "node")
.selectAll("circle")
.data(graph.nodes)
.enter().append("circle")
  .attr("r", 4)
  .attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; })
  .call(d3.drag().on("drag", dragged));

function dragged(d) {
d.x = d3.event.x, d.y = d3.event.y;
d3.select(this).attr("cx", d.x).attr("cy", d.y);
link.filter(function(l) { return l.source === d; }).attr("x1", d.x).attr("y1", d.y);
link.filter(function(l) { return l.target === d; }).attr("x2", d.x).attr("y2", d.y);
}
});