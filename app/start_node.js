// async function startMiserables() {
//   var svg = d3.select(".legit");
//   var width = +svg.attr("width");
//   var height = +svg.attr("height");

//   // color is a function that returns a hexadecimal color when invoked
//   var color = d3.scaleOrdinal(d3.schemeCategory20);

//   var simulation = d3.forceSimulation()
//       .force("link", d3.forceLink().id(function (d) { return d.id; }))
//       .force("charge", d3.forceManyBody())
//       .force("center", d3.forceCenter(width / 2, height / 2))

//   d3.json("miserables.json", function (error, graph) {
//       if (error) throw error;

//       var link = svg.append("g")
//           .attr("class", "links")
//           .selectAll("line")
//           .data(graph.links)
//           .enter().append("line")
//           .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

//       var node = svg.append("g")
//           .attr("class", "nodes")
//           .selectAll("g")
//           .data(graph.nodes)
//           .enter().append("g");

//       var circles = node.append("circle")
//           .attr("r", 5)
//           .attr("fill", function (d) { return color(d.group); })
//           .call(d3.drag()
//               .on("start", dragstarted)
//               .on("drag", dragged)
//               .on("end", dragended));

//       var lables = node.append("text")
//           .text(function (d) {
//               return d.id;
//           })
//           .attr('x', 6)
//           .attr('y', 3);

//       node.append("title")
//           .text(function (d) { return d.id; });

//       simulation
//           .nodes(graph.nodes)
//           .on("tick", ticked);

//       simulation.force("link")
//           .links(graph.links);

//       function ticked() {
//           link
//               .attr("x1", function (d) { return d.source.x; })
//               .attr("y1", function (d) { return d.source.y; })
//               .attr("x2", function (d) { return d.target.x; })
//               .attr("y2", function (d) { return d.target.y; });

//           node
//               .attr("transform", function (d) {
//                   return "translate(" + d.x + "," + d.y + ")";
//               });
//       }
//   });

//   function dragstarted(d) {
//       if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//       d.fx = d.x;
//       d.fy = d.y;
//   }

//   function dragged(d) {
//       d.fx = d3.event.x;
//       d.fy = d3.event.y;
//   }

//   function dragended(d) {
//       if (!d3.event.active) simulation.alphaTarget(0);
//       d.fx = null;
//       d.fy = null;
//   }

// }






const links = [];
let chain_length = 1;

async function startWiki(nodes = []) {

  let startName = document.querySelector('input').value;
  let doc = await wtf.fetch(startName, "en");


  var svg = d3.select("svg");
  var width = +svg.attr("width");
  var height = +svg.attr("height");

  // color is a function that returns a hexadecimal color when invoked
  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var myForceLink = d3
    .forceLink().id(function (d) {
      return d.id;
    })
    .distance(function (d) {
      return 100;
    })
    .strength(0.1);

  var simulation = d3.forceSimulation()
    .force("link", myForceLink)
    .force("charge", d3.forceManyBody(-40))
    .force("center", d3.forceCenter(width / 2, height / 2))

  const startPageObject = {
    "id": startName,
    group: 1
  };


  if (nodes.length === 0) {
    nodes.push(startPageObject);
  }




  // // iterate through linkNames and make key of x and key of y

  doc.links().forEach((link) => {
    nodes.push({
      "id": link.page,
      "group": chain_length
    });

    links.push({
      "source": startName,
      "target": link.page,
      "value": 2
    });
  });

  var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

  var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(nodes)
    .enter().append("g");

  var circles = node.append("circle")
    .attr("r", 5)
    .attr("fill", function (d) { return color(d.group); })
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  var lables = node.append("text")
    .text(function (d) {
      return d.id;
    })
    .attr('x', 6)
    .attr('y', 3);

  node.append("title")
    .text(function (d) { return d.id; });

  simulation
    .nodes(nodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(links);

  restart();
  function ticked() {
    link
      .attr("x1", function (d) { return d.source.x; })
      .attr("y1", function (d) { return d.source.y; })
      .attr("x2", function (d) { return d.target.x; })
      .attr("y2", function (d) { return d.target.y; });

    node
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
  }

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
  function restart() {

    // nodes.push({id: "hiiiiiiiiii", group: 2});
    // Apply the general update pattern to the nodes.
    node = node.data(nodes, function (d) { return d.id; });
    node.exit().remove();
    node = node.enter().append("circle").attr("fill", function (d) { return color(d.id); }).attr("r", 8).merge(node);

    // Apply the general update pattern to the links.
    link = link.data(links, function (d) { return d.source.id + "-" + d.target.id; });
    link.exit().remove();
    link = link.enter().append("line").merge(link);

    // Update and restart the simulation.
    simulation.nodes(nodes);
    simulation.force("link").links(links);
    simulation.alpha(1).restart();
  }
}

document.querySelector('input').value = "Melee";

let startButton = document.getElementById("begin");

startButton.onclick = startWiki;

document.addEventListener('keydown', e => {
  if (e.code === "Enter") {
    startWiki();
  }
});

startWiki();