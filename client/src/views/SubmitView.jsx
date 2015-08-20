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

var SubmitView = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  mixins: [Navigation],

  createRegExp: function(){
    var reg = this.refs.challengeAnswer.getValue();
    var flag = this.refs.challengeAnswerFlags.getValue();
    return new RegExp(reg, flag);
  },

  truthy: function(){
    var truthyVals = this.refs.passingTests.getValue();
    return truthyVals.split(' ');
  },

  falsy: function(){
    var falsyVals = this.refs.failingTests.getValue();
    return falsyVals.split(' ');
  },

  submit: function(question){
    console.log('submitted');
    $.ajax({
      url: window.location.origin + '/questions',
      method: 'POST',
      data: JSON.stringify(question),
      dataType: 'json',
      success: function(){
        console.log('success!');
      },
      error: function(xhr, status, err){
        alert("Something didn't work, please try again.");
        console.log(err);
      }
    });
  },

  checkTestCases: function(){
    var regex = this.createRegExp();
    var qNumber = this.props.questions.length;
    var passing = this.truthy();
    var failing = this.falsy();
    var passTruthy = true;
    var passFalsy = true;
    passing.forEach(function(item){
      if(!regex.test(item)){
        passTruthy = false;
      }
      // the following line of code is required to work around a bug in ECMA script 3 go to http://stackoverflow.com/questions/3891641/regex-test-only-works-every-other-time to see why
      regex.test(item);
    });
    failing.forEach(function(item){
      if(regex.test(item)){
        passFalsy = false;
      }
      // the following line of code is required to work around a bug in ECMA script 3 go to http://stackoverflow.com/questions/3891641/regex-test-only-works-every-other-time to see why
      regex.test(item);
    });
    if(passTruthy && passFalsy){
      //if all test 'pass' then submit a question object to the server
      console.log('passing');
      console.log(qNumber);
      qNumber++;
      console.log(qNumber);
      this.submit({
        title: this.refs.challengeTitle.getValue(),
        description: this.refs.challengeDescription.getValue(),
        truthy: passing,
        falsy: failing,
        solution: this.refs.challengeAnswer.getValue(),
        qNumber: qNumber
      });
    }
  },

  render: function(){

    return(
      <div className="container">
        <h3>Submit your own challenge</h3>
        <div className="container">
          <form className="form-inline text-center">
            <div className="container bottom-space">
              <TextField hintText="Give your challenge an interesting title." multiLine={true} type="text" ref="challengeTitle"/>
            </div>
            <div className="container bottom-space">
              <TextField hintText="Enter a detailed description of your challenge here." multiLine={true} type="text" ref="challengeDescription"/>
            </div>
            <div className="container row">
              <div className="col-md-6 bottom-space">
                <TextField hintText="Enter your answer in this format a{1}\(9\)." multiLine={true} onChange={this.createRegExp} type="text" ref="challengeAnswer"/>
              </div>
              <div className="col-md-6 bottom-space">
                <TextField hintText="Enter your flags in this format gi " multiLine={true} onChange={this.createRegExp} type="text" ref="challengeAnswerFlags"/>
              </div>
            </div>
            <div className="container row">
              <div className="col-md-6">
                <TextField hintText="Enter at least five examples that will pass your challenge here." multiLine={true} type="text" ref="passingTests"/>
              </div>
              <div className="col-md-6">
                <TextField hintText="Enter at least five examples that will fail your challenge here." multiLine={true} type="text" ref="failingTests"/>
              </div>
            </div>

              <RaisedButton label="Submit" onClick={this.checkTestCases}/>
              
          </form>
        </div>
      </div>  

    );
  },

});

module.exports = SubmitView;