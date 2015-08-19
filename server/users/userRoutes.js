var userController = require('./userController');

module.exports = function (app) {
  // TODO: define all user related routes...

  app.post('/signup', userController.signup);
  app.post('/login', userController.login);
};