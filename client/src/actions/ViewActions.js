var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../Constants');
var ApiUtils = require('../utils/ApiUtils');

var ViewActions = {
  loadQuestions: function () {
    Dispatcher.dispatch({
      type: ActionTypes.LOAD_QUESTIONS
    });
    ApiUtils.loadAllQuestions();
  }
};

module.exports = ViewActions;