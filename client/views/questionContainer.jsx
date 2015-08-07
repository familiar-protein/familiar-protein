var QuestionContainer = React.createClass({
  getInitialState: function(){
    return {result: ''};
  },
  submit: function(e){
    e.preventDefault();
    console.log(this);
    var iFlag = React.findDOMNode(this.refs.iFlag).value;
    var answer = React.findDOMNode(this.refs.solutionText).value;
    $.ajax({
      url: 'http://localhost:3000/questions/' + this.props.data[0].qNumber,
      method: "POST",
      regexString: answer,
      iFlag: iFlag,
      success: function(data){
        this.setState({result: data.result});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(xhr, status, err.message);
      }.bind(this)
    });
  },
  render: function() {
    if(this.props.data.length === 1){
      return (
        <div className="question-solve">
          <h2>{this.props.data[0].title}</h2>
          <p>{this.props.data[0].description}</p>
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
