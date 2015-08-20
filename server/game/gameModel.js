var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.Mixed,
  players: [{
    username: String,
    currentRound: Number
  }],
  questions: [Number]
});

var Game = mongoose.model('Game', GameSchema);

module.exports = Game;