// Node JS development web server

var express = require("express");
var app = express();

// Express Middleware - BodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Database
var mysql = require('mysql');
var path = require('path');
var db = mysql.createConnection({
  host: '192.168.1.11',
  user: 'root',
  password: 'telCatMiau77698*',
  database: 'captive_portal',
  port: 3306
});
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL.');
});

// Serve static public site files
app.use(express.static('public'));

/* serves main page */
app.get("/", function(req, res) {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para recibir datos de meraki.js
app.post('/submit', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;
  const gender = req.body.gender;
  const account = req.body.account;

  const query = 'INSERT INTO users2 (name, email, age, gender, account) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, age, gender, account], (err, result) => {
    if (err) throw err;
    console.log('Cdatos');
    res.send('Datos recibidos e insertados en la base de datos.');
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

