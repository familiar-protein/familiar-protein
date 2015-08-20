var Game = require('./gameModel');

var makeGame = function(req, res, next){

  var game = {
    _id: req.body.id,
    players: [],
    questions: [1,2,3,4,5,6,7] // hard coded question numbers
  };

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