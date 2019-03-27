/*DDL for Pokedex Database*/
CREATE DATABASE Pokedex;
USE Pokedex;

CREATE TABLE Town(
  name char(20) PRIMARY KEY
);

CREATE TABLE Trainer(
  id int PRIMARY KEY,
  name char(20),
  age int,
  gender char(20),
  hometown char(20),
  image char(100),
  FOREIGN KEY (hometown) REFERENCES Town(name)
);

CREATE TABLE Gym_LocatedIn_Town(
  gymName char(20) PRIMARY KEY,
  badgeName char(20),
  townName char(20),
  badgeImage char(100),
  FOREIGN KEY (townName) REFERENCES Town(name)
);


CREATE TABLE GymLeader_Of_Gym(
  trainerID int PRIMARY KEY,
  gymName char(20),
  FOREIGN KEY (trainerID) REFERENCES Trainer(id)
  ON DELETE CASCADE,
  FOREIGN KEY (gymName) REFERENCES Gym_LocatedIn_Town(gymName)
  ON DELETE CASCADE
);

CREATE TABLE Type(
  name char(20),
  effectiveAgainst char(20),
  #weakAgainst char(20),
  PRIMARY KEY (name),
  FOREIGN KEY (effectiveAgainst) REFERENCES Type(Name)
  #FOREIGN KEY (weakAgainst) REFERENCES Type(Name)
);

CREATE TABLE Pokemon(
  name char(20) PRIMARY KEY,
  type char(20),
  image char(100),
  FOREIGN KEY (type) REFERENCES Type(name)
);

CREATE TABLE Pokemon_CapturedBy(
  id INT PRIMARY KEY,
  name char(20),
  gender char(20),
  capturedBy INT,
  FOREIGN KEY (name) REFERENCES Pokemon(name),
  FOREIGN KEY (capturedBy) REFERENCES Trainer(id)
);

CREATE TABLE Trainer_Encounters_Pokemon(
  pokemonName char(20),
  trainerID INT,
  PRIMARY KEY (pokemonName, trainerID),
  FOREIGN KEY (pokemonName) REFERENCES Pokemon(name),
  FOREIGN KEY (trainerID) REFERENCES Trainer(id)
);

CREATE TABLE PokemonLearnsMoveB(
  moveName char(20),
  powerPoint int,
  PRIMARY KEY (moveName)
);

CREATE TABLE PokemonLearnsMoveA(
  moveName char(20),
  pokemonID int,
  PRIMARY KEY (moveName, pokemonID),
  FOREIGN KEY (pokemonID) REFERENCES Pokemon_CapturedBy(id),
  FOREIGN KEY (moveName) REFERENCES PokemonLearnsMoveB(moveName)
);

CREATE TABLE Login_Information(
	id INT,
    username CHAR(20),
    password CHAR(20),
    PRIMARY KEY(id, username),
    FOREIGN KEY (id) REFERENCES Trainer(id)
);

/* INSERTION STATEMENTS FOR DATABASE POPULATION*/

INSERT INTO Town (name)
VALUES
       ('Celadon City'),
       ('Cerulean City'),
       ('Pallet Town'),
       ('Viridian City'),
       ('Vermilion City'),
       ('Saffron City'),
       ('Fuchsia City'),
       ('Cinnabar Island'),
       ('Pewter City');

INSERT INTO Trainer (id, name, age, gender, hometown, image)
VALUES
       (0,'Ash Ketchum', 18, 'Male', 'Pallet Town', 'https://cdn.bulbagarden.net/upload/d/d2/Spr_GS_Red.png'),
       (1, 'Brock', 18, 'Male', 'Pewter City', 'https://cdn.bulbagarden.net/upload/e/e2/VSBrock_PE.png'),
       (2, 'Misty', 18, 'Female', 'Cerulean City', 'https://cdn.bulbagarden.net/upload/0/0c/VSMisty_PE.png'),
       (3, 'Lt. Surge', 30, 'Male', 'Vermilion City', 'https://cdn.bulbagarden.net/upload/c/c6/VSLt_Surge_PE.png'),
       (4, 'Erika', 22, 'Female','Celadon City', 'https://cdn.bulbagarden.net/upload/3/35/VSErika_PE.png'),
       (5, 'Koga', 22, 'Male', 'Fuchsia City', 'https://cdn.bulbagarden.net/upload/d/d8/VSKoga_PE.png'),
       (6, 'Janine', 21, 'Female', 'Fuchsia City', 'https://cdn.bulbagarden.net/upload/archive/2/21/20120731091150%21Spr_HGSS_Janine.png'),
       (7, 'Sabrina', 25, 'Female', 'Saffron City', 'https://cdn.bulbagarden.net/upload/2/20/VSSabrina_PE.png'),
       (8, 'Blaine', 60, 'Male', 'Cinnabar Island', 'https://cdn.bulbagarden.net/upload/1/11/VSBlaine_PE.png'),
       (9, 'Giovanni', 40, 'Male', 'Viridian City', 'https://cdn.bulbagarden.net/upload/4/4a/VSGiovanni_PE.png'),
       (10, 'Gary Oak', 10, 'Male', 'Pallet Town', 'https://cdn.bulbagarden.net/upload/a/ad/Gary_Oak_BW.png'),
       (11, 'Professor Oak', 47, 'Male', 'Pallet Town', 'https://cdn.bulbagarden.net/upload/3/3e/Lets_Go_Pikachu_Eevee_Professor_Oak.png');

