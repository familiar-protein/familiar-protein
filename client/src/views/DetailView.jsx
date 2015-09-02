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

var DetailView = React.createClass({

  statics: {
    // willTransitionTo: function (transition, params, query, callback) {
    //   console.log('TEST---> everytime this loads');
    // } // willTransitionTo()
    willTransitionTo: function(){
      console.log("TEST --> willTransitionTo");
      // this.startTimer();
    } //willTransitionTo()
  }, //statics
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
      elapsed: 0, //initial time
      startTime: new Date()
    };
  },

  setRegex: function() { //called when changes are made to the solution
    var value = this.refs.solutionText.getValue();
    var flag = this.refs.solutionTextFlags.getValue();
    var solved = this.isSolved(value);
    this.setState({
      result: value,
      flag: flag,
      solved: solved
    });

    if(solved===true){ // send data to server when solution is found
      this.stopTimer();
      this.submitSolution();
    } //if
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
    var question = this.props.questions[this.props.params.qNumber]; //find info based on q_id
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
  componentDidMount: function(){ //begins the timer, only once when component becomes mounted 
    /*** Timer ***/
    // var startTime = new Date();
    this.startTimer();
  },
  startTimer: function(){
    var interval = 1000;
    // this.setState({elapsed:0}); //init
    // TEST: set interval when the page loads?
    this.setState({
      timer: setInterval(function(){
          var currentTime = new Date();
          
          this.setState({
            elapsed: Math.round((currentTime - this.state.startTime)/1000)
          });
          // console.log("TEST ----> elapsed=" + this.state.elapsed);
        }.bind(this), interval), //setInterval
      timerRunning: true
    }); //setState

  }, //startTimer()
  stopTimer:function(){
    clearInterval(this.state.timer);
  }, //stopTimer()
  nextProblem: function(){ //reset timer and solved when user clicks next problem link
    this.setState({
      'solved':false,
      'elapsed':0,
      'startTime':new Date(),
      'result': ''
    });

    this.startTimer();
  },
  calcScore: function(){
    //variables: elapsed, length;
    var time = this.state.elapsed; //25 +/- 25 seconds, +/- up to 30 points
    var length = this.state.result.length; //10 +/- 15 letters, +/- up to 30 points
    var score = 50-(time-25)*30/25-(length-10)*30/15;
    return score;
  },  
  submitSolution: function(data){ //submit user solution to database
    console.log('TEST inside submitSolution');
      
    try{
      console.log("TEST ----> user=", this.props.user);
      var user = this.props.user;
      
      $.ajax({
        url: window.location.origin + '/user/solved',
        method: 'POST',
        data: JSON.stringify({
          u_id: user._id,
          q_id: this.props.params.qNumber,
          solution: this.state.result,
          time: this.state.elapsed,
        }),
        dataType: 'json',
        success: function(){
          console.log('success!');
        },
        error: function(xhr, status, err){
          console.log(err);
          alert("You must login before you can save your score.");
        }
      }); //ajax
    }catch(err){
      console.log('User not found! Error: '+err);
    } //try

  }, //submitSolution()
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

      <div className="panel question-solved col-xs-12 ">
        <div className="row">
          <div className="col-xs-10 col-sm-8">
            <h2>{question.title}</h2>
            <p>{question.description}</p>
          </div>
          <div className="col-xs-2 col-sm-4 back ">
            <RaisedButton label="Back" linkButton="true" href="/#/questions"/>
          </div>
        </div>{/*question-solve*/}
        
        <div className='row'>
          <div className="col-sm-12">
            <h2 className='timer'>Time Elapsed: {this.state.elapsed}</h2> {/*timer*/}
          </div>
        </div>
        
        <div className='row'>
          <div className="col-sm-12">
            <form className="form-inline text-center">
              <span className="solution">/<TextField value={this.state.result} hintText="You can solve it!" floatingLabelText="Regex solution..." type="text" ref="solutionText" onChange={this.setRegex} className="regex"/>/<TextField  floatingLabelText="Put your flags here..." type="text" ref="solutionTextFlags" onChange={this.setRegex} className="regex"/></span>

              {this.state.solved === null ? <p className="error-msg">Please provide valid regular expression</p> : null}
              {(function(){ //custom function which injects code based on if statement
                // console.log('TEST state.solved = '+this.state.solved);
                if(this.state.solved){
                  return (
                    <h3 className='success'>
                      {"Success!!! You earned "}<span>{this.calcScore()}</span>{" points. "}
                     <a href={"/#/question/"+(parseInt(this.props.params.qNumber)+1)} onClick={this.nextProblem} /*onClick={this.submitSolution}*/>Next Problem</a>
                    </h3>
                  )//return 
                }else{
                  return null;
                }
              }.bind(this))()} 
            </form>
          </div>
        </div>

        <div className="test-cases row">
          <div className='col-xs-12'>
            <p className="instruction">{'Make all words turn green to complete the challenge'}</p>
          </div>
        </div>

        <div className='row'>
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
    ) //return 
  } //render()
}); //detailView

module.exports = DetailView;
