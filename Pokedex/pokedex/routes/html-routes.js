const mysql = require('mysql');

module.exports = function(app, connection) {
  // Example of a mysql query
  app.get('/towns', function(req, res) {
    connection.query('SELECT * FROM town', function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });
};
