var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var SolutionStore = require('./../stores/SolutionStore');
var UserStore = require('../stores/UserStore');
var ViewActions = require('./../actions/ViewActions');

var SolutionView = React.createClass({

  getInitialState: function(){
    return {
      solutions: SolutionStore.getSolutions(),
      voted: {}
    };
  },

  getSolutions: function(){
    this.setState({solutions: SolutionStore.getSolutions()});
  },

  componentDidMount: function(){
    SolutionStore.addListener(this.getSolutions);
    this.getSolutions();
    console.log(SolutionStore.getSolutions());
  },

  componentWillUnmount: function(){
    // console.log("unmounted");
    SolutionStore.removeChangeListener(this.getSolutions);
  },

  vote: function(solution, i){
    
    //TODO: Implement voting
    ViewActions.voteForSolution(solution, UserStore.getUser().username);
    var votedObj = this.state.voted;
    votedObj[i] = true;
    this.setState({voted: votedObj});
  },

  render: function(){
    var context = this;
    var solutions = this.state.solutions.map(function(solution, i) {
      return (
        <tr key={i}>
          <td className="solution-description">
            {solution.userId ? solution.userId.username : 'anonymous'}
          </td>
          <td className="solution-description">
            {solution.content}
          </td>
          <td>{solution.votes || 0}</td>
          <td>
            {solution.voters.indexOf(UserStore.getUser().username) === -1 ?
              <button onClick={context.vote.bind(context, solution, i)} className="btn btn-primary">UpVote</button> : null}
          </td>
        </tr>
      )
    });
    return(
      <div>
      <Link to="default" className="btn btn-primary home">Back to Problems</Link>
      <h2>Solutions</h2>
      <table>
        <tr>
          <td><strong>User</strong></td>
          <td><strong>Solution</strong></td>
          <td><strong>Votes</strong></td>
        </tr>
        {solutions}
      </table>
      </div>
    );
  }
});

module.exports = SolutionView;