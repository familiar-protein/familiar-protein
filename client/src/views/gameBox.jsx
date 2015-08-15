var QuestionContainer = require('./questionContainer.jsx')
var Router = require('react-router');

var GameBox = React.createClass({
  mixins: [Router.Navigation],
  getInitialState: function(){
    return {
      questions: [],
      currentQuestion: -1
    };
  },

  goToQuestionDetail: function(index){
    var index = index;
    this.setState({
      currentQuestion: index
    });
    this.transitionTo('question', {qNumber: index});
  },

  goToQuestionMenu: function(){
    this.setState({
      currentQuestion: -1
    });
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
      }
    });
  },

  componentDidMount: function(){
    this.loadAllQuestions();
  },

  render: function() {
    return (
      <div className="gameBox">
        <h2 className="title">Regex Game</h2>
        <QuestionContainer
          data={this.state.questions}
          currentQuestion={this.state.currentQuestion}
          goToQuestionDetail={this.goToQuestionDetail}
          goToQuestionMenu={this.goToQuestionMenu}
        />
      </div>
    );
  }

});

module.exports = GameBox;
