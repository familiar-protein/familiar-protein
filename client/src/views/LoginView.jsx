var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var LoginView = React.createClass({

  mixins: [Router.State],

  render: function() {
    
    console.log("PATH === ", this.getPath());
    if (this.getPath() === "/login"){
      return (
        <div>
          <h1>Login</h1>
          <p>Username: <input type="text" /></p>
          <p>Password: <input type="password" /></p>
          <button type="button">Log In</button>
          <Link to="signup" className="btn btn-primary">To Signup</Link>
        </div>
      );
    }else if (this.getPath() === "/signup"){
      return (
        <div>
          <h1>Sign Up</h1>
          <p>Username: <input type="text" /></p>
          <p>Password: <input type="password" /></p>
          <button type="button">Sign Up</button>
          <Link to="login" className="btn btn-primary">To Login</Link>
        </div>
      );
    }

  }
});

module.exports = LoginView;