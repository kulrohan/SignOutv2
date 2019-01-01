var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
const { Pool, Client} = require('pg');

app = express();
app.use(express.static("public"));  //serves all static files on the localhost
//use the public folder bc you do not want to serve the app.js and package.json static files to users
app.use(bodyParser.json());

const pool = new Pool({
  user: 'signout_admin',
  host: 'localhost',
  database: 'signoutdb',
  password: 'signout_admin',
  port: 5431,
});

//db information, establishes connection



function run_sql(sql){
  pool.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    if (res) { //get request
      console.log('The command ' + sql + ' was executed.');
      var output = res.rows; //res.rows is an array
      output = JSON.stringify(output[1]); //turn this into a for loop
      fs.writeFile('result.json', output, ()=>{})
    }
  });
}

run_sql('SELECT * FROM test')
var obj = JSON.parse(fs.readFileSync('result.json', 'utf8'));
console.log('My data: ' + obj.val);

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
});

app.get('/ajax', (req, res)=>{
  console.log('Get Request encountered');
  var sample_JSON = {'elmt1':'test', 'elmt2':'test2'};
  res.send(sample_JSON);
});

app.post('/ajax-post', (req, res)=>{
  console.log('post request encountered');
  JSON.stringify(req.body);
  var post_input = {};
  post_input.elmt1 = req.body.Example;
  run_sql("INSERT INTO test VALUES(2,'" + post_input.elmt1 + "')");
});

app.listen(8080, ()=>{
  console.log('SignOut is listening for web requests on TCP port 8080.');
});
