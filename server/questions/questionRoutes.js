var questionController = require('./questionController.js');

module.exports = function (app) {
  app.post('/questions', questionController.add);
  app.get('/questions', questionController.getAll);
};