var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../Constants').ActionTypes;
var ApiUtils = require('../utils/ApiUtil.jsx');
var Auth = require('../utils/auth.jsx');

var ViewActions = {
  loadQuestions: function () {
    console.log('questions loading');
    Dispatcher.dispatch({
      type: ActionTypes.LOAD_QUESTIONS
    });
    ApiUtils.loadAllQuestions();
  },

  login: function (user, pass) {
    Auth.login(user, pass, function (isAuthenticated) {
      Dispatcher.dispatch({
        type: ActionTypes.USER_AUTHENTICATION,
        authenticated: isAuthenticated
      });
    });
  }
};

module.exports = ViewActions;