var userController = require('./userController');

module.exports = function (app) {
  // TODO: define all user related routes...
  app.post('/signup', userController.signup);
  app.post('/login', userController.login);
  app.post('/logout', userController.logout);

  app.param('id', userController.getUserData);
  app.get('/users/:id', userController.userProfile);
  app.get('/users', userController.getAllUsers);
};