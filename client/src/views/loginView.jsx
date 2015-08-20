var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var Login = React.createClass({
  render: function(){
    return (
      <div>
        <a href='/auth/google'>login</a>
        <a href='/logout'>logout</a>

      </div>
    );
  }
})

module.exports = Login;
