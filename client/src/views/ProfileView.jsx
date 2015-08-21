var React = require('react');
var UserStore = require('../stores/UserStore');
var SolutionStore = require('../stores/SolutionStore');
var ViewActions = require('../actions/ViewActions');
var Router = require('react-router');

var UserProfile = React.createClass({
  mixins: [Router.State],

  getInitialState: function () {
    return {
      username: null,
      user_id: null,
      solutions: []
    };
  },

  componentWillMount: function () {
    UserStore.addListener(this.onChange);
    SolutionStore.addListener(this.onChange);
    ViewActions.getUserProfile(this.getPath().split('/')[2]);
    ViewActions.loadAllSolutions();
  },

  updateUserData: function () {
    var userData = UserStore.getProfile();
    this.state.username = userData.username;
    this.state.user_id = userData.user_id;
  },

  updateSolutions: function () {
    this.state.solutions = SolutionStore.getAllSolutions();
  },

  onChange: function () {
    this.updateUserData();
    this.updateSolutions();
    console.log('change', this.state);
  },

  solutions: function () {
    var id = this.state.user_id;
    return this.state.solutions
      .filter(function (solution) {
        return solution.userId === id;
      })
      .sort(function (solution1, solution2) {
        return solution1.votes > solution2.votes;
      })
      .map(function (solution) {
        return (<div>{solution.votes} - {solution.content}</div>);
      });
  },

  render: function () {
    console.log()
    return (
      <div>
        <h2>{this.state.username}</h2>
        {this.solutions()}
      </div>
    );
  }
});

module.exports = UserProfile;