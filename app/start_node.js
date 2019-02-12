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
console.log(wtf.fetch('2018–19_Toronto_Raptors_season').then(doc => doc.section('Roster').json()))
