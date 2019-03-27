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

    const update = 'UPDATE trainer ';
    const set = 'SET name = "' + name + '", age = ' + age + ', gender = "' + gender + '", hometown = "' + hometown + '" ';
    const where = 'WHERE id = ' + userId + ';';
    const query = update + set + where;

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/pokemon', function(req, res) {
    const query = 'SELECT * FROM Pokemon';
    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/pokemon/:type', function(req, res) {
    const type = req.params.type;

    const query = 'SELECT * FROM Pokemon WHERE type = "' + type + '";';
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

  app.get('/pokemonTypes', function(req, res) {
    const query = 'SELECT type FROM Pokemon';
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
    const select = 'SELECT g.gymName, g.badgeName, g.badgeImage, g.townName, t.name ';
    const from = 'FROM Gym_LocatedIn_Town g, GymLeader_of_Gym gl, Trainer t '
    const where = 'WHERE g.gymName = gl.gymName AND gl.trainerID = t.id;';
    const query = select + from + where;

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/encountered/:userId', function(req, res) {
    const userId = req.params.userId;

    const select = 'SELECT pokemonName ';
    const from = 'FROM Trainer_Encounters_Pokemon '
    const where = 'WHERE trainerID = ' + userId + ';';
    const query = select + from + where;

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/encountered/:userId/:type', function(req, res) {
    const userId = req.params.userId;
    const type = req.params.type;

    const select = 'SELECT e.pokemonName ';
    const from = 'FROM Trainer_Encounters_Pokemon e, Pokemon p '
    const where = 'WHERE e.trainerID = ' + userId + ' AND e.pokemonName = p.name AND p.type = "' + type + '";';
    const query = select + from + where;

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });
};
