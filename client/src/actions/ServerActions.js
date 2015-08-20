var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../Constants').ActionTypes;
var QuestionStore = require('../stores/QuestionStore');

var ServerActions = {
  questionsLoaded: function (questions) {

    Dispatcher.dispatch({
      type: ActionTypes.QUESTIONS_LOADED,
      questions: questions
    });
  },

  solutionsLoaded: function (solutions) {
    //console.log(solutions, ' ServerActions');
    Dispatcher.dispatch({
      type: ActionTypes.SOLUTIONS_LOADED,
      solutions: solutions
    });
  }
};

module.exports = ServerActions;