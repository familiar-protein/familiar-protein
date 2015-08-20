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

  render: function(){

    var gameID = this.createGameID();

    return (
      <div>
        <h1>This is the create Game view</h1>
        <h1>Enter Code: {gameID}</h1>
      </div>
    );
  }

});

module.exports = CreateGameView;