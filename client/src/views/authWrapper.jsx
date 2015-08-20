var React = require('react');
var Auth = require('../utils/auth.jsx');
var ViewActions = require('../actions/ViewActions');
var UserStore = require('../stores/UserStore');

module.exports = function(Component) {
  return React.createClass({
    statics: {
      willTransitionTo: function(transition){
        console.log(UserStore.getState().loggedIn);
        if(!UserStore.getState().loggedIn){
          transition.redirect('/login', {}, {'nextPath' : transition.path});
        }
      }
    },

    onChange: function () {
      this.render();
    },

    componentDidMount: function () {
      UserStore.addListener(this.onChange);
    },
    render: function(){
      console.log(UserStore.getState().loggedIn);
      return <Component {...this.props}/>
    }
  });
};