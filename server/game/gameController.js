var Game = require('./gameModel');

var makeGame = function(req, res, next){
  
  // will want to add questions to the game such that it is no longer
  // simply an empty object
  console.log("makeGame in controller");

  var game = {
    _id: req.body.id,
    players: {},
    questions: {}
  };

  console.log("Making new Game in gameController");

  var newGame = new Game(game);
  newGame.save(function(err, newEntry){
    if (err){
      console.log("ERROR", err);
      res.send(500, {err: err});
    }else{
      console.log("SUCCESS", newEntry);
      res.send(200, {entry: newEntry});
    }
  });
};

module.exports = {
  makeGame: makeGame
};