var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var SolutionStore = require('./../stores/SolutionStore');

var SolutionView = React.createClass({

  getInitialState: function(){
    console.log('here');
    return {
      solutions: SolutionStore.getSolutions()
    };
  },

  render: function(){

    var solutions = this.state.solutions.map(function(solution) {
      return (
        <tr key={solution.id}>
          <td className="solution-description">
            {solution.solution}
          </td>
          <td>
          <button className="btn btn-primary">UpVote</button>
          </td>
        </tr>
      )
    });
    return(
      <div>
      <Link to="default" className="btn btn-primary home">Back to Problems</Link>

      <table>
        {solutions}
      </table>
      </div>
    );
  }
});

module.exports = SolutionView;