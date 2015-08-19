var React = require('react');
var Router = require('react-router');

var HomeView = require('./views/HomeView.jsx');
var OverView = require('./views/OverView.jsx');
var DetailView = require('./views/DetailView.jsx');
var UserView = require('./views/UserView.jsx');
var TestView = require('./views/TestView.jsx');
var Link = Router.Link;
var OverView = require('./views/Overview.jsx');
var DetailView = require('./views/DetailView.jsx');
var loginView = require('./views/loginView.jsx');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var AppBar = mui.AppBar;
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;


var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

var App = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
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
<<<<<<< HEAD
        // this probably should be sorted by difficulty
        data.sort(function(a, b){
          return a.qNumber - b.qNumber;
        });
        this.setState({questions: data});
      }.bind(this),
=======
        console.log(data);
        if(data === 'not logged in'){
          React.render(React.createElement(loginView), document.body);
        }else{
          data.sort(function(a, b){
            return a.qNumber - b.qNumber;
          });
          this.setState({questions: data});
          }
        }.bind(this),
>>>>>>> (googleAuth) added primary authentication with google
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
  // _handleClick, _getSelectedIndex & _onLeftNavChange -> functions for Appbar & LeftNav
  _handleClick: function(e) {
    e.preventDefault();
    this.refs.leftNav.toggle();
  },
  _getSelectedIndex: function() {
    var currentItem;
    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    }
  },
  _onLeftNavChange: function(e, key, payload) {
    this.context.router.transitionTo(payload.route);
  },

  render: function() {
    menuItems = [
      { route: 'home', text: 'Home' },
      { route: 'questions', text: 'Challenges' },
      { route: 'user', text: 'User' },
      { route: 'test', text: 'Test' },
    ];

    return (
      <div>
        <LeftNav ref="leftNav" 
          docked={false} 
          menuItems={menuItems} 
          selectedIndex={this._getSelectedIndex()}
          onChange={this._onLeftNavChange} />

        <header>
          <AppBar title='Regex Challenge' onLeftIconButtonTouchTap={this._handleClick} />
        </header>

        <RouteHandler questions={this.state.questions} user={this.state.user}/>
      </div>
    )
  }

});

App.contextTypes = {
  router: React.PropTypes.func
};
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

