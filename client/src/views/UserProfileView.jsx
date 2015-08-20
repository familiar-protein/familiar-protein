var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var UserProfileContainer = React.createClass({
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
