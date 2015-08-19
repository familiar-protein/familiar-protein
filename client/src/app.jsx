var React = require('react');

var OverView = require('./views/OverView.jsx');
var DetailView = require('./views/DetailView.jsx');
var LoginView = require('./views/LoginView.jsx');
var UserProfileView = require('./views/UserProfileView.jsx');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;


var App = React.createClass({
  getInitialState: function(){
    return {
      questions: [],
      user: {}
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

  render: function() {
    return (
      <div className="container">
        <h2 className="title">Regex Game</h2>
        <RouteHandler questions={this.state.questions} user={this.state.user} />
      </div>
    )
  }

});

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="default" handler={OverView} />
    <Route name="user" path="/login" handler={LoginView}/> 
    <Route name="userProfile" path="userProfile" handler={UserProfileView}/>
    <Route name="question" path=":qNumber" handler={DetailView}/>
  </Route>
);

Router.run(routes, function(Root){
  React.render(<Root />, document.body);
});

