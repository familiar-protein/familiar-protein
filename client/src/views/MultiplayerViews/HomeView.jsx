var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var HomeView = React.createClass({
  
  mixins: [Navigation, Router.State],

  render: function(){
    return (
      <div>
        <h1>This is the home view</h1>
        <Link to="createGame" className="btn btn-primary">Create Game</Link>
        <Link to="joinGame" className="btn btn-primary">Join Game</Link>
      </div>
    );
  }

});

module.exports = HomeView;