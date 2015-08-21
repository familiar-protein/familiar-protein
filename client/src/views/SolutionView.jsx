var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var SolutionStore = require('./../stores/SolutionStore');
var ViewActions = require('./../actions/ViewActions');

var SolutionView = React.createClass({

  getInitialState: function(){
    return {
      solutions: SolutionStore.getSolutions()
    };
  },

  getSolutions: function(){
    this.setState({solutions: SolutionStore.getSolutions()});
  },

  componentDidMount: function(){
    SolutionStore.addListener(this.getSolutions);
  },

  vote: function(solutionId){
    
    //TODO: Implement voting
    ViewActions.voteForSolution(solutionId);
  },

  render: function(){
    console.log("rendering");
    var context = this;
    var solutions = this.state.solutions.map(function(solution) {
      return (
        <tr key={solution.id}>
          <td className="solution-description">
            {solution.solution}
          </td>
          <td>{solution.votes}</td>
          <td>
            <button onClick={context.vote.bind(context, solution.id)} className="btn btn-primary">UpVote</button>
          </td>
        </tr>
      )
    });
    return(
      <div>
      <Link to="default" className="btn btn-primary home">Back to Problems</Link>

      <table>
        <tr>
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