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
      solutions: SolutionStore.getAllSolutions(),
      usersolutions: []
    };
  },

  getUsers: function(){
    this.setState({users: UserStore.getUsers()});
    // console.log('users:', this.state.users);
    // console.log('solutions:', this.state.solutions);
    this.populateUserSolutions();
  },

  populateUserSolutions: function(){
    var userSolutionsArr = [];
    for(var i = 0; i < this.state.users.length; i++){
      var userSolutions = {};
      userSolutions['username'] = this.state.users[i].username;
      userSolutions['totalVotes'] = 0;
      userSolutions['totalAnswers'] = 0;
      //console.log(this.state.users[i]);
      for(var j = 0; j < this.state.solutions.length; j++){
        //console.log(this.state.solutions[i]);
        if(this.state.solutions[j].userId === this.state.users[i]._id ){
          //console.log('match');
          userSolutions['totalAnswers'] += 1;
          userSolutions['totalVotes'] += this.state.solutions[j].votes;
        }
      }
      userSolutionsArr.push(userSolutions);
    }
    this.setState({usersolutions: userSolutionsArr});
    //console.log(this.state.usersolutions);
  },

  getSolutions: function(){
    this.setState({solutions: SolutionStore.getAllSolutions()});
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
    var usersolutions = this.state.usersolutions.map(function(usersolution) {
      return (
        <tr>
        <td>
          {usersolution.username}
        </td>
          <td>
            {usersolution.totalAnswers}
          </td>
          <td>{usersolution.totalVotes}</td>

        </tr>
      )
    });
    return(
      <div>
      <Link to="default" className="btn btn-primary home">Back to Problems</Link>
      <h3>Leaderboard</h3>
      <table>
      <tr>
        <td><strong>User</strong></td>
        <td><strong>Questions Answered</strong></td>
        <td><strong>Total Votes</strong></td>
      </tr>
      {usersolutions}
      </table>
      </div>
    );
  }
});

module.exports = LeaderboardView;