var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Router = require('react-router');
var Navigation = Router.Navigation;
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var Link = Router.Link; 

var HomeView = React.createClass({
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
      // user: undefined
    };
  },
  render: function() {
    // console.log('Render called in HomeView', this.props);
    return (
      <div className="jumbotron" style={{marginTop: '0px', zindex: '0'}}>
      <div className="container">
        <h1>Welcome to the Regex Challenge</h1>
        <p>Learn how to use regex, solve challenges, earn points and compare your solutions.</p>
        <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more »</a></p>
      </div>
      </div>);
  }
});

module.exports = HomeView;
