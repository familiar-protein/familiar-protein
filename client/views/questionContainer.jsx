var QuestionContainer = React.createClass({
  getInitialState: function(){
    return {result: '', iFlag: false};
  },
  submit: function(e){
    e.preventDefault();
    console.log(this);
    var iFlag = (this.state.iFlag === true) ? 'i' : '';
    console.log(iFlag);
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
  handleFlagChange: function(){
    $("#iFlag").toggleClass("active");
    this.setState({
      iFlag: !this.state.iFlag, 
      questions: this.state.questions
    });
  },
  render: function() {
    if(this.props.data.length === 1){
      return (
        <div className="question-solve">
          <a href="#" className="btn btn-primary" onClick={function(){dispatcher.dispatch({action: "StateRevert"}) }}>Back</a>
          <h2>{this.props.data[0].title}</h2>
          <p>{this.props.data[0].description}</p>
          <div id="result">{this.state.result}</div>
          <form name="questionSolution" >
            <div className="form-group">
              /<input placeholder="Regex solution..." classsName=".form-control" id="solution" ref="solutionText"></input>/
              <button id="iFlag" onClick={this.handleFlagChange} className="btn" >i</button>
            </div>
            <button onClick={this.submit} className="btn btn-primary" name="solutionButton">Check Answer!</button>
          </form>
        </div>
    );
  } else {
    var questions = this.props.data.map(function(question) {
      return (
        <tr className="question">
          <td><b>{question.title}</b></td>
          <td><p>{question.description}</p></td>
          <td><a className="btn btn-primary" onClick={function() {dispatcher.dispatch({action: "StateChange", questions: [question]})}} href="#" >Solve</a></td>
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
