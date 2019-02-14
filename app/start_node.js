async function start() {
  let middleSection = document.getElementById("test");

  let startInput = document.getElementById("start-input");

  wtf.fetch(startInput.value, 'en', function(err, doc) {
    if (err) {
      document.getElementById("error-message").innerHTML("i'm an error");
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
