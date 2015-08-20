var Game = require('./gameModel');

var makeGame = function(req, res, next){
  
  // will want to add questions to the game such that it is no longer
  // simply an empty object
  var game = {
    id: req.body.id,
    players: {},
    questions: {}
  };

  console.log("Making new Game in gameController");

  var newGame = new Game(game);
  newGame.save(function(err, newEntry){
    if (err){
      res.send(500, err);
    }else{
      res.send(200, newEntry);
    }
  });
};