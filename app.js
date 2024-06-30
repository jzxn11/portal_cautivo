const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configuración de body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tu_base_de_datos'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL.');
});

// Ruta para recibir datos de meraki.js
app.post('/submit', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const query = 'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)';
  db.query(query, [name, email], (err, result) => {
    if (err) throw err;
    res.send('Datos recibidos e insertados en la base de datos.');
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