INSERT INTO  Gym_LocatedIn_Town(gymName, badgeName, townName, badgeImage)
VALUES
       ('Pewter Gym', 'Boulder Badge', 'Pewter City', 'https://cdn.bulbagarden.net/upload/thumb/d/dd/Boulder_Badge.png/1200px-Boulder_Badge.png'),
       ('Cerulean Gym', 'Cascade Badge', 'Cerulean City', 'https://cdn.bulbagarden.net/upload/9/9c/Cascade_Badge.png'),
       ('Vermilion Gym', 'Thunder Badge', 'Vermilion City', 'https://cdn.bulbagarden.net/upload/a/a6/Thunder_Badge.png'),
       ('Celadon Gym', 'Rainbow Badge', 'Celadon City', 'https://cdn.bulbagarden.net/upload/b/b5/Rainbow_Badge.png'),
       ('Fuchsia Gym', 'Soul Badge', 'Fuchsia City', 'https://cdn.bulbagarden.net/upload/7/7d/Soul_Badge.png'),
       ('Saffron Gym', 'Marsh Badge', 'Saffron City', 'https://cdn.bulbagarden.net/upload/6/6b/Marsh_Badge.png'),
       ('Cinnabar Gym', 'Volcano Badge', 'Cinnabar Island', 'https://cdn.bulbagarden.net/upload/1/12/Volcano_Badge.png'),
       ('Viridian Gym', 'Earth Badge', 'Viridian City', 'https://cdn.bulbagarden.net/upload/7/78/Earth_Badge.png');

INSERT into GymLeader_Of_Gym(trainerID, gymName)
values
       (1, 'Pewter Gym'),
       (2, 'Cerulean Gym'),
       (3, 'Vermilion Gym'),
       (4, 'Celadon Gym'),
       (5, 'Fuchsia Gym'),
       (6, 'Fuchsia Gym'),
       (7, 'Saffron Gym'),
       (8, 'Cinnabar Gym'),
       (9, 'Viridian Gym');

INSERT INTO Type(name, effectiveAgainst)
VALUES
      ('Water', null),
      ('Grass', null),
      ('Fire', null),
      ('Rock', null),
      ('Electric', null),
      ('Poison', null),
      ('Ground', null),
      ('Psychic', null);

UPDATE Type
SET effectiveAgainst = 'Grass'
where name = 'Fire';

UPDATE Type
set effectiveAgainst = 'Water'
where name = 'Grass';

UPDATE Type
set effectiveAgainst = 'Fire'
where name = 'Water';

UPDATE Type
set effectiveAgainst = 'Electric'
where name = 'Ground';

UPDATE Type
set effectiveAgainst = 'Water'
where name = 'Electric';

UPDATE Type
set effectiveAgainst = 'Fire'
where name = 'Rock';

UPDATE Type
set effectiveAgainst = 'Grass'
where name = 'Poison';

UPDATE Type
set effectiveAgainst = 'Poison'
where name = 'Psychic';

