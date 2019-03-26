const mysql = require('mysql');

module.exports = function(app, connection) {
  app.get('/user/:userId', function(req, res) {
    const userId = req.params.userId;
    const query = 'SELECT * FROM trainer WHERE id = ' + userId;

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.post('/user/:userId', function(req, res) {
    const userId = req.params.userId;
    const body = req.body;
    const {name, age, hometown} = body;
    const gender = body.gender == 'unknown' ? null : body.gender;

    const query = 'UPDATE trainer SET name = "' + name + '", age = ' + age + ', gender = "' + gender + '", hometown = "' + hometown + '" WHERE id = ' + userId + ';';

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/pokemon/:userId', function(req, res) {
    const userId = req.params.userId;
    const query = 'SELECT pcb.id, p.name, p.type, p.image FROM pokemon p, pokemon_CapturedBy pcb WHERE pcb.name = p.name AND pcb.capturedBy = ' + userId;

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });
};
