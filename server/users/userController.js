var User = require('./userModel');

var getUserData = function(req, res, next, id) {
  User.findOne({_id: id}).exec(function(err, data) {
    if (err) {
      res.send(500, err);
    } else {
      req.userData = data;
      next();
    }
  });
};

var userProfile = function(req, res, next) {
  res.status(200);
  res.send(req.userData);
};

var getAllUsers = function(req, res, next) {
  User.find().exec(function(err, data) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(data);
    }
  });
};