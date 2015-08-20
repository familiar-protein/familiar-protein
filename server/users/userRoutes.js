var userController = require('./userController');
var User = require('./userModel');

module.exports = function (app) {
  // app.param('id', userController.getUserData);
  app.get('/users', function(req, res, next) {
    User.find({}).exec(function(err, data) {
      if (err) {
        res.send(500, err);
      } else {
        res.json(data);
      }
    });
  });
  // app.get('/users/:id', userController.userProfile);

  // app.get('/users', userController.getAllUsers);

  app.post('/users', function(req, res) {
    var data = req.body;
    var addUser = User.create({
      username: data.username,
    }, function(err,  newUser) {
      if (err) {
        res.sendStatus(500, err);
      }
      res.send(newUser);
    });
  });
  
};