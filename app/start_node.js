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
  let g = document.createTextNode("hello");
  middleSection.appendChild(g);
  wtf.fetch('On a Friday', 'en', function(err, doc) {
    var val = doc.infobox(0).get('current_members');
    val.links().map(link => middleSection.appendChild(link.page));
    //['Thom Yorke', 'Jonny Greenwood', 'Colin Greenwood'...]
  });
}

start();
