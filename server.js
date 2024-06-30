// Node JS development web server

var express = require("express");
var app = express();

// Express Midleware  - BodyParser
var bodyParser = require('body-parser');

const mysql = require('mysql2');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// serve static public site files
app.use(express.static('public'));

const db = mysql.createConnection({
  host: '127.0.0.1:3306',
  user: 'root',
  password: 'telCatMiau77698*',
  database: 'captive_portal'
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err.stack);
    res.send('Data error');
    return;
  }
  console.log('Connected to database.');
  res.send('conectado');
});

/* serves main page */
app.get("/", function(req, res) {
   res.sendfile('public/index.html')
});

app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO users (data.name, data.email) VALUES (?, ?)';

  db.query(query, [name, email], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err.stack);
      res.status(500).send('Error inserting data');
      return;
    }
    res.send('Data submitted successfully!');
  });
});



var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
