var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var Link = Router.Link;

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var TextField = mui.TextField,
    RaisedButton = mui.RaisedButton,
    Paper = mui.Paper;


var UserView = React.createClass({
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
      // user: 'nobody'
    };
  },
  render: function() {
    // console.log('Props in userview render', this.props);
    var user = this.props.user;
    // google.username
    // score
    // if (user.google[name]) {
    //   var username = user.google.name;
    // } else {
    //   var username = null;
    // }
    var paper = (
    <Paper zDepth={1}>
      <p>zDepth=1</p>
    </Paper>
    )
    if (user.hasOwnProperty('google')) {
      console.log(user.google);
      user = user.google.name;
      // image = user.google.image; // weirdly, this fails.
    }
    return (<div className="container"> 
      <h1>{user}</h1>
      <Paper zDepth={1}>
      </Paper>
    </div>);
  }
})

module.exports = UserView;
