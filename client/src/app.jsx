var React = require('react');

var OverView = require('./views/OverView.jsx');
var DetailView = require('./views/DetailView.jsx');
var LoginView = require('./views/LoginView.jsx');
var ProfileView = require('./views/ProfileView.jsx');
var SolutionView = require('./views/SolutionView.jsx');
var LeaderboardView = require('./views/LeaderboardView.jsx');

var Auth = require('./utils/auth.jsx');
var UserStore = require('./stores/UserStore');
var QuestionStore = require('./stores/QuestionStore');
var ViewActions = require('./actions/ViewActions');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var Link  = Router.Link;
var cookie = require('react-cookie');

//var Dispatcher = require('./Dispatcher');
//var ApiUtils = require('./utils/ApiUtil.jsx');
//var ActionTypes = require('./Constants').ActionTypes;

var App = React.createClass({

  mixins: [Router.Navigation, Router.State],

  getInitialState: function(){
    return {
      questions: [],
      //username: UserStore.getUser().username,
      username: UserStore.getUser().username || cookie.load('cookieName'),
      user_id: UserStore.getUser().user_id
    };
  },

  onChange: function () {
    this.setState({
      questions: QuestionStore.getQuestions(),
      username: UserStore.getUser().username || cookie.load('cookieName'),
      user_id: UserStore.getUser().user_id
    });
    // console.log(this.state);
  },

  componentWillMount: function(){
    if (cookie.load('cookieName') != null) {
      ViewActions.login(cookie.load('cookieName'));
    }

    // Set initial user value to anonymous
    //ViewActions.loadAnonProfile();
  },

  componentDidMount: function(){
    UserStore.addListener(this.onChange);
    QuestionStore.addListener(this.onChange);
    ViewActions.loadQuestions();
    ViewActions.loadAllSolutions();
    //ViewActions.login();
  },

  loginHandler: function (e) {
    e.preventDefault();
    this.transitionTo('login');
  },

  profileHandler: function () {
    this.transitionTo('/user/' + UserStore.getUser().username);
  },

  goToHome: function () {
    this.transitionTo('default');
  },

  //githubHandler: function() {
  //  ApiUtils.login(username, function (userData) {
  //    Dispatcher.dispatch({
  //      type: ActionTypes.USER_AUTHENTICATION,
  //      payload: {
  //        username: userData.username,
  //        user_id: userData._id
  //      }
  //    });
  //  });
  //},

  logOut: function() {
    cookie.remove('cookieName');
    this.transitionTo('/');
  },

  render: function() {
    return (
      <div className="container">
        <h2 className="title" onClick={this.goToHome}>Regex Game</h2>
        {(!cookie.load('cookieName')) ? <a href="/auth/github" onClick={this.githubHandler}><button className="btn btn-primary home">Log in with Github</button></a> :
          <button className="btn btn-primary home" onClick={this.profileHandler} ref="profile-btn">My Profile</button>}
        <Link to="leaderboard" className="btn btn-primary home">View Leaderboard</Link>
        {(cookie.load('cookieName')) ? <a href="/"><button onClick={this.logOut} className="btn btn-primary home">Log out</button></a> : null }
        <RouteHandler questions={this.state.questions}/>
      </div>
    )
  }

});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" path="/login" handler={LoginView}/>
    <Route name="solutions" path="/solutions" handler={SolutionView}/>
    <Route name="leaderboard" path="/leaderboard" handler={LeaderboardView}/>
    <Route name="user" path="/user/:id" handler={ProfileView} username="this.state.username"/>
    <Route name="question" path="/:qNumber" handler={DetailView}/>
    <DefaultRoute name="default" handler={OverView} />
  </Route>
);

Router.run(routes, function(Root){
  React.render(<Root />, document.getElementById('reactView'))
});

