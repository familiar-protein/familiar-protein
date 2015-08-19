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

  render: function(){

    return(
      <div className="container">
        <h3>Submit your own challenge</h3>
        <div className="container">
          <form className="form-inline text-center">
            <div className="container row">
              <div className="col-md-6 bottom-space">
                <TextField hintText="Enter a detailed description of your challenge here." multiLine={true} type="text" ref="challengeDescription"/>
              </div>
              <div className="col-md-6 bottom-space">
                <TextField hintText="Enter the answer to your challenge here." multiLine={true} type="text" ref="challengeAnswer"/>
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
          </form>
        </div>
      </div>  

    );
  },

});

module.exports = SubmitView;