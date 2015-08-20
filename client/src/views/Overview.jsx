var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var Router = require('react-router');
var Link = Router.Link;

var OverView = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }; 
  },

  render: function() {
    // think of propos as immutable within the component, that is, never write to this.props.
    // https://facebook.github.io/react/docs/displaying-data.html
    var questions = this.props.questions.map(function(question) {
      return (
        <tr key={question.qNumber} className="question">
          <td><b>{question.title}</b></td>
          <td><p>{question.description}</p></td>
          <td><RaisedButton label="Solve" linkButton="true" params={{qNumber:question.qNumber}} containerElement={<Link to="question"/>}/></td>
          <td><p>Indication if user already solved</p></td>
        </tr>
      )
    });

    // Since JSX is JavaScript, identifiers such as class and for are discouraged as XML attribute names. 
    // Instead, React DOM components expect DOM property names like className and htmlFor, respectively.
    // https://facebook.github.io/react/docs/jsx-in-depth.html
    return (
      <div>
        <table className="questionContainer table table-hover">
          <tbody>
            {questions}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = OverView;
