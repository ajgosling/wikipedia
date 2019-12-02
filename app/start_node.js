async function startMiserables() {
  var svg = d3.select(".legit");
  var width = +svg.attr("width");
  var height = +svg.attr("height");

  // color is a function that returns a hexadecimal color when invoked
  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function (d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

  d3.json("miserables.json", function (error, graph) {
      if (error) throw error;

      console.log(graph);
      var link = svg.append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(graph.links)
          .enter().append("line")
          .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

      var node = svg.append("g")
          .attr("class", "nodes")
          .selectAll("g")
          .data(graph.nodes)
          .enter().append("g")

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
          .nodes(graph.nodes)
          .on("tick", ticked);

      simulation.force("link")
          .links(graph.links);

      function ticked() {
          link
              .attr("x1", function (d) { return d.source.x; })
              .attr("y1", function (d) { return d.source.y; })
              .attr("x2", function (d) { return d.target.x; })
              .attr("y2", function (d) { return d.target.y; });

          node
              .attr("transform", function (d) {
                  return "translate(" + d.x + "," + d.y + ")";
              })
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

}














async function startWiki() {

  let startName = document.querySelector('input').value;
  let doc = await wtf.fetch(startName, "en");
  var middleText = document.querySelector("#middle");


  var svg = d3.select("svg");
  var width = +svg.attr("width");
  var height = +svg.attr("height");

  // color is a function that returns a hexadecimal color when invoked
  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) {
      return d.id;
     }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

  d3.json("wiki.json", function (error, graph) {
    if (error) throw error;

    // const startPageObject = {
    //   "id": startName,
    //   group: 2
    // }

    // //object
    // const linkNames = [];

    // const wikiLinks = [];



    // iterate through linkNames and make key of x and key of y

    // doc.links().forEach((link, idx) => {
    //   linkNames.push({
    //     "id": link.page,
    //     "group": 2
    //   })
    //   wikiLinks.push({
    //     "source": startName,
    //     "target": link.page,
    //     "value": 2
    //   })
    // })




    var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
      .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

    var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(graph.nodes)
      .enter().append("g")

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
      .nodes(graph.nodes)
      .on("tick", ticked);

    simulation.force("link")
      .links(graph.links);

    function ticked() {
      link
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

      node
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
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
}

document.querySelector('input').value = "Melee";

let startButton = document.getElementById("begin");

// startButton.onclick = start;

document.addEventListener('keydown', e => {
  if (e.code === "Enter") {
    start();
  }
});

startMiserables();
startWiki();



