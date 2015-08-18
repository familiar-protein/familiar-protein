var React = require('react');

var OverView = require('./views/OverView.jsx');
var DetailView = require('./views/DetailView.jsx');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;


var App = React.createClass({
  getInitialState: function(){
    return {
      questions: [],
      user: undefined
    };
  },

  loadAllQuestions: function(){
    $.ajax({
      url: window.location.origin + '/questions',
      method: 'GET',
      dataType: 'json',
      success: function(data){
        // this probably should be sorted by difficulty
        console.log(data);
        data.sort(function(a, b){
          return a.qNumber - b.qNumber;
        });
        console.log(data);
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
        console.log(data);
        this.setState({user: data});
      },
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
      }
    });
  },

  // Fetch data in componentDidMount. 
  // When the response arrives, store the data in state, triggering a render to update your UI.
  // https://facebook.github.io/react/tips/initial-ajax.html
  componentDidMount: function(){
    this.loadAllQuestions();
    this.getUserInfo();
  },

  render: function() {
    return (
      <div className="container">
        <h2 className="title">Regex Game</h2>
        <RouteHandler questions={this.state.questions}/>
      </div>
    )
  }

});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="question" path="/:qNumber" handler={DetailView}/>
    <DefaultRoute name="default" handler={OverView} />
  </Route>
);

Router.run(routes, function(Root){
  React.render(<Root />, document.body);
});

