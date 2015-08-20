var Game = require('./gameModel');

var makeGame = function(req, res, next){
  
  // will want to add questions to the game such that it is no longer
  // simply an empty object
  console.log("makeGame in controller");

  var game = {
    _id: req.body.id,
    players: null,
    questions: [1,2,3,4,5,6,7] // hard coded question numbers
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