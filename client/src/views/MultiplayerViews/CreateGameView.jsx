var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var CreateGameView = React.createClass({
  
  mixins: [Navigation, Router.State],

  render: function(){
    return (
      <div>
        <h1>This is the create Game view</h1>
      </div>
    );
  }

});

module.exports = CreateGameView;