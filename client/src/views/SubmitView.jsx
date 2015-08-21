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
    var truthyVals = this.refs.passingTests.getValue().split('\n');
    truthyVals.forEach(function(item, index, array){
      if(item === ' ' || item === '' || item === undefined){
        array.splice(index, 1);
      }
    });
    return truthyVals;
  },

  falsy: function(){
    var falsyVals = this.refs.failingTests.getValue().split('\n');
    falsyVals.forEach(function(item, index, array){
      if(item === ' ' || item === ''){
        array.splice(index, 1);
      }
    });
    return falsyVals;
  },

  submit: function(question){
    console.log('submitted');
    var that = this;
    $.ajax({
      url: window.location.origin + '/questions',
      method: 'POST',
      data: JSON.stringify(question),
      dataType: 'json',
      success: function(data){
        that.setState({questions: that.props.questions.push(data)})
        console.log('success!', that.props.questions);
        location = "/#/questions";
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
      console.log(qNumber);
      this.submit({
        title: this.refs.challengeTitle.getValue(),
        description: this.refs.challengeDescription.getValue(),
        truthy: passing,
        falsy: failing,
        solution: this.refs.challengeAnswer.getValue(),
        qNumber: qNumber
      });
    }else{

      alert('Unable to submit, Your solution does not solve the problem. Please try again');
    }
  },

  render: function(){

    return(
      <div className="panel">
        <div className="panel-body">
        <h3>Submit your own challenge</h3>
          <form className="form-inline ">
          <div className="row"> 
            <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4 bottom-space">
              <TextField fullWidth="true" hintText="Give your challenge an interesting title." multiLine={true} type="text" ref="challengeTitle"/>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4 bottom-space">
              <TextField fullWidth="true" hintText="Enter a detailed description of your challenge here." multiLine={true} type="text" ref="challengeDescription"/>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4 bottom-space">
              <TextField fullWidth="true" hintText="Enter your answer in this format a{1}\(9\)." multiLine={true} onChange={this.createRegExp} type="text" ref="challengeAnswer"/>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4 bottom-space">
              <TextField fullWidth="true" hintText="Enter your flags in this format gi " multiLine={true} onChange={this.createRegExp} type="text" ref="challengeAnswerFlags"/>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4">
              <TextField fullWidth="true" hintText="Enter at least five examples that will pass your challenge seperated by new lines here." multiLine={true} type="text" ref="passingTests"/>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4">
              <TextField fullWidth="true" hintText="Enter at least five examples that will fail your challenge seperated by new lines here." multiLine={true} type="text" ref="failingTests"/>
            </div>
          </div>
            <button label="submit" className="btn btn-primary" onClick={this.checkTestCases}>
              Submit
              <div className="ripple-wrapper"></div>
            </button>
          </form>
        </div>
      </div>  

      

    );
  },

});

module.exports = SubmitView;
