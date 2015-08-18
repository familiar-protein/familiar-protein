var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var UserProfileContainer = React.createClass({
	render: function() {
		return (
			<div>
				<UserInfo />
			</div>
		)
	}
});

var UserInfo = React.createClass({
	render: function() {
		return (
			<div>
				<img src="http://placekitten.com/g/200/300" />
				<h2>Name</h2>
				<p>email@email.com</p>
			</div>
		);
	}
});

module.exports = UserProfileContainer;
