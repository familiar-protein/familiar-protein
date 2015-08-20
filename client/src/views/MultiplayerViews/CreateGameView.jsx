var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var CreateGameView = React.createClass({
  
  mixins: [Navigation, Router.State],

  createGameID: function () {
    var gameID = '';
    var validChars = 'ABCDEFGHJKLMNOPQRSTUVWXYZ123456789';

    for(var i = 0; i < 6; i++) {
      gameID += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }

    return gameID;
  },

  createGame: function(gameID){
    var game = {id: gameID};
    $.ajax({
      url: window.location.origin + "/makeGame",
      method: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(game),
      success: function(data){
        console.log("Successfully created game", data);
      },
      error: function(xhr, status, err){
        console.log("ERROR in ajax", err);
      }
    });
  },

  render: function(){

    var gameID = this.createGameID();
    var game = this.createGame(gameID);

    return (
      <div>
        <h1>This is the create Game view</h1>
        <h1>Enter Code: {gameID}</h1>
      </div>
    );
  }

});

module.exports = CreateGameView;