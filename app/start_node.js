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

  let svg = d3
    .select("#wikiverse")
    .append("svg")
    .attr("id", "svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 300 300")
    .classed("svg-content", true)
    .append("g")
    .attr("transform", "translate(0,0)");

  let simulation = d3
    .forceSimulation()
    .force("x", d3.forceX(100).strength(0.00005))
    .force("y", d3.forceY(100).strength(0.00005))
    .force("collide", d3.forceCollide(function (d) {
      return d.radius + 0.5;
    }))
    .alpha(100);


  let circles = svg.selectAll()
    .data(startNodeLinks)
    .enter().append("circle")
    .attr("class", "nodes")
    .attr("id", function(d) {
      return d.page;
    })

  console.log(circles);
}

let startButton = document.getElementById("begin");
startButton.onclick = start;
