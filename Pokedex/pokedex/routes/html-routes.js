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
    const {name, hometown, gender} = body;
    const age = body.age ? body.age : 'NULL';

    const update = 'UPDATE trainer ';
    const set1 = 'SET name = "' + name + '"' + ', age = ' + age + ', hometown = "' + hometown + '"';
    const set2 = gender ? ', gender = "' + gender + '" ' : ', gender = NULL ';
    const where = 'WHERE id = ' + userId + ';';
    const query = update + set1 + set2 + where;

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

  app.get('/pokemonTypeOnly', function(req, res) {
    const query = 'SELECT type, name FROM Pokemon';
    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/pokemonImageOnly', function(req, res) {
    const query = 'SELECT image, name FROM Pokemon';
    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/pokemonNameOnly', function(req, res) {
    const query = 'SELECT name FROM Pokemon';
    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/pokemon/filter/:type', function(req, res) {
    const type = req.params.type;

    const query = 'SELECT * FROM Pokemon WHERE type = "' + type + '";';
    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/pokemonTypeOnly/filter/:type', function(req, res) {
    const type = req.params.type;

    const query = 'SELECT type, name FROM Pokemon WHERE type = "' + type + '";';
    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/pokemonImageOnly/filter/:type', function(req, res) {
    const type = req.params.type;

    const query = 'SELECT image, name FROM Pokemon WHERE type = "' + type + '";';
    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/pokemonNameOnly/filter/:type', function(req, res) {
    const type = req.params.type;

    const query = 'SELECT name FROM Pokemon WHERE type = "' + type + '";';
    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/pokemonCount', function(req, res) {
    const userId = req.params.userId;

    const select = 'SELECT t.id, COUNT(*) ';
    const from = 'FROM Trainer t ';
    const join = 'LEFT OUTER JOIN Pokemon_CapturedBy p ON t.id = p.capturedBy ';
    const group = 'GROUP BY t.id;'
    const query = select + from + join + group;

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/pokemonCount/:userId', function(req, res) {
    const userId = req.params.userId;

    const select = 'SELECT COUNT(*) FROM Pokemon_CapturedBy ';
    const where = 'WHERE capturedBy = ' + userId;
    const query = select + where;

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/pokemon/:userId', function(req, res) {
    const userId = req.params.userId;

    const select = 'SELECT pcb.id, p.name, p.type, p.image, mb.moveName, mb.powerPoint ';
    const from = 'FROM pokemon p, pokemon_CapturedBy pcb ';
    const join1 = 'LEFT JOIN pokemonLearnsMoveA ma ON ma.pokemonid = pcb.id '
    const join2 = 'LEFT JOIN pokemonLearnsMoveB mb ON mb.movename = ma.movename '
    const where = 'WHERE pcb.name = p.name AND pcb.capturedBy = ' + userId + ';';
    const query = select + from + join1 + join2 + where;

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
    const select = 'SELECT * FROM trainer t ';
    const join = 'LEFT OUTER JOIN GymLeader_of_Gym g ON t.id = g.trainerID;'
    const query = select + join;

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/towns', function(req, res) {
    const query = 'SELECT name FROM town;';

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

  app.get('/loginInfo/:username/:password', function(req, res) {
    const username = req.params.username;
    const password = req.params.password;

    const select = 'SELECT l.id ';
    const from = 'FROM Login_Information l ';
    const where = 'WHERE l.username = "' + username + '" AND l.password = "' + password + '";';
    const query = select + from + where;

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.post('/encounter/:userId/:pokemonName', function(req, res) {
    const userId = req.params.userId;
    const pokemonName = req.params.pokemonName;

    const insert = 'INSERT INTO Trainer_Encounters_Pokemon(pokemonName, trainerID) ';
    const values = 'VALUES ("' + pokemonName + '", ' + userId + ');';
    const query = insert + values;

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.post('/removeEncounter/:userId/:pokemonName', function(req, res) {
    const userId = req.params.userId;
    const pokemonName = req.params.pokemonName;

    const from = 'DELETE FROM Trainer_Encounters_Pokemon ';
    const where = 'WHERE pokemonName = "' + pokemonName + '" AND trainerID = ' + userId + ';';
    const query = from + where;

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.post('/removeGym/:gymName', function(req, res) {
    const gymName = req.params.gymName;

    const from = 'DELETE FROM Gym_LocatedIn_Town ';
    const where = 'WHERE gymName = "' + gymName + '";';
    const query = from + where;

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });

  app.get('/masters', function(req, res) {
    const outerQuery = 'SELECT * FROM Trainer t WHERE NOT EXISTS (SELECT * from Pokemon p WHERE NOT EXISTS ';
    const innerQuery = '(SELECT pc.CapturedBy FROM Pokemon_CapturedBy pc WHERE t.id = pc.CapturedBy AND p.name = pc.name));';
    const query = outerQuery + innerQuery;

    connection.query(query, function(err, data) {
      err ? res.send(err) : res.send(data);
    });
  });
};
