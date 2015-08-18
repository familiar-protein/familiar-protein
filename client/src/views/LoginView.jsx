var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var LoginView = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hi-Diddily-Ho, World!</h1>
      </div>
    );
  }
});

module.exports = LoginView;