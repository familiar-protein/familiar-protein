var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.Mixed,
  players: [{
    username: String,
    currentRound: Number
  }],
  // the number represents the qNumber in the questionData.js
  // and also the round number for what the player is currently on
  questions: [Number]
});

var Game = mongoose.model('Game', GameSchema);

module.exports = Game;