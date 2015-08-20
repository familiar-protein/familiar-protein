var React = require('react');
var UserStore = require('../stores/UserStore');
var ViewActions = require('../actions/ViewActions');

var UserProfile = React.createClass({

  componentWillMount: function () {
    UserStore.addListener(this.onChange);
    ViewActions.getUserProfile();
  },

  onChange: function () {
    this.setState(UserStore.getUser());
  },

  render: function () {
    return (
      <div>
        <div>{this.state.username}</div>
      </div>
    );
  }
});

module.exports = UserProfile;