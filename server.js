// Node JS development web server

var express = require("express");
var app = express();

// Express Midleware  - BodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// serve static public site files
app.use(express.static('public'));

// Database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE users (name TEXT, email TEXT)");
});

/* serves main page */
app.get("/", function(req, res) {
   res.sendfile('public/index.html')
});

// Endpoint to receive data
app.post('/register', (req, res) => {
    const { name, email } = req.body;
    if (name && email) {
        db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err) => {
            if (err) {
                res.status(500).send("Error saving data");
            } else {
                res.send("Data saved successfully");
            }
        });
    } else {
        res.status(400).send("Name and Email are required");
    }
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
