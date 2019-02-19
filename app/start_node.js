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
}

let startButton = document.getElementById("start");
startButton.onclick = start;
