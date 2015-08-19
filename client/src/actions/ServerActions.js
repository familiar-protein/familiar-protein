var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../Constants').ActionTypes;
var QuestionStore = require('../stores/QuestionStore');

var ServerActions = {
  questionsLoaded: function (questions) {
    Dispatcher.dispatch({
      type: ActionTypes.QUESTIONS_LOADED,
      questions: questions
    });
  }
};

module.exports = ServerActions;