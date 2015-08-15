var GameBox = require('./views/gameBox.jsx');
var QuestionContainer = require('./views/questionContainer.jsx');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <GameBox />
      </div>
    )
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="question" path=":qNumber" handler={QuestionContainer}/>
    <DefaultRoute handler={App} />
  </Route>
);

Router.run(routes, function(Root){
  React.render(<Root />, document.body);
});