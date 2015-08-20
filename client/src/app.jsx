var React = require('react');

var OverView = require('./views/OverView.jsx');
var DetailView = require('./views/DetailView.jsx');
var LoginView = require('./views/LoginView.jsx');
var UserProfileView = require('./views/UserProfileView.jsx');
var NavBarView = require('./views/NavBarView.jsx');

var HomeView = require('./views/MultiplayerViews/HomeView.jsx');

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
        this.setState({questions: data, user: {name: 'Lisa',email: 'lisa@email.com'}});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
      }
    });
  },

  componentDidMount: function(){
    this.loadAllQuestions();
  },

  componentDidUpdate: function() {
    this.isLoggedIn();
    //console.log("CURRENT STATE: ", this.state.loggedIn);
  },

  isLoggedIn: function() {
    $.ajax({
      url: window.location.origin + '/loggedin',
      method: 'GET',
      dataType: 'json',
      success: function(data){
        //console.log("Logged In: ", data.loggedIn);
        this.setState({loggedIn: data.loggedIn});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
      }
    });
  },

  render: function() {
    return (
      <div className="container">
        <NavBarView />
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
    <Route name="question" path="/:qNumber" handler={DetailView}/>
  </Route>
);

Router.run(routes, function(Root){
  React.render(<Root />, document.body);
});

