var React = require('react');

var OverView = require('./views/OverView.jsx');
var DetailView = require('./views/DetailView.jsx');
var LoginView = require('./views/LoginView.jsx');
var ProfileView = require('./views/ProfileView.jsx');
var SolutionView = require('./views/SolutionView.jsx');

var Auth = require('./utils/auth.jsx');
var UserStore = require('./stores/UserStore');
var QuestionStore = require('./stores/QuestionStore');
var ViewActions = require('./actions/ViewActions');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var Link  = Router.Link;

var App = React.createClass({

  mixins: [Router.Navigation, Router.State],

  getInitialState: function(){
    return {
      questions: [],
      username: UserStore.getUser().username,
      user_id: UserStore.getUser().user_id
    };
  },

  onChange: function () {
    this.setState({
      questions: QuestionStore.getQuestions(),
      username: UserStore.getUser().username,
      user_id: UserStore.getUser().user_id
    })
    // console.log(this.state);
  },

  componentWillMount: function(){
    //ViewActions.login();

    // Set initial user value to anonymous
    ViewActions.loadAnonProfile();
  },

  componentDidMount: function(){
    UserStore.addListener(this.onChange);
    QuestionStore.addListener(this.onChange);
    ViewActions.loadQuestions();
    var self = this;
    setTimeout(function () {console.log(self.state)},2000);
  },

  loginHandler: function (e) {
    e.preventDefault();
    this.transitionTo('login');
  },

  profileHandler: function () {
    this.transitionTo('/user/' + UserStore.getUser().username);
  },

  render: function() {
    return (
      <div className="container">
        <h2 className="title">Regex Game</h2>
        {(this.state.username === "anonymous") ? <button onClick={this.loginHandler} ref="login-btn">Login</button> : <button onClick={this.profileHandler} ref="profile-btn">My Profile</button>}
        <RouteHandler questions={this.state.questions}/>
      </div>
    )
  }

});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" path="/login" handler={LoginView}/>
    <Route name="solutions" path="/solutions" handler={SolutionView}/>
    <Route name="user" path="/user/:id" handler={ProfileView}/>
    <Route name="question" path="/:qNumber" handler={DetailView}/>
    <DefaultRoute name="default" handler={OverView} />
  </Route>
);

Router.run(routes, function(Root){
  React.render(<Root />, document.getElementById('whateber'));
});

