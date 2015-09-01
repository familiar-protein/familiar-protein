var React = require('react');
var UserStore = require('../stores/UserStore');
var SolutionStore = require('../stores/SolutionStore');
var ViewActions = require('../actions/ViewActions');
var Router = require('react-router');
var Link = Router.Link;
var cookie = require('react-cookie');

var UserProfile = React.createClass({
  mixins: [Router.State],

  getInitialState: function () {
    var cookieName = this.getPath().split('/')[2];
    if (cookieName.length > 0) {
      cookie.save('cookieName', cookieName);
    }
    return {
      username: cookieName || this.props.username,
      user_id: null,
      solutions: []
    };
  },

  componentWillMount: function () {
    UserStore.addListener(this.onChange);
    SolutionStore.addListener(this.onChange);
    ViewActions.login(this.getPath().split('/')[2]);
    ViewActions.getUserProfile(this.getPath().split('/')[2]);
    ViewActions.loadAllSolutions();
    this.updateUserData();
    this.updateSolutions();
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
    this.forceUpdate();
  },

  solutions: function () {
    var id = this.state.user_id;
    return this.state.solutions
      .filter(function (solution) {
        return solution.userId === id;
      })
      .sort(function (solution1, solution2) {
        return solution1.votes < solution2.votes;
      })
      .map(function (solution) {
        return (<div>{solution.votes} - {solution.questionId.title} - {solution.content}</div>);
      });
  },

  render: function () {
    return (
      <div>
        <Link to="default" className="btn btn-primary home">Back to Problems</Link>
        <h2>{this.state.username}</h2>
        {this.solutions()}
      </div>
    );
  }
});

module.exports = UserProfile;