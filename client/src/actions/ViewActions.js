var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../Constants').ActionTypes;
var ApiUtils = require('../utils/ApiUtil.jsx');
var Auth = require('../utils/auth.jsx');

var ViewActions = {
  loadQuestions: function () {
    Dispatcher.dispatch({
      type: ActionTypes.LOAD_QUESTIONS
    });
    ApiUtils.loadAllQuestions();
  },

  loadSolutions: function (qId) {
    Dispatcher.dispatch({
      type: ActionTypes.LOAD_SOLUTIONS
    });
    ApiUtils.loadSolutions(qId);
  },

  voteForSolution: function (solutionId) {
    // console.log("Voting for ", solutionId);
    //ADD_VOTE_TO_SOLUTION
    Dispatcher.dispatch({
      type: ActionTypes.ADD_VOTE_TO_SOLUTION
    });
    ApiUtils.incrementSolutionVote(solutionId);
  },

  // login: function (user, pass) {
  //   Auth.login(user, pass, function (isAuthenticated) {
  //     Dispatcher.dispatch({
  //       type: ActionTypes.USER_AUTHENTICATION,
  //       authentication: {
  //         authenticated: isAuthenticated,
  //         error: !isAuthenticated
  //       }
  //     });
  //   });
  // },
  
  login: function (username) {
    ApiUtils.login(username, function (userData) {
      Dispatcher.dispatch({
        type: ActionTypes.USER_AUTHENTICATION,
        payload: {
          username: userData.username
        }
      });
    });
  },

  getUserProfile: function (username) {
    ApiUtils.getUserProfile(username, function (userData) {
      Dispatcher.dispatch({
        type: ActionTypes.GET_USER_PROFILE,
        payload: {
          username: userData.username
        }
      });
    });
  }
};

module.exports = ViewActions;