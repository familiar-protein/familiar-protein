var React = require('react');
var Router = require('react-router');

var HomeView = require('./views/HomeView.jsx');
var OverView = require('./views/Overview.jsx');
var DetailView = require('./views/DetailView.jsx');
var UserView = require('./views/UserView.jsx');
var TestView = require('./views/TestView.jsx');
var SubmitView = require('./views/SubmitView.jsx');
var Link = Router.Link;
var OverView = require('./views/Overview.jsx');
var DetailView = require('./views/DetailView.jsx');
var LoginView = require('./views/loginView.jsx');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var AppBar = mui.AppBar,
    LeftNav = mui.LeftNav,
    List = mui.List,
    ListItem = mui.ListItem, 
    FlatButton = mui.FlatButton,
    TextField = mui.TextField,
    RaisedButton = mui.RaisedButton,
    IconButton = mui.IconButton,
    IconMenu = mui.IconMenu;
    FontIcon = mui.FontIcon;

var Menu = require('material-ui/lib/menus/menu'),
    MenuItem = require('material-ui/lib/menus/menu-item'); 

// var MoreVertIcon = require('./svg-icons/navigation/more-vert');


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
      user: undefined
    };
  },

  loadAllQuestions: function(){
    var that = this;  
    $.ajax({
      url: window.location.origin + '/questions',
      method: 'GET',
      dataType: 'json',
      success: function(data){
        console.log(data);
        if(data === 'not logged in'){
          React.render(React.createElement(loginView), document.body);
        }else{
          data.sort(function(a, b){
            return a.qNumber - b.qNumber;
          });
          that.setState({questions: data});
          }
        },
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
      }
    });
  },

  // expect to get user data from route /user
  getUserInfo: function() {
    var that = this;
    console.log('Get userinfo executed.');
     $.ajax({
      url: window.location.origin + '/user',
      method: 'GET',
      dataType: 'json',
      success: function(data){
        console.log('user', data);
        that.setState({user: data});
      },
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
        that.setState({user: undefined});
      }
    });
  },

  // Fetch initial data in componentDidMount. 
  // When the response arrives, store the data in state, triggering a render to update your UI.
  // https://facebook.github.io/react/tips/initial-ajax.html
  componentDidMount: function(){
    this.loadAllQuestions();
    this.getUserInfo();
    this.setState({user: undefined});
  },
  // _handleClick, _getSelectedIndex & _onLeftNavChange -> functions for Appbar & LeftNav
  _handleClick: function(e) {
    e.preventDefault();
    this.refs.leftNav.toggle();
  },
  _getSelectedIndex: function(menuItems) {
    var currentItem;
    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    }
  },
  _onNavChange: function(e, key, payload) {
    console.log('Key & Payload from _onNavChange: ',key, payload)
    this.context.router.transitionTo(payload.route);
  },

  _handleIconMenuValueLinkChange: function(e, value) {
    this.setState({
      iconMenuValueLink: value
    });
    console.log('_handleIconMenuValueLinkChange', e, value);
    this.context.router.transitionTo(value);
    // this.context.router.transitionTo();
  },

  render: function() {
    var leftNavMenuItems = [
      { route: 'home', text: 'Home' },
      { route: 'questions', text: 'Challenges' },
      { route: 'user', text: 'User' },
      { route: 'test', text: 'Test' },
      { route: 'submit', text: 'Submit Your Challenge' },
    ];

    var iconMenuValueLink = {
      value: this.state.iconMenuValueLink,
      requestChange: this._handleIconMenuValueLinkChange
    };

    if (this.state.user !== undefined) {
      console.log(this.state);
      var username = this.state.user.google.name;
      var loginandout = <MenuItem value="login" primaryText="Logout" leftIcon={<i className="material-icons md-light md-24">swap_horiz</i>}/>
    } else {
      var username = '';
      var loginandout = <MenuItem value="login" primaryText="Login" leftIcon={<i className="material-icons md-light md-24">swap_horiz</i>}/>
    }

    return (
      <div>
        <LeftNav ref="leftNav" 
          docked={false} 
          menuItems={leftNavMenuItems} 
          selectedIndex={this._getSelectedIndex(leftNavMenuItems)}
          onChange={this._onNavChange} />

        <header>
          <AppBar title='Regex Challenge' 
          onLeftIconButtonTouchTap={this._handleClick} 
          iconElementRight={
            <div>
            <div className="username" style={{float: 'left'}}>
              {username}
            </div>
              <IconMenu
                desktop={true} 
                iconButtonElement={
                  <div>
                    <i className="material-icons md-light md-24 margin-10">person</i>
                  </div>}
                openDirection="bottom-left"
                valueLink={iconMenuValueLink}>
                <MenuItem value="user" primaryText="User" leftIcon={<i className="material-icons md-light md-24">face</i>}/>
                <MenuItem value="test" primaryText="Test" leftIcon={<i className="material-icons md-light md-24">star</i>}/>
                {loginandout}
              </IconMenu>
            </div>
          } /> {/* appBar */}
        </header>
        
        <section className="content">
          <RouteHandler questions={this.state.questions} user={this.state.user}/>
        </section>

      </div>
    ) //return
  } //render
}); //app

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
    <Route name="test" path="/test/" handler={TestView}/>
    <Route name="submit" handler={SubmitView}/>
    <Route name="login" handler={LoginView}/>
    <DefaultRoute handler={HomeView}/>
  </Route>
);

Router.run(routes, function(Handler, state){
  var params = state.params;
  React.render(<Handler params={params}/>, document.body);
  console.log('test inside master routing');

  /*** Timer ***/ //for testing
  // var startTime = new Date();
  // var interval = 1000;
  // this.setState({elapsed:0}); //init
  // // TEST: set interval when the page loads?
  // setInterval(function(){
  //   var currentTime = new Date();
    
  //   this.setState({
  //     elapsed: Math.round((currentTime - startTime)/1000)
  //   });

  //   // console.log("TEST ----> elapsed=" + this.state.elapsed);
  // }.bind(this), interval); //setInterval
});

// Router.run(routes, "/test/", function(){
//   console.log('test inside ------> test routing');

// });



