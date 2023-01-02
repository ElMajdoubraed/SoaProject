const mysql = require('mysql2');
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(cors())
app.options('*', cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test',
  password:'devpass'
});

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./data');
}

// Get SQL Statement
var format = {language: 'sql', indent: '  '};

  
app.get('/', function (req, res) {
      query = `SELECT name, model, price, sale, image, description FROM products WHERE isModel = 0`  
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      connection.query(query, function(err, results, fields) {
        localStorage.setItem("data.json",results)
        res.send(results)
     })
});
  

  app.get('/getmodels', function (req, res) {
      var query2 = `SELECT
      name,
      model,
      price,
      image,
      description
    FROM
      products 
    WHERE
      isModel = 1`

      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    connection.query(query2, function(err, results, fields) {
      res.send(results)
    })
  }); 


// Get SQL Statement


app.post('/save', function (req, res) {
    
connection.query('INSERT INTO products (name, model, price, image, sale, description, isModel) VALUES  (?,?,?,?,?,?,?)', 
    [req.body.name, req.body.model, req.body.price, req.body.image, req.body.sale, req.body.description, false],(error, results) => {
     if (error) {
        console.log(error)
        res.json({ error: error });
    }
     else {
        console.log(results)
        res.send(results)
        localStorage.setItem("lastSave.json",JSON.stringify(results))
        };
    });
})




app.listen(3000, function () {
    console.log('Project SOA Json Server is running ...')
})
  