var GameBox = React.createClass({
  getInitialState: function(){
    return {questions: []}
  },
  changeView: function(question){
    this.setState({questions: [question]});
  },
  loadAllQuestions: function(){
    $.ajax({
      url: 'http://localhost:3000/questions',
      method: 'GET',
      dataType: 'json',
      success: function(data){
        data.sort(function(a, b){
          return a.qNumber - b.qNumber;
        });
        this.setState({questions: data});

      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
      }.bind(this)
    });
  },
  componentDidMount: function(){
    dispatcher.register(function(payload){
      if(payload.action === "StateChange"){
        this.setState({questions: payload.questions});
      }
    }.bind(this));
    dispatcher.register(function(payload){
      if(payload.action === "StateRevert"){
        console.log("Back");
        this.loadAllQuestions();
      }
    }.bind(this));
    this.loadAllQuestions();
  },
  render: function() {
    return (
      <div className="gameBox">
        <h2 className="title">Regex Game</h2>
        <QuestionContainer data={this.state.questions} />
      </div>
    );
  }
});
