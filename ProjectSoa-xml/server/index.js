const mysql = require('mysql2');
const mybatisMapper = require('mybatis-mapper');
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

const url = "https://www.npmjs.com/package/mybatis-mapper"
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


// create the myBatisMapper from xml file
mybatisMapper.createMapper([ './products.xml' ]);

// SQL Parameters
var param = {
    category : 'apple',
    price : 100
}

function OBJtoXML(obj) {
  var xml = ""
  for (var prop in obj) {
    xml += obj[prop] instanceof Array ? '' : "<" + prop + "> \n";
    if (obj[prop] instanceof Array) {
      for (var array in obj[prop]) {
        xml += "<" + prop + "> \n";
        xml += OBJtoXML(new Object(obj[prop][array]));
        xml += "</" + prop + "> \n";
      }
    } else if (typeof obj[prop] == "object") {
      xml += OBJtoXML(new Object(obj[prop]));
    } else {
      xml += "   " + obj[prop] + "\n";
    }
    xml += obj[prop] instanceof Array ? '' : "</" + prop + "> \n";
  }
  var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
  return xml
}

// Get SQL Statement
var format = {language: 'sql', indent: '  '};

  
app.get('/', function (req, res) {
    //console.log("here")
    var query = mybatisMapper.getStatement('product', 'getnotsale', param, format);

      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      connection.query(query, function(err, results, fields) {
        localStorage.setItem("data.xml",OBJtoXML(results))
        res.send(results)
     })
});
  

  app.get('/getmodels', function (req, res) {
      var query2 = mybatisMapper.getStatement('product', 'getModels', param, format);

      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    connection.query(query2, function(err, results, fields) {
      res.send(results)
    })
  }); 


// Get SQL Statement


app.post('/save', function (req, res) {
  var param = {
    products : [
      {
        nameProduct : req.body.name,
        model : req.body.model,
        price : req.body.price,
        image: req.body.image,
        sale: req.body.sale,
        description: req.body.description,
        create_time: Date.now(),
        is: false        
      }
    ]
  }
  console.log(req.body)
  var query3 = mybatisMapper.getStatement('save', 'testInsertMulti', param, {language: 'sql', indent: '  '});
  connection.query(query3, function(err, results, fields) {
    if (err) console.log(err)
    res.send(results)    
  }); 
})





app.listen(3000, function () {
  console.log('Project SOA XML Server is running ...')
})
