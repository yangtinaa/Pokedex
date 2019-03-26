const mysql = require('mysql');

module.exports = function(app, connection) {
  app.get('/user/:userId', function(req, res) {
    const userId = req.params.userId;
    const query = 'SELECT * FROM trainer WHERE id = ' + userId;

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });
};
