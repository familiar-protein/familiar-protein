var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var UserProfileContainer = React.createClass({
  getInitialState: function(){
    return {
    	username: null
    };
  },

	componentDidMount: function () {
		var username = this.props.params.username;
		this.setState({username: username}, function() {
			console.log("USERNAME... hopefully... ", this.state.username);
		
			// Initiate AJAX request to get some new data.
			this.getUserData();
		});
	},

	// This stuff might not work exactly right.
	// TODO: Potentially remove this stuff! HEYO.
  componentDidUpdate: function() {
  	if (this.props.params.username !== this.state.username) {
			this.setState({username: username}, function() {
				console.log("USERNAME... hopefully... ", this.state.username);
			});
  	}
  },

  getUserData: function(username) {
    $.ajax({
      url: window.location.origin + '/user/' + this.state.username,
      method: 'GET',
      dataType: 'json',
      success: function(data){

      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
      }
    });
  },

	render: function() {
		return (
			<div>
				<UserInfo user={this.props.user} />
				{ /* // <UserSolved user={} question={} />*/ }
			</div>
		);
	}
});

var UserInfo = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-md-1">
					<img className="img-responsive" src="https://placehold.it/50x50" />
				</div>
				<div className="col-md-1">
					<h2>{this.props.user.name}</h2>
					<p>{this.props.user.email}</p>
				</div>
			</div>
		);
	}
});

/*
var UserSolved = React.createClass({
	var userSolvedQuestions = this.props.userSolvedQuestions
	render: function() {
		return (

		);
	}
});
*/

module.exports = UserProfileContainer;
