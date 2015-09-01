var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var ViewActions = require('./../actions/ViewActions');
var SolutionStore = require('./../stores/SolutionStore');
var UserStore = require('./../stores/UserStore');


var DetailView = React.createClass({
  mixins: [Navigation],

  getInitialState: function(){
    return {
      result: '',
      solved: false,
      solutions: [],
      question: this.props.questions[this.props.params.qNumber - 1],
      
      // TODO: Change to get from User Store
      user: UserStore.getUser()
    };
  },

  getSolutions: function(){
    this.state.solutions = SolutionStore.getSolutions();
  },

  componentDidMount: function(){
    var context = this;
    SolutionStore.addListener(this.getSolutions);
  },

  setRegex: function() {
    var value = React.findDOMNode(this.refs.solutionText).value;
    var solved = this.isSolved(value);

    if(solved){

      // TODO: Post new solution to server
      ViewActions.postNewSolution(this.state.question._id,this.state.user.user_id, value, this.state.user.username);

      // Retrieve solutions to current question
      // ViewActions.loadSolutions(this.state.question._id);

    }

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
    var question = this.props.questions[this.props.params.qNumber - 1];
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
    var question = this.props.questions[this.props.params.qNumber - 1];

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
    var question = this.props.questions[this.props.params.qNumber - 1];

    if (this.props.questions.length > 0 && question === undefined) {
      this.transitionTo('/');
    }


    // makes sure that the questions are loaded from the database before rendering the view
    try {
      question.title;
    } catch(e) {
      return <div></div>;
    }

    return (
      <div className="question-solve">
        <div className="row">
          <div className="col-sm-10">
            <h2>{question.title}</h2>
            <p>{question.description}</p>
          </div>

          <div className="col-sm-2">
            <Link to="default" className="btn btn-primary back">Back</Link>
          </div>
        </div>

        <form className="form-inline text-center">
          <span className="solution">/<textarea ref="solutionText" onChange={this.setRegex} rows="1" cols="50" type="text" className="regex form-control" placeholder="Regex solution..."></textarea>/</span>

          {this.state.solved === null ? <p className="error-msg">Please provide valid regular expression</p> : null}
          {this.state.solved ? <h3 className="success">Success!!! Solved All Test Cases!</h3> : null}
          {this.state.solved ? <Link to="solutions" className="btn btn-primary back">View Past Solutions</Link> : null}
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
    )
  }
});

module.exports = DetailView;
