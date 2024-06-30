// Node JS development web server

var express = require("express");
var app = express();

// Express Midleware  - BodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// database
const mysql = require('mysql');
const path = require('path');
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'telCatMiau77698*',
  database: 'captive_portal',
  port: 3306
});
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL.');
});

// serve static public site files
app.use(express.static('public'));

/* serves main page */
app.get("/", function(req, res) {
   res.sendfile('public/index.html')
});

// Ruta para recibir datos de meraki.js
app.post('/submit', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const query = 'INSERT INTO usuarios (name, email) VALUES (?, ?)';
  db.query(query, [name, email], (err, result) => {
    if (err) throw err;
    res.send('Datos recibidos e insertados en la base de datos.');
  });
});

// Servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
