var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var RouterState = Router.State;
var UserStore = require('../stores/UserStore');

var Auth = require('./../utils/auth.jsx');
var ViewActions = require('./../actions/ViewActions');

var LoginView = React.createClass({
  mixins: [Navigation, RouterState],

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState: function(){
    return UserStore.getUser();
  },

  onChange: function () {
    this.setState(UserStore.getState());
  },

  componentDidMount: function () {
    UserStore.addListener(this.onChange);
  },

  componentWillUnmount: function () {
    UserStore.removeChangeListener(this.onChange);
  },

  handleSubmit: function(e){
    e.preventDefault();
    var router = this.context.router;
    var nextPath = router.getCurrentQuery().nextPath;
    var user = this.refs.username.getDOMNode().value;
    //var pass = this.refs.password.getDOMNode().value;

    ViewActions.login(user);
    this.transitionTo('default');
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