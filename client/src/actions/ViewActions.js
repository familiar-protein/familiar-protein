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

  loadAllSolutions: function () {
    ApiUtils.loadAllSolutions(function (allSolutions) {
        Dispatcher.dispatch({
          type: ActionTypes.ALL_SOLUTIONS_LOADED,
          solutions: allSolutions
        });
    });
  },

  postNewSolution: function(qId, uId, solutionStr, username){
    // console.log(qId, uId, solutionStr);
      Dispatcher.dispatch({
        type: ActionTypes.POST_NEW_SOLUTION
      });
      ApiUtils.postNewSolution(qId, uId, solutionStr, username);
  },

  voteForSolution: function (solutionId, username) {
    // console.log("Voting for ", solutionId);
    //ADD_VOTE_TO_SOLUTION
    Dispatcher.dispatch({
      type: ActionTypes.ADD_VOTE_TO_SOLUTION
    });
    ApiUtils.incrementSolutionVote(solutionId, username);
  },
  
  login: function (username) {
    ApiUtils.login(username, function (userData) {
      Dispatcher.dispatch({
        type: ActionTypes.USER_AUTHENTICATION,
        payload: {
          username: userData.username,
          user_id: userData._id
        }
      });
    });
  },

  getAllUsers: function(){
    // console.log('in view actions: getting all users');
    Dispatcher.dispatch({
      type: ActionTypes.LOAD_USERS
    });
    ApiUtils.getAllUsers();
  },

  getUserProfile: function (username) {
    ApiUtils.getUserProfile(username, function (userData) {
      Dispatcher.dispatch({
        type: ActionTypes.GET_USER_PROFILE,
        payload: {
          username: userData.username,
          user_id: userData._id
        }
      });
    });
  },

  loadAnonProfile: function () {
    this.login('anonymous');
  }
};

module.exports = ViewActions;