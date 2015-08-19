var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var CreateGameView = React.createClass({
  
  mixins: [Navigation, Router.State],

  // createGame: function(){
  //   console.log("Creating Game");
  //   // navigate to Create Game with code

  // },

  // joinGame: function(){
  //   console.log("Joining Game");
  //   // navigate to join game with code and name
  // },

  render: function(){
    return (
      <div>
        <h1>This is the create Game view</h1>
      </div>
    );
  }

});

module.exports = CreateGameView;