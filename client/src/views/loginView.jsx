var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var Login = React.createClass({
  render: function(){
    return (
      <div>
        <a href='/auth/google'>login</a>
      </div>
    );
  }
})

module.exports = Login;