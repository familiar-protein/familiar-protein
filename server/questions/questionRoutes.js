var questionController = require('./questionController.js');

module.exports = function (app) {
  app.post('/questions', questionController.add);
  app.get('/questions', isAuth, questionController.getAll);
  // app.get('/questions', questionController.getAll);

  app.param('id', questionController.getQuestionData);

  app.get('/questions/:id', questionController.getQuestion);
  app.post('/questions/:id', questionController.runTests);
};

var isAuth = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.json('not logged in');
}