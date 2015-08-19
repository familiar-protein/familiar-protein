var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var UserProfileContainer = React.createClass({
	render: function() {
		return (
			<div class='col-md-6'>
				<UserInfo user={this.props.user}/>
			</div>
		)
	}
});

var UserInfo = React.createClass({
	render: function() {
		return (
			<div>
				<img src="http://placekitten.com/g/200/300" />
				<h2>{this.props.user.name}</h2>
				<p>{this.props.user.email}</p>
			</div>
		);
	}
});

module.exports = UserProfileContainer;
