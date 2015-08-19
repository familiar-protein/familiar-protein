var React = require('react');
var Auth = require('./auth.jsx');

module.exports = function(Component) {
  return React.createClass({
    statics: {
      willTransitionTo: function(transition){
        if(!Auth.loggedIn()){
          transition.redirect('/login', {}, {'nextPath' : transition.path});
        }
      }
    },
    render: function(){
      return <Component {...this.props}/>
    }
  });
};