// import wikiLinks from './wiki_links';

async function start() {
  let middleSection = document.getElementById("middle");
  let startInput = document.getElementById("start-input").value;

  let doc = await wtf.fetch(startInput, "en");

  if (!doc) {
    middleSection.innerHTML = `Sorry, ${startInput} not found. Please check your spelling and try again!`;
  }

  // wtf.fetch(startInput.value, 'en', function(err, doc) {
  //   if (!doc) {
  //     console.log("inside");
  //     let text = document.createTextNode("invalid search");
  //     document.getElementById("error-message").appendChild(text);
  //   } else {
  //     doc.links().forEach(link => {
  //       if (link.page) {
  //         var node = document.createElement("li")
  //         let text = document.createTextNode(link.page);
  //         node.appendChild(text);
  //         middleSection.appendChild(node);
  //       }
  //     });
  //   }
  // });

  startNodeLinks = doc.links().map(link => ({
    // returns an object
    page: link.page,
    origin: startInput,
    // color: blue,
    x: 100,
    y: 100,
    clicked: false,
    radius: 4
  }));

  // set the dimensions and margins of the graph
  // var margin = { top: 10, right: 30, bottom: 30, left: 40 },
  //   width = 400 - margin.left - margin.right,
  //   height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  // var svg = d3.select("#my_dataviz")
  //   .append("svg")
  //   .attr("width", width + margin.left + margin.right)
  //   .attr("height", height + margin.top + margin.bottom)
  //   .append("g")
  //   .attr("transform",
  //     "translate(" + margin.left + "," + margin.top + ")");

  var margin = {top: 10, right: 30, bottom: 30, left: 40},
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

  let svg = d3
    .select("#wikiverse")
    .append("svg")
    .attr("id", "svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 300 300")
    .classed("svg-content", true)
    .append("g")
    .attr("transform", "translate(0,0)");
  // Initialize the links
  var link = svg
    .selectAll("line")
    .data(data.links)
    .enter()
    .append("line")
    .style("stroke", "#aaa")

  var node = svg
    .selectAll("circle")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("r", 20)
    .style("fill", "#69b3a2")
// Let's list the force we wanna apply on the network
var simulation = d3.forceSimulation(data.nodes)   // Force algorithm is applied to data.nodes
  .force("link", d3.forceLink()      // This force provides links between nodes
    .id(function (d) { return d.id; })    // This provide  the id of a node
    .links(data.links)       // and this the list of links
  )
  .force("charge", d3.forceManyBody().strength(-400))  // This adds repulsion between nodes. Play with the -400 for the repulsion strength
  .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
  .on("end", ticked);

// This function is run at each iteration of the force algorithm, updating the nodes position.
function ticked() {
  link
    .attr("x1", function (d) { return d.source.x; })
    .attr("y1", function (d) { return d.source.y; })
    .attr("x2", function (d) { return d.target.x; })
    .attr("y2", function (d) { return d.target.y; });

  node
    .attr("cx", function (d) { return d.x + 6; })
    .attr("cy", function (d) { return d.y - 6; });
}




  // let simulation = d3
  //   .forceSimulation()
  //   .force("x", d3.forceX(100).strength(0.00005))
  //   .force("y", d3.forceY(100).strength(0.00005))
  //   .force("collide", d3.forceCollide(function (d) {
  //     return d.radius + 0.5;
  //   }))
  //   .alpha(100);


  // let circles = svg.selectAll()
  //   .data(startNodeLinks)
  //   .enter().append("circle")
  //   .attr("class", "nodes")
  //   .attr("id", function(d) {
  //     return d.page;
  //   });

  // simulation.nodes(allNodes)
  //   .on('tick', ticked);

  // function ticked() {
  //   circles
  //     .attr("cx", function (d) {
  //       // debugger
  //       // simulation
  //       return (d.x = Math.max(d.radius, Math.min(300 - d.radius, d.x))); //Width
  //     })
  //     .attr("cy", function (d) {
  //       // simulation.alpha(.01)
  //       return (d.y = Math.max(d.radius, Math.min(300 - d.radius, d.y)));
  //     })
  // };
}

let startButton = document.getElementById("begin");
startButton.onclick = start;
