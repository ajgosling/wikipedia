// import wikiLinks from './wiki_links';
app.UseCors(builder => builder
  .AllowAnyOrigin()
  .AllowAnyMethod()
  .AllowAnyHeader()

async function start() {
  let middleSection = document.getElementById("middle");
  let startInput = document.getElementById("start-input").value;

  let doc = await wtf.fetch(startInput, "en");

  if (!doc) {
    middleSection.innerHTML = `Sorry, ${startInput} not found. Please check your spelling and try again!`;
  }

  // data = d3.json("https://gist.githubusercontent.com/mbostock/4062045/raw/5916d145c8c048a6e3086915a6be464467391c62/miserables.json");
  d3.json("/data/employees.json").then(function(data) {
    console.log(data[0]);
  });
  // let obj = JSON.parse(data);
  // console.log(data);


  // let chart = {
  //   const links = data.links.map(d => Object.create(d));
  //   const nodes = data.nodes.map(d => Object.create(d));

  //   const simulation = d3.forceSimulation(nodes)
  //     .force("link", d3.forceLink(links).id(d => d.id))
  //     .force("charge", d3.forceManyBody())
  //     .force("center", d3.forceCenter(width / 2, height / 2));

  //   const svg = d3.create("svg")
  //     .attr("viewBox", [0, 0, width, height]);

  //   const link = svg.append("g")
  //     .attr("stroke", "#999")
  //     .attr("stroke-opacity", 0.6)
  //     .selectAll("line")
  //     .data(links)
  //     .join("line")
  //     .attr("stroke-width", d => Math.sqrt(d.value));

  //   const node = svg.append("g")
  //     .attr("stroke", "#fff")
  //     .attr("stroke-width", 1.5)
  //     .selectAll("circle")
  //     .data(nodes)
  //     .join("circle")
  //     .attr("r", 5)
  //     .attr("fill", color)
  //     .call(drag(simulation));

  //   node.append("title")
  //     .text(d => d.id);

  //   simulation.on("tick", () => {
  //     link
  //       .attr("x1", d => d.source.x)
  //       .attr("y1", d => d.source.y)
  //       .attr("x2", d => d.target.x)
  //       .attr("y2", d => d.target.y);

  //     node
  //       .attr("cx", d => d.x)
  //       .attr("cy", d => d.y);
  //   });

  //   invalidation.then(() => simulation.stop());

  //   return svg.node();
  // }
  // console.log(chart);

}


document.querySelector('input').value = "Gold";

let startButton = document.getElementById("begin");

startButton.onclick = start;

document.addEventListener('keydown', e => {
  if (e.code === "Enter") {
    start();
  }
});

startButton.click();