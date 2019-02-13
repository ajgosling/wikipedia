// wtf.fetch(['Royal Cinema', 'Aldous Huxley'], 'en', {
//   'Api-User-Agent': 'spencermountain@gmail.com'
// }).then((docList) => {
//   // let infoboxes = docList.map(doc => {
//   //   return {
//   //     title: doc.title(),
//   //     infobox: doc.infoboxes(0)
//   //   }
//   // });
//   console.log("i'm here")
//   document.getElementById("mytext").innerHTML = "it worked!"
// });
async function start() {
  let middleSection = document.getElementById("test")
  var h = document.createElement("li");
  let g = document.createTextNode("first node");
  h.appendChild(g);
  middleSection.appendChild(h);
  // var node;
  wtf.fetch('On a Friday', 'en', function(err, doc) {
    var val = doc.infobox(0).get('current_members');
    val.links().forEach(link => { 
      var node = document.createElement("li")
      let text = document.createTextNode(link.page);
      node.appendChild(text);
      middleSection.appendChild(node);
      // middleSection.appendChild(document.createTextNode("hello"));
    });
    //['Thom Yorke', 'Jonny Greenwood', 'Colin Greenwood'...]
    console.log(val)
  });
}

start();
