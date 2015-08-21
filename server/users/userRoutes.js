var userController = require('./userController');
var User = require('./userModel');

module.exports = function (app) {
  // app.param('id', function(req, res, next, id) {
  //   User.findById(id).exec(function(err, data) {
  //     if (err) {
  //       res.send(500, err);
  //     } else {
  //       req.userData = data;
  //       next();
  //     }
  //   });
  // });

  // app.get('/users/:id', function(req, res, next) {
  //   res.status(200);
  //   res.send(req.userData);
  // });

  app.get('/users/:username', function(req, res, next){
    var username = req.params.username;
    User.findOne({'username': username}).exec(function(err, user){
      res.send(user);
    });
  });

  app.get('/users', function(req, res, next) {
    User.find({}).exec(function(err, data) {
      if (err) {
        res.send(500, err);
      } else {
        res.json(data);
      }
    });
  });

  app.post('/users', function(req, res) {
    var data = req.body;
    var addUser = User.create({
      username: data.username
    }, function(err,  newUser) {
      if (err) {
        console.log(err.message);
        res.sendStatus(500, err);
      }
      res.send(newUser);
    });
  });
  
};