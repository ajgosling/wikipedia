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

  console.log(startNodeLinks);

  let svg = d3
    .select("#wikiverse")
    .append("svg")
    .attr("id", "svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 300 300")
    .classed("svg-content", true)
    .append("g")
    .attr("transform", "translate(0,0)");

  console.log(svg);

}

let startButton = document.getElementById("begin");
startButton.onclick = start;
