var questionController = require('./questionController.js');
var utils = require('../config/authHelper');

module.exports = function (app) {
  app.post('/questions' , utils.isAuth, questionController.add);
  app.get('/questions', questionController.getAll);
  // app.get('/questions', utils.isAuth, questionController.getAll);


  app.param('id', questionController.getQuestionData);

  app.get('/questions/:id', questionController.getQuestion);
  app.post('/questions/:id', questionController.runTests);
};

