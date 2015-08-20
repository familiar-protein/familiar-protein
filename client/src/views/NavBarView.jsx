var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var NavBarView = React.createClass({
  render: function() {

    if (this.props.loggedIn) {
      var loginHTML = <a href="/logout">Logout</a>;
    } else {
      var loginHTML = <Link to="login">Login</Link>;
    }

    // console.log("Logged In NavBar ", this.props.loggedIn);
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="userProfile" className="navbar-brand" href="#">Brand</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
              <li><a href="#">Link</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Link</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><Link to="userProfile">Profile</Link></li>
                  <li><a href="#">Stats</a></li>
                  <li><a href="#">Settings</a></li>
                  <li role="separator" className="divider"></li>
                  <li>{loginHTML}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
});



module.exports = NavBarView;
