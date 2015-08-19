var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var HomeView = React.createClass({
  
  mixins: [Navigation, Router.State],

  createGame: function(){
    console.log("Creating Game");
  },

  joinGame: function(){
    console.log("Joining Game");
  },

  render: function(){
    return (
      <div>
        <h1>This is the home view</h1>
        <button type="button" className="btn btn-primary" onClick={this.createGame}>Create Game</button>
        <button type="button" className="btn btn-primary" onClick={this.joinGame}>Join Game</button>
      </div>
    );
  }

});

module.exports = HomeView;