var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var SolutionStore = require('./../stores/SolutionStore');
var ViewActions = require('./../actions/ViewActions');

var SolutionView = React.createClass({

  getInitialState: function(){
    return {
      solutions: SolutionStore.getSolutions(),
      voted: false
    };
  },

  getSolutions: function(){
    this.setState({solutions: SolutionStore.getSolutions()});
  },

  componentDidMount: function(){
    SolutionStore.addListener(this.getSolutions);
  },

  componentWillUnmount: function(){
    // console.log("unmounted");
    SolutionStore.removeChangeListener(this.getSolutions);
  },

  vote: function(solution){
    
    //TODO: Implement voting
    ViewActions.voteForSolution(solution);
    this.setState({voted: true});
  },

  render: function(){
    var context = this;
    var solutions = this.state.solutions.map(function(solution) {
      return (
        <tr key={solution._id}>
        <td className="solution-description">
          {solution.userId.username}
        </td>
          <td className="solution-description">
            {solution.content}
          </td>
          <td>{solution.votes || 0}</td>
          <td>
            {context.state.voted === false ? <button onClick={context.vote.bind(context, solution)} className="btn btn-primary">UpVote</button> : null}
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