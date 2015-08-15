var Router = require('react-router');

var QuestionContainer = React.createClass({
  mixins: [Router.Navigation],
  getInitialState: function(){
    return {
      result: '',
      solved: false
    };
  },

  // proptype validation: errors will show in console!
  propTypes: {
    data: React.PropTypes.array.isRequired,
    currentQuestion: React.PropTypes.number.isRequired,
    goToQuestionDetail: React.PropTypes.func.isRequired,
    goToQuestionMenu: React.PropTypes.func.isRequired,
  },

  setRegex: function() {
    var value = React.findDOMNode(this.refs.solutionText).value;
    var solved = this.isSolved(value);
    this.setState({
      result: value,
      solved: solved
    });
  },

  checkTestCase: function(testCase, condition) {
    try {
      var regex = new RegExp(this.state.result);
      return regex.test(testCase) === condition ? 'solved' : 'unsolved';
    } catch(e) {
      return 'unsolved';
    }
  },

  displayTestCases: function(string, condition) {
    var question = this.props.data[this.props.currentQuestion];
    return question[string].map(function(testCase) {
      return (
        <p key={testCase} className={this.checkTestCase(testCase, condition)}>{testCase}</p>
      )
    }.bind(this));
  },

  returnToMenu: function() {
    this.setState({
      result: '',
      solved: false,
    });

    this.props.goToQuestionMenu();
  },

  isSolved: function(regexString) {
    var question = this.props.data[this.props.currentQuestion];

    var truthy = question['truthy']
    var falsy = question['falsy'];

    try {
      var regex = new RegExp(regexString);

      var solvedTruthy = truthy.reduce(function(result, current) {
        return result && regex.test(current);
      }, true);

      var solvedFalsy = falsy.reduce(function(result, current) {
        return result && !regex.test(current);
      }, true);

      return solvedTruthy && solvedFalsy;
    } catch(e) {
      return null;
    }
  },

  render: function() {
    var currentIndex = this.props.currentQuestion;
    if(currentIndex >= 0){
      return (
        <div className="question-solve">
          <div className="row">
            <div className="col-sm-10">
              <h2>{this.props.data[currentIndex].title}</h2>
              <p>{this.props.data[currentIndex].description}</p>
            </div>

            <div className="col-sm-2">
              <a href="#" className="btn btn-primary back" onClick={this.returnToMenu}>Back</a>
            </div>
          </div>

          <form className="form-inline text-center">
            <span className="solution">/<textarea ref="solutionText" onChange={this.setRegex} rows="1" cols="50" type="text" className="regex form-control" placeholder="Regex solution..."></textarea>/</span>

            {this.state.solved === null ? <p className="error-msg">Please provide valid regular expression</p> : null}
            {this.state.solved ? <h3 className="success">Success!!! Solved All Test Cases!</h3> : null}
          </form>

          <div className="test-cases">


            <p className="instruction">{'Make all words turn green to complete the challenge'}</p>
            <div className="col-sm-6 text-center">
              <h3>{'Should match'}</h3>
              {this.displayTestCases('truthy', true)}
            </div>
            <div className="col-sm-6 text-center">
              <h3>{'Should not match'}</h3>
              {this.displayTestCases('falsy', false)}
            </div>

          </div>
        </div>
      );
    } else {
      var questions = this.props.data.map(function(question, index) {
        var link = "#/" + question.qNumber
        return (
          <tr key={question.qNumber} className="question">
            <td><b>{question.title}</b></td>
            <td><p>{question.description}</p></td>
            <td><a className="btn btn-primary" onClick={this.props.goToQuestionDetail.bind(null, index) } href={link}>Solve</a></td>
          </tr>
        )
      }.bind(this));
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
  }
});

module.exports = QuestionContainer;
