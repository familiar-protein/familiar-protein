var React = require('react');

var OverView = require('./views/OverView.jsx');
var DetailView = require('./views/DetailView.jsx');
var LoginView = require('./views/LoginView.jsx');
var UserProfileView = require('./views/UserProfileView.jsx');
var NavBarView = require('./views/NavBarView.jsx');

var HomeView = require('./views/MultiplayerViews/HomeView.jsx');
var CreateGameView = require('./views/MultiplayerViews/CreateGameView.jsx');
var JoinGameView = require('./views/MultiplayerViews/JoinGameView.jsx');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;


var App = React.createClass({
  getInitialState: function(){
    return {
      questions: [],
      user: {},
      loggedIn: false
    };
  },

  loadAllQuestions: function(){
    $.ajax({
      url: window.location.origin + '/questions',
      method: 'GET',
      dataType: 'json',
      success: function(data){
        data.sort(function(a, b){
          return a.qNumber - b.qNumber;
        });
        this.setState({questions: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
      }
    });
  },

  componentDidMount: function(){
    this.loadAllQuestions();
  },

  // Whenever we update any component that's a child of our app,
  // let's kick off a request to check if we aren't logged in.
  componentDidUpdate: function() {
    this.isLoggedIn();
    console.log('Component updating!');
  },

  // AJAX request to the server to check if the client is logged in.
  // This is probably a DIRTY way to do it. REALLY DIRTY.
  isLoggedIn: function() {
    $.ajax({
      url: window.location.origin + '/loggedin',
      method: 'GET',
      dataType: 'json',
      success: function(data){
        console.log('DATA!!!! ', data);
        if (this.state.loggedIn != data.loggedIn) {
          this.setState({
            loggedIn: data.loggedIn,
            user: data.user
          }, function() {
            console.log ("USER INFO: ", this.state.user);
          });

          if (data.loggedIn === false) {
            //this.setState({loggedIn: false, user: {}});  // Clear out clientside user info if / when we log out.
          }
        }
      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
      }
    });
  },

  render: function() {
    return (
      <div className="container">
        <NavBarView loggedIn={this.state.loggedIn} />
        <RouteHandler questions={this.state.questions} user={this.state.user} />
      </div>
    )
  }

});

// add component for toolbar
var NavBar = React.createClass({
  render: function() {
    return (
      <nav class="navbar navbar-default">
      </nav>
    )
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="default" handler={OverView} />
    <Route name="userProfile" path="userProfile" handler={UserProfileView}/>
    <Route name="login" path="/login" handler={LoginView}/> 
    <Route name="signup" path="/signup" handler={LoginView}/>
    <Route name="home" path="/home" handler={HomeView}/>
    <Route name="createGame" path="/createGame" handler={CreateGameView}/>
    <Route name="joinGame" path="/joinGame" handler={JoinGameView}/>
    <Route name="question" path="/:qNumber" handler={DetailView}/>
  </Route>
);

Router.run(routes, function(Root){
  React.render(<Root />, document.body);
});

