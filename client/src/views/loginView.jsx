var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var Login = React.createClass({
  componentDidMount: function(){
    if (this.loggedin()) {
      // let's logout
      var that = this;
      console.log('loggedin true');
      $.ajax({
        url: window.location.origin + '/logout',
        method: 'GET',
        success: function() {
          console.log('Successfully logged out');
          location = '/';
        }
      });
    } else {
      // let's login
      console.log('loggedin false');
      location = '/auth/google';
    }
  },

  loggedin: function(){
    if (this.props.user !== undefined) {
      return true;
    }
    return false;
  },

  render: function(){

    return (
      <div className="panel">
        <div className="panel-body row"><div className="col-xs-12">
        <p>Please wait ... </p>
        </div></div>
      </div>
    );
  }
})

module.exports = Login;
