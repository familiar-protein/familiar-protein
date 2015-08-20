var React = require('react');
var Router = require('react-router');

var SolutionStore = require('./../stores/SolutionStore');

var SolutionView = React.createClass({

  getInitialState: function(){
    return {
      solutions: SolutionStore.getSolutions()
    };
  },

  render: function(){
    return(
      <div>
        {this.state.solutions}
      </div>
    );
  }
});

module.exports=SolutionView;