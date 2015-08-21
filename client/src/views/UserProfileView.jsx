var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var UserProfileContainer = React.createClass({
  getInitialState: function(){
    return {
    	username: null,
    	user: {}
    };
  },

	componentDidMount: function () {
		// var username = this.props.params.username;
		// this.getUserData(this.props.params.username);

		// this.setState({username: username}, function() {
		// 	console.log("USERNAME... hopefully... ", this.state.username);
		
		// 	// Initiate AJAX request to get some new data.
		// });
	},

	// This stuff might not work exactly right.
	// TODO: Potentially remove this stuff! HEYO.
  componentDidUpdate: function() {
		var username = this.props.params.username;

		if (username !== this.state.username) {
			this.setState({username: username}, function() {
				this.getUserData(this.props.params.username);
			});
		}
  },

  getUserData: function(username) {
    $.ajax({
      url: window.location.origin + '/user?username=' + username,
      method: 'GET',
      dataType: 'json',
      success: function(data){
      	// console.log("AJAX: ", data.userInfo);
      	this.setState({
      		username: data.userInfo.username,
      		user: data.userInfo
      	}, function () {
      		console.log("AJAX RESPONSE: ", this.state.user);
      	})
      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
      }
    });
  },

	render: function() {
		return (
			<div>
				<UserInfo user={this.state.user} />
				{ /* // <UserSolved user={} question={} />*/ }
			</div>
		);
	}
});

var UserInfo = React.createClass({
	render: function() {
		console.log("Render Bullshit: ", this.props.user);
		return (
			<div className="row">
				<div className="col-md-1">
					<img className="img-responsive" src="https://placehold.it/50x50" />
				</div>
				<div className="col-md-1">
					<h2>{this.props.user.username}</h2>
					<p>Email: </p>
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