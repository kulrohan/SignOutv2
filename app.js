var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
const { Pool, Client} = require('pg');

app = express();
app.use(express.static("public"));  //serves all static files on the localhost

//use the public folder bc you do not want to serve the app.js and package.json static files to users
app.use(bodyParser.json());
// fs.truncate('result.json', 0, function(){});

var login_id = null;
var maxen = null;


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
      console.log(output); //or,
      output = JSON.stringify(output[0]);//THE OUTPUT VALUE IS TEMPORARILY SET TO ZERO FOR POST time REQUEST. CHANGE THIS INTO A FOR LOOP. //turn this into a for loop
      fs.writeFile('result.json', output, ()=>{})
    }
  });
}

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/public/views/intro.html');
});

app.get('/login', (req, res)=>{
  res.sendFile(__dirname + '/public/views/login.html');
});

app.get('/login/authenticate', (req, res)=>{
  if (req){
    var u_input = req.query.username;
    var p_input = req.query.pwd;
    //authenticate
    pool.query("SELECT id FROM users WHERE (username='" + u_input + "') AND (password='" + p_input + "')", (err, response) => {
      //if the username and password is not correct, the select statement will
      //return an empty array []. Err will never run unless the sql is wrong
      //recognize [] as incorrect login information. if incorrect uname+pwd, output.id will throw cannot read property 'id' of undefined
      if (err) {
        console.log(err);
      }
      if (response) {
        var output = response.rows[0]; //res.rows is an array
        try{
          var id_number = output.id; //NOTE: admin's id number is NULL so id_number = null for admin
          login_id = id_number;
          console.log('Logged in as ' + id_number);
          if (id_number == null){
            res.json({'id':'admin'}) // don't send ok. send admin if admin and id if student
          }
          else{
            res.json({'id':login_id});
          }

        }
        catch(error){
          console.log('incorrect credentials');
          res.json({'id':'ic'}) //ic = incorrect credentials
        }

      }
    });
  }

});

app.get('/get-id', (req, res)=>{
  res.json({'id':login_id});
});

app.get('/student', (req, res)=>{
  res.sendFile(__dirname + '/public/views/student.html');
});

app.get('/admin', (req, res)=>{
  res.sendFile(__dirname + '/public/views/admin.html')
});

app.get('/log', (req, res)=>{
  res.sendFile(__dirname + '/public/views/log.html')
});

app.get('/analytics', (req, res)=>{
  res.sendFile(__dirname + '/public/views/analytics.html')
});

app.get('/record', (req, res)=>{
  res.sendFile(__dirname + '/public/views/record.html')
});

app.get('/workspace', (req, res)=>{
  res.sendFile(__dirname + '/public/views/workspace.html')
});

// app.get('/login/authenticate', (req, res)=>{
//   console.log('authenticating');
//   var username = req.query.username;
//   var pwd = req.query.pwd;
//   //these are given in the url as queries: /authenticate?username=sample&pwd=sample. Use req to extract
//   console.log(username + ' ' + pwd);
// });

app.get('/log/ajax-get', (req, res)=>{
  console.log('Get Request encountered');

  var promise = new Promise(function(){ //promise to do something later --> better version of a callback (cannot have multiple callbacks for one function)
    pool.query('SELECT * FROM records', (err, response)=>{
      if (err){
        console.log(err)
      }
      if (response){
        var output = response.rows;
        res.send(output);
      }
    })
  });
});

app.get('/max-entry', (req, res)=>{

    console.log('max entry number get request encountered');
    pool.query('SELECT MAX(entry) FROM records;', (err, response)=>{
      if (err){
        console.log(err);
      }
      if (response){
        res.json(response.rows[0]);
      }
    })

});

function get_maxen(){
  pool.query('SELECT MAX(entry) FROM records;', (err, response)=>{
    if (err){
      console.log(err);
    }
    if (response){
      maxen = response.rows[0]
    }
  });
}

app.get('/location-data', (req, res)=>{
  pool.query()
});

// app.post('/ajax-post', (req, res)=>{
//   console.log('post request encountered');
//   pool.query('SELECT NOW()', (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//     if (res) {
//       var output = res.rows;
//       output = JSON.stringify(output[0]);
//       fs.writeFile('result.json', output, ()=>{
//         var dt_obj = JSON.parse(fs.readFileSync('result.json', 'utf8'));
//         var dt = dt_obj.now
//         var dt_obj = JSON.parse(fs.readFileSync('result.json', 'utf8'));
//         var dt = dt_obj.now
//         JSON.stringify(req.body);
//         run_sql("INSERT INTO records VALUES(" + req.body.Entry + "," + req.body.id + ",'" + req.body.location + "','" + dt + "')");
//       });
//     }
//   });
// });

app.get('/ajax-post', (req, response)=>{
  pool.query('SELECT NOW()', (err, res) => { //replace with python script for dt
    if (err) {
      console.log(err);
    }
    if (res) {
      var output = res.rows;
      pool.query("INSERT INTO records VALUES(" + req.query.entry + "," + req.query.id + ",'" + req.query.loc + "','" + output[0].now + "')", (err)=>{
        if (err){console.log(err);}
      });
    }
  });

});

app.post('/student_record', (req, response)=>{
  console.log(req.query); //location
  console.log(login_id); //id
  pool.query('SELECT NOW()', (err, res) => { //time
    if (res) {
      var output = res.rows;
      pool.query('SELECT MAX(entry) FROM records;', (err, response)=>{
        if (err){
          console.log(err);
        }
        if (response){
          console.log(response.rows[0].max + 1); //this is new entry val
          pool.query("INSERT INTO records VALUES(" + (response.rows[0].max + 1) + "," + login_id + ",'" + req.query.loc + "','" + output[0].now + "')", (err)=>{
            if (err){console.log(err);}
          });
        }
      });

    }
  });
});


app.listen(8080, ()=>{
  console.log('SignOut is listening for web requests on TCP port 8080.');
});
