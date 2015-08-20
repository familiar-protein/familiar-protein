var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Router = require('react-router');
var Navigation = Router.Navigation;
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var Link = Router.Link;

// var time = 0; 
// var startTime = new Date();
// var interval = 1000;

// // TEST: set interval when the page loads?
// setInterval(function(){
//   var currentTime = new Date();
//   time = Math.round((currentTime - startTime)/1000); 

//   console.log("TEST ----> time=" + time);
// }, interval);

var DetailView = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  mixins: [Navigation],

  getInitialState: function(){
    return {
      result: '',
      flag: '',
      solved: false,
      elapsed: 0 //initial time
    };
  },

  setRegex: function() {
    var value = this.refs.solutionText.getValue();
    var flag = this.refs.solutionTextFlags.getValue();
    var solved = this.isSolved(value, flag);
    this.setState({
      result: value,
      flag: flag,
      solved: solved
    });
  },

  checkTestCase: function(testCase, condition) {
    if(this.state.result===''){
      return 'unsolved';
    };
    try {
      var regex = new RegExp(this.state.result, this.state.flag);
      return regex.test(testCase) ? 'solved' : 'unsolved';
      // return regex.test(testCase) === condition ? 'solved' : 'unsolved';
    } catch(e) {
      return 'unsolved';
    }
  },

  displayTestCases: function(string, condition) { //string=truthy or falsy
    var question = this.props.questions[this.props.params.qNumber];
    return question[string].map(function(testCase) {
      return (
        <p key={testCase} className={this.checkTestCase(testCase, condition)}>{testCase}</p>
      )
    }.bind(this));
  },

  returnToMenu: function() {
    this.setState({
      result: '',
      flag: '',
      solved: false,
    });

    this.props.goToQuestionMenu();
  },

  isSolved: function(regexString, flag) {
    var question = this.props.questions[this.props.params.qNumber];

    var truthy = question['truthy']
    var falsy = question['falsy'];

    try {
      var regex = new RegExp(regexString, flag);

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
  componentDidMount: function(){
    /*** Timer ***/
    var startTime = new Date();
    var interval = 1000;
    this.setState({elapsed:0}); //init
    // TEST: set interval when the page loads?
    setInterval(function(){
      var currentTime = new Date();
      
      this.setState({
        elapsed: Math.round((currentTime - startTime)/1000)
      });

      // console.log("TEST ----> elapsed=" + this.state.elapsed);
    }.bind(this), interval); //setInterval

  },

  render: function() {
    // this.startTimer();
    /*** Questions ***/
    var question = this.props.questions[this.props.params.qNumber];

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
            <div className="col-sm-2 back">
              <RaisedButton label="Back" linkButton="true" href="/#/"/>
            </div>
        </div>

        <h2 className='timer'>Time Elapsed: {this.state.elapsed}</h2> {/*timer*/}
        
        <form className="form-inline text-center">
          <span className="solution">/<TextField hintText="You can solve it!" floatingLabelText="Regex solution..." type="text" ref="solutionText" onChange={this.setRegex} className="regex"/>/<TextField  floatingLabelText="Put your flags here..." type="text" ref="solutionTextFlags" onChange={this.setRegex} className="regex"/></span>

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
    )
  }
});

module.exports = DetailView;
