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
    const select = 'SELECT pcb.id, p.name, p.type, p.image, mb.moveName, mb.powerPoint ';
    const from = 'FROM pokemon p, pokemon_CapturedBy pcb, PokemonLearnsMoveA ma, PokemonLearnsMoveB mb ';
    const where = 'WHERE pcb.name = p.name AND pcb.capturedBy = ' + userId + ' AND ma.pokemonID = pcb.id AND mb.moveName = ma.moveName;';
    const query = select + from + where;

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/trainers', function(req, res) {
    const query = 'SELECT * FROM trainer;';

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/gyms', function(req, res) {
    const querySel = 'SELECT g.gymName, g.badgeName, g.badgeImage, g.townName, t.name ';
    const queryFrom = 'FROM Gym_LocatedIn_Town g, GymLeader_of_Gym gl, Trainer t '
    const queryWhere = 'WHERE g.gymName = gl.gymName AND gl.trainerID = t.id;';

    connection.query(querySel + queryFrom + queryWhere, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });
};
