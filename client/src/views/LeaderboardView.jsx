var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var SolutionStore = require('./../stores/SolutionStore');
var UserStore = require('./../stores/UserStore');
var ViewActions = require('./../actions/ViewActions');

var LeaderboardView = React.createClass({

  getInitialState: function(){
    return {
      users: null,
      solutions: SolutionStore.getAllSolutions()
    };
  },

  getUsers: function(){
    this.setState({users: UserStore.getUsers()});
    console.log('users:', this.state.users);
  },

  getSolutions: function(){
    // this.setState({solutions: SolutionStore.getAllSolutions()});
  },

  componentDidMount: function () {
    UserStore.addUsersListener(this.getUsers);
    SolutionStore.addListener(this.getSolutions);
    this.populateUsers();
  },

  populateSolutions: function (){
    ViewActions.getAllUsers();
  },

  populateUsers: function(){
    ViewActions.getAllUsers();
  },

  render: function(){

    return(
      <div>Leaderboard View</div>
    );
  }
});

module.exports = LeaderboardView;