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
              <label for="solution">Solution Regex</label>
              <textarea placeholder="Regex solution..." classsName=".form-control" id="solution" ref="solutionText"></textarea>
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
