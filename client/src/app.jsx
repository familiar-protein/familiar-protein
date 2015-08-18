var React = require('react');
var Router = require('react-router');

var HomeView = require('./views/HomeView.jsx');
var OverView = require('./views/OverView.jsx');
var DetailView = require('./views/DetailView.jsx');
var UserView = require('./views/UserView.jsx');
var TestView = require('./views/TestView.jsx');
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var App = React.createClass({
  getInitialState: function(){
    return {
      questions: [],
      user: 'mr. nobody'
    };
  },

  loadAllQuestions: function(){
    $.ajax({
      url: window.location.origin + '/questions',
      method: 'GET',
      dataType: 'json',
      success: function(data){
        // this probably should be sorted by difficulty
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

  // expect to get user data from route /user
  getUserInfo: function() {
     $.ajax({
      url: window.location.origin + '/user',
      method: 'GET',
      dataType: 'json',
      success: function(data){
        this.setState({user: data});
      },
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
        this.setState({user: 'error'});
      }
    });
  },

  // Fetch initial data in componentDidMount. 
  // When the response arrives, store the data in state, triggering a render to update your UI.
  // https://facebook.github.io/react/tips/initial-ajax.html
  componentDidMount: function(){
    this.loadAllQuestions();
    this.getUserInfo();
    this.setState({user: 'Placeholder UserName'});
  },

  render: function() {

    return (
      <div>
        <h2 className="title">Regex Game</h2>
        <header>
          <ul>
            <li><Link to="home">Home</Link></li>
            <li><Link to="questions">Questions</Link></li>
            <li><Link to="user">User</Link></li>
            <li><Link to="test">Test</Link></li>
          </ul>
        </header>

        <RouteHandler questions={this.state.questions} user={this.state.user}/>
      </div>
    )
  }

});
// 
var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="home" handler={HomeView}/>
    <Route name="questions" handler={OverView}/>
    <Route name="question" path="question/:qNumber" handler={DetailView}/>
    <Route name="user" handler={UserView}/>
    <Route name="test" handler={TestView}/>
    <DefaultRoute handler={HomeView}/>
  </Route>
);

Router.run(routes, function(Handler, state){
  var params = state.params;
  React.render(<Handler params={params}/>, document.body);
});

