var React = require('react');
// var If = require('../components/if.jsx');

var Router = require('react-router');
var Link = Router.Link;

var LoginView = React.createClass({


  // getRoute: function(){
  //   var currentRoutes = this.context.router.getCurrentRoutes();
  //   var activeRouteName = currentRoutes[currentRoutes.length - 1].name;
  //   return activeRouteName;
  // },

  render: function() {
    
    // var currentRoutes = this.conte
    // if (logI)
    
    // if (this.getRoute() === "login"){
      return (
        <div>
          <h1>Login</h1>
          <p>Username: <input type="text" /></p>
          <p>Password: <input type="password" /></p>
          <button type="button">Log In</button>
        </div>
      );
    // }

  }
});

module.exports = LoginView;