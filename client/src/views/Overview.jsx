var React = require('react');

var requireAuth = require('./authWrapper.jsx');
var Router = require('react-router');
var Link = Router.Link;
var UserStore = require('../stores/UserStore');
//requireAuth(
var OverView = React.createClass({
  render: function() {
    var questions = this.props.questions.map(function(question) {
      return (
        <tr key={question.qNumber} className="question">
          <td><b>{question.title}</b></td>
          <td><p>{question.description}</p></td>
          <td>
            {(UserStore.getUser().username != null) ?
              <Link to="question" params={{qNumber:question.qNumber}} className="btn btn-primary">Solve</Link> :
              <p>Log in to solve!</p>
            }
          </td>
        </tr>
      )
    });

    return (
      <div>
        <table className="questionContainer table table-hover">
          <tbody>
            {questions}
          </tbody>
        </table>
      </div>
    );
  }
});
//)

module.exports = OverView;