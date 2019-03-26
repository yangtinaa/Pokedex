const express = require('express');
const mysql = require('mysql')
const path = require("path");

const PORT = process.env.PORT || 8080;
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Evangeline129/',
  database: 'Pokedex',
})

connection.connect(function(err) {
  err ? console.log(err) : console.log(connection);
})

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "src")));

require('./routes/html-routes.js')(app, connection);

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log('App running on port ${PORT}')
});
