var questionController = require('./questionController.js');

module.exports = function (app) {
  app.post('/questions', questionController.add);
  app.get('/questions', questionController.getAll);

  app.param('id', questionController.getQuestionData);

  app.get('/questions/:id', questionController.getQuestion);
  app.post('/questions/:id', questionController.runTests);
};