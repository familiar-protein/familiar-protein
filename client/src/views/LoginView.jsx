var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var LoginView = React.createClass({

  mixins: [Router.State, Router.Navigation],

  signUpLogin: function(){

    var user = {
      username: this.refs.username.getDOMNode().value,
      password: this.refs.password.getDOMNode().value
    };
    
    if (this.getPath() === "/signup") {
      user.name = this.refs.realname.getDOMNode().value || null;
      user.image = this.refs.imageurl.getDOMNode().value || null;
    }


    $.ajax({
      url: window.location.origin + this.getPath(),
      method: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(user),
      success: function(data){
        //console.log("Successful signup | login", data);
        this.transitionTo('default');
        // navigate to the other screen
      }.bind(this),
      error: function(xhr, status, err){
        console.log("ERROR in ajax", err);
      }
    });
  },

  render: function() {
    
    if (this.getPath() === "/login"){
      return (
        <div>
          <h1>Login</h1>
          <p>Username: <input type="text" ref="username" required/></p>
          <p>Password: <input type="password" ref="password" required/></p>
          <button type="button" onClick={this.signUpLogin}>Log In</button>
          <Link to="signup" className="btn btn-primary">To Signup</Link>
        </div>
      );
    }else if (this.getPath() === "/signup"){
      return (
        <div>
          <h1>Sign Up</h1>
          <p>Username: <input type="text" ref="username" required/></p>
          <p>Password: <input type="password" ref="password" required/></p>
          <p>Name: <input type="text" ref="realname"/></p>
          <p>Image URL: <input type="text" ref="imageurl"/></p>
          <button type="button" onClick={this.signUpLogin}>Sign Up</button>
          <Link to="login" className="btn btn-primary">To Login</Link>
        </div>
      );
    }

  }
});

module.exports = LoginView;