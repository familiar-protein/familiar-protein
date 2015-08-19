var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;

var Auth = require('./../utils/auth.jsx');

var LoginView = React.createClass({
  mixins: [Navigation],
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState: function(){
    return {
      error: false
    };
  },
  handleSubmit: function(e){
    e.preventDefault();
    var router = this.context.router;
    var nextPath = router.getCurrentQuery().nextPath;
    var user = this.refs.username.getDOMNode().value;
    var pass = this.refs.password.getDOMNode().value;

    var context = this;
    Auth.login(user, pass, function(success){
      console.log(success);
      if(!success){
        return context.setState({error: true});
      }
      if (nextPath) {
        router.replaceWith(nextPath);
      } else {
        router.replaceWith('/default');
      }
    });

    //this.transitionTo('default');
  },
  render: function(){
    return(
      <form className="loginForm" onSubmit={this.handleSubmit}>
        <input ref="username" type="text" placeholder="Username" ref="username" />
        <input ref="password" type="password" placeholder="Password" ref="password" />
        <input type="submit" value="Login" />
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    );
  }
});

module.exports=LoginView;