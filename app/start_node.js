async function start() {
  let middleSection = document.getElementById("test")

  wtf.fetch('Abraham Lincoln', 'en', function(err, doc) {
    doc.links().forEach(link => { 
      if (link.page) {
        var node = document.createElement("li")
        let text = document.createTextNode(link.page);
        node.appendChild(text);
        middleSection.appendChild(node);
      }
    });
  });
}

let startButton = document.getElementById("start");
startButton.onclick = start;
