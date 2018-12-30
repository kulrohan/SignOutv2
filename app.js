var express = require('express');

app = express();
app.use(express.static("public"));  //serves all static files on the localhost
//use the public folder bc you do not want to serve the app.js and package.json static files to users

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
});

app.get('/ajax', (req, res)=>{
  console.log('Get Request encountered');
  var sample_JSON = {'elmt1':'test', 'elmt2':'test2'};
  res.send(sample_JSON);
});

app.listen(8080, ()=>{
  console.log('SignOut is listening for web requests on TCP port 8080.');
});
