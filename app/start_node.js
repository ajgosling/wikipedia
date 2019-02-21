function start() {
  let middleSection = document.getElementById("test");

  let startInput = document.getElementById("start-input");

  wtf.fetch(startInput.value, 'en', function(err, doc) {
    if (!doc) {
      console.log("inside");
      let text = document.createTextNode("invalid search");
      document.getElementById("error-message").appendChild(text);
    } else {
      doc.links().forEach(link => { 
        if (link.page) {
          var node = document.createElement("li")
          let text = document.createTextNode(link.page);
          node.appendChild(text);
          middleSection.appendChild(node);
        }
      });
    }
  });

  let svg = d3
    .select("#wikiverse")
    .append("svg")
    .attr("id", "svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 300 300")
    .classed("svg-content", true)
    .append("g")
    .attr("transform", "translate(0,0)");

  console.log(svg)

}

let startButton = document.getElementById("start");
startButton.onclick = start;
