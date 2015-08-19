var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;

var LoginView = React.createClass({
  mixins: [Navigation],

  handleSubmit: function(e){
    e.preventDefault();
    //TODO: Authentication
    
    this.transitionTo('default');
  },
  render: function(){
    return(
      <form className="loginForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Username" ref="username" />
        <input type="password" placeholder="Password" ref="password" />
        <input type="submit" value="Login" />
      </form>
    );
  }
});

module.exports=LoginView;