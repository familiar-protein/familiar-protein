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
    var value = this.refs.challengeAnswer.getValue();
    return new RegExp(value);
  },

  truthy: function(){
    var truthyVals = this.refs.passingTests.getValue();
    return truthyVals.split(' ');
  },

  falsy: function(){
    var falsy = this.refs.failingTests.getValue();
    return falsy.split(' ');
  },

  checkTestCases: function(){
    var regex = this.createRegExp();
    var passing = this.truthy();
    var failing = this.falsy();
    var passTruthy = true;
    var passFalsy = true;
    passing.forEach(function(item){
      if(!regex.test(item)){
        passTruthy = false;
      }
    });
    failing.forEach(function(item){
      if(regex.test(item)){
        passFalsy = false;
      }
    });
    if(passTruthy && passFalsy){
      this.submit({
        title: this.refs.challengeTitle.getValue(),
        description: this.refs.challengeDescription.getValue(),
        truthy: passing,
        falsy: failing,
        solution: this.refs.challengeAnswer.getValue()
      });
    }
  },

  submit: function(question){
    $.ajax({
      url: '/questions',
      method: 'POST',
      data: JSON.parse(question),
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

  render: function(){

    return(
      <div className="container">
        <h3>Submit your own challenge</h3>
        <div className="container">
          <form className="form-inline text-center">
            <div className="container bottom-space">
              <TextField hintText="Give your challenge a title." multiLine={true} type="text" ref="challengeTitle"/>
            </div>
            <div className="container row">
              <div className="col-md-6 bottom-space">
                <TextField hintText="Enter a detailed description of your challenge here." multiLine={true} type="text" ref="challengeDescription"/>
              </div>
              <div className="col-md-6 bottom-space">
                <TextField hintText="Enter your answer in this format a{1}\(9\), gi." multiLine={true} onChange={this.createRegExp} type="text" ref="challengeAnswer"/>
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