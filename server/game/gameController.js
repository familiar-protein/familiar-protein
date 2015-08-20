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

var getGame = function(req, res, next){

  console.log("req.body", req.body);
  console.log("req.body.code", req.body.code);


  Game.findById(req.body.code).exec(function(err, data){
    if (err){
      console.log("ERROR: ", err);
      res.send(500,err);
    }else{
      res.status(200).send(data);
    }
  });

};

module.exports = {
  makeGame: makeGame,
  getGame: getGame
};