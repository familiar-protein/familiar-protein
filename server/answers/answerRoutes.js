var answerController = require('./answerController.js');

module.exports = function (app) {
  app.post('/answers/:id', answerController.saveAnswer);  
};