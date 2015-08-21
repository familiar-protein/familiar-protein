var React = require('react');
var UserStore = require('../stores/UserStore');
var ViewActions = require('../actions/ViewActions');
var Router = require('react-router');

var UserProfile = React.createClass({
  mixins: [Router.State],

  getInitialState: function () {
    return {
      username: null,
      user_id: null
    };
  },

  componentWillMount: function () {
    UserStore.addListener(this.onChange);
    ViewActions.getUserProfile(this.getPath().split('/')[2]);
  },

  onChange: function () {
    this.replaceState(UserStore.getProfile());
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