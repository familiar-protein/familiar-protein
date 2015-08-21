var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var WaitGameView = React.createClass({
  
  mixins: [Navigation, Router.State],

  render: function(){
    return (
      <div>
        <h1>This is the wait game view</h1>
      </div>
    );
  }

});

module.exports = WaitGameView;