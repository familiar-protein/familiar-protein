var userController = require('./userController');

module.exports = function (app) {
  app.param('id', userController.getUserData);
  app.get('/users', userController.getAllUsers);
  app.get('/users/:id', userController.userProfile);
};