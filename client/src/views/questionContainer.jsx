var QuestionContainer = React.createClass({
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

  submit: function(e){
    e.preventDefault();
    console.log(this);
    var answer = React.findDOMNode(this.refs.solutionText).value;
    var payload = JSON.stringify({regexString: answer});
    $.ajax({
      url: 'http://localhost:3000/questions/' + this.props.data[0].qNumber,
      method: "POST",
      contentType: "application/json",
      data: payload,
      success: function(data){
        this.setState({result: data.result});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(xhr, status, err.message);
      }.bind(this)
    });
  },

  setRegex: function() {
    var value = React.findDOMNode(this.refs.solutionText).value;
    var solved = this.isSolved(value)
    this.setState({
      result: value,
      solved: solved
    });
  },

  checkTestCase: function(testCase, condition) {
    var regex = new RegExp(this.state.result);
    return regex.test(testCase) === condition ? 'solved' : 'unsolved';
  },

  displayTestCases: function(string, condition) {
    var question = this.props.data[this.props.currentQuestion];
    return question[string].map(function(testCase) {
      return (
        <p className={this.checkTestCase(testCase, condition)}>{testCase}</p>
      )
    }.bind(this));
  },

  isSolved: function(regexString) {
    var question = this.props.data[this.props.currentQuestion];

    var truthy = question['truthy']
    var falsy = question['falsy'];
    var regex = new RegExp(regexString);

    var solvedTruthy = truthy.reduce(function(result, current) {
      return result && regex.test(current);
    }, true);

    var solvedFalsy = falsy.reduce(function(result, current) {
      return result && !regex.test(current);
    }, true);

    return solvedTruthy && solvedFalsy;
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
              <a href="#" className="btn btn-primary back" onClick={this.props.goToQuestionMenu}>Back</a>
            </div>
          </div>

          <form className="form-inline text-center">
            <span className="solution">/<textarea ref="solutionText" onChange={this.setRegex} rows="1" cols="50" type="text" className="regex form-control" placeholder="Regex solution..."></textarea>/</span>
          </form>

          <div>

            {this.state.solved ? <h3 className="success">Success!!! Solved All Test Cases!</h3> : null}

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
        return (
          <tr className="question">
            <td><b>{question.title}</b></td>
            <td><p>{question.description}</p></td>
            <td><a className="btn btn-primary" onClick={this.props.goToQuestionDetail.bind(this, index)} href="#" >Solve</a></td>
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
