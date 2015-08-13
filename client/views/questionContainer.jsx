var QuestionContainer = React.createClass({
  getInitialState: function(){
    return {result: ''};
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
    var iFlag = React.findDOMNode(this.refs.iFlag).value;
    var answer = React.findDOMNode(this.refs.solutionText).value;
    var payload = JSON.stringify({regexString: answer, iFlag: iFlag});
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
    this.setState({
      result: React.findDOMNode(this.refs.solutionText).value
    });
  },

  checkTestCase: function(testCase) {
    var regex = new RegExp(this.state.result);
    return regex.test(testCase) ? 'solved' : 'unsolved';
  },

  displayTestCases: function(string) {
    console.log(this)
    var that = this;
    var question = this.props.data[this.props.currentQuestion];
    return question[string].map(function(testCase) {
      return (
        <p className={that.checkTestCase(testCase)}>{testCase}</p>
      )
    });
  },

  render: function() {
    var currentIndex = this.props.currentQuestion;
    console.log(currentIndex);
    if(currentIndex >= 0){
      return (
        <div className="question-solve">
          <a href="#" className="btn btn-primary" onClick={this.props.goToQuestionMenu}>Back</a>
          <h2>{this.props.data[currentIndex].title}</h2>
          <p>{this.props.data[currentIndex].description}</p>
          <div id="result">{this.state.result}</div>
          <form name="questionSolution" >
            <div className="form-group">
              <label for="iFlag">iFlag</label>
              <input placeholder="iFlag" className=".form-control" type="text" id="iFlag" ref="iFlag" />
            </div>
            <div className="form-group">
              <label class="col-sm-2 control-label" for="solution">Solution Regex</label>
              <div class="col-sm-10">
                <textarea onChange={this.setRegex} placeholder="Regex solution..." classsName=".form-control" id="solution" ref="solutionText"></textarea>
              </div>
            </div>
            <div className="col-sm-6">
              <h3>{'Should return true'}</h3>
              {this.displayTestCases('truthy')}
            </div>
            <div className="col-sm-6">
              <h3>{'Should return false'}</h3>
              {this.displayTestCases('falsy')}
            </div>
            <button onClick={this.submit} className="btn btn-primary" name="solutionButton">Check Answer!</button>
          </form>
        </div>
    );
  } else {
    var that = this;
    var questions = this.props.data.map(function(question, index) {
      return (
        <tr className="question">
          <td><b>{question.title}</b></td>
          <td><p>{question.description}</p></td>
          <td><a className="btn btn-primary" onClick={that.props.goToQuestionDetail.bind(this, index)} href="#" >Solve</a></td>
        </tr>
      )
    });
  }
    return (
      <table className="questionContainer table table-hover">
        <tbody>
          {questions}
        </tbody>
      </table>
    );
  }
});