INSERT INTO Pokemon(name, type, image)
VALUES
      ('Charmander', 'Fire', 'https://cdn.bulbagarden.net/upload/7/73/004Charmander.png'),
      ('Squirtle', 'Water', 'https://cdn.bulbagarden.net/upload/3/39/007Squirtle.png'),
      ('Bulbasaur', 'Grass', 'https://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png'),
      ('Staryu', 'Water', 'https://cdn.bulbagarden.net/upload/4/4f/120Staryu.png'),
      ('Gloom', 'Grass', 'https://cdn.bulbagarden.net/upload/2/2a/044Gloom.png'),
      ('Ninetales', 'Fire', 'https://cdn.bulbagarden.net/upload/0/05/038Ninetales.png'),
      ('Geodude', 'Rock', 'https://cdn.bulbagarden.net/upload/9/98/074Geodude.png'),
      ('Raichu', 'Electric', 'https://cdn.bulbagarden.net/upload/8/88/026Raichu.png'),
      ('Pikachu', 'Electric', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png'),
      ('Venonat', 'Poison', 'https://cdn.bulbagarden.net/upload/a/ad/048Venonat.png'),
      ('Onix', 'Ground', 'https://cdn.bulbagarden.net/upload/9/9a/095Onix.png'),
      ('Kadabra', 'Psychic', 'https://cdn.bulbagarden.net/upload/9/97/064Kadabra.png'),
      ('Deoxys', 'Psychic', 'https://cdn.bulbagarden.net/upload/e/e7/386Deoxys.png');

INSERT INTO Pokemon_CapturedBy(id, name, gender, capturedBy)
VALUES
       (0, 'Pikachu', 'Male', 0), #Pikachu - Ash
       (1, 'Staryu', 'Female', 2),  #Staryu - Misty
       (2, 'Gloom', 'Female', 4), #Gloom - Erika
       (3, 'Ninetales', 'Female', 8), #Ninetales - Blaine
       (4, 'Geodude', 'Male', 1), #Geodude - Brock
       (5, 'Raichu', 'Male', 3), #Raichu - Lt.Surge
       (6, 'Venonat', 'Male', 5), #Venonat - Koga
       (8, 'Onix', 'Male', 9), #Onix - Giovanni
       (9, 'Kadabra', 'Male', 7), #Kadabra - Sabrina
       (10, 'Squirtle', 'Male', 0), #Squirtle - Ash
       (11, 'Charmander', 'Male', 0), #Charmander - Ash
       (12, 'Pikachu', 'Male', 11), #Pikachu - Professor Oak
       (13, 'Staryu', 'Female', 11),  #Staryu - Professor Oak
       (14, 'Gloom', 'Female', 11), #Gloom - Professor Oak
       (15, 'Ninetales', 'Female', 11), #Ninetales - Professor Oak
       (16, 'Geodude', 'Male', 11), #Geodude - Professor Oak
       (17, 'Raichu', 'Male', 11), #Raichu - Professor Oak
       (18, 'Venonat', 'Male', 11), #Venonat - Professor Oak
       (19, 'Onix', 'Male', 11), #Onix - Professor Oak
       (20, 'Kadabra', 'Male', 11), #Kadabra - Professor Oak
       (21, 'Squirtle', 'Male', 11), #Squirtle - Professor Oak
       (22, 'Charmander', 'Male', 11), #Charmander - Professor Oak
       (23, 'Bulbasaur', 'Female', 11), #Bulbusaur - Professor Oak
       (24, 'Deoxys', 'Male', 11); #Deoxys - Professor Oak


INSERT INTO Trainer_Encounters_Pokemon(pokemonName, trainerID)
VALUES
       ('Pikachu',  0), #Pikachu - Ash
       ('Staryu', 2),  #Staryu - Misty
       ('Gloom', 4), #Gloom - Erika
       ('Ninetales', 8), #Ninetales - Blaine
       ('Geodude', 1), #Geodude - Brock
       ('Raichu', 3), #Raichu - Lt.Surge
       ('Venonat', 5), #Venonat - Koga
       ('Onix', 9), #Onix - Giovanni
       ('Kadabra', 7), #Kadabra - Sabrina
       ('Squirtle', 0), #Squirtle - Ash
       ('Charmander', 0), #Charmander - Ash
       ('Deoxys', 0); #Deoxys - Ash

INSERT INTO PokemonLearnsMoveB(moveName, powerPoint)
VALUES
		#Pikachu moves
        ('Thunder Shock', 30),
        ('Thunderbolt', 15),
        ('Agility', 30),
        ('Quick Attack', 30),
        ('Iron Tail', 15),
        #Staryu moves
        ('Swift', 20),
        ('Psychic', 10),
        ('Hydro Pump', 5),
        ('Surf', 15),
        #Gloom moves
        ('Mega Drain', 40),
        ('Poison Powder', 35),
        ('Sleep Powder', 15),
        ('Razor Leaf', 25),
        #Ninetales moves
        ('Ember', 25),
        ('Tail Whip', 30),
        ('Will-O-Wisp', 15),
        ('Fire Blast', 5),
        #Geodude moves
        ('Defense Curl', 40),
        ('Sand Attack', 15),
        ('Rock Throw', 15),
        ('Self-Destruct', 5);

INSERT INTO PokemonLearnsMoveA(moveName, pokemonID)
VALUES
		#Pikachu moves
        ('Thunder Shock', 0),
        ('Thunderbolt', 0),
        ('Agility', 0),
        ('Quick Attack', 0),
        ('Iron Tail', 0),
        #Staryu moves
        ('Swift', 1),
        ('Psychic', 1),
        ('Hydro Pump', 1),
        ('Surf', 1),
        #Gloom moves
        ('Mega Drain', 2),
        ('Poison Powder', 2),
        ('Sleep Powder', 2),
        ('Razor Leaf', 2),
        #Ninetales moves
        ('Ember', 3),
        ('Tail Whip', 3),
        ('Will-O-Wisp', 3),
        ('Fire Blast', 3),
        #Geodude moves
        ('Defense Curl', 4),
        ('Sand Attack', 4),
        ('Rock Throw', 4),
        ('Self-Destruct', 4);
        
INSERT INTO Login_Information(id, username, password)
VALUES
       (0, 'ash', 'ketchum'),
       (10, 'gary', 'oak'),
       (11, 'admin', '1234');