var User = require('./userModel');

var addUser = function(req, res, next) {
  var user = {
    username: req.body.username
  };
  var newUser = new User(user);
  newUser.save(function(err, newEntry) {
    if (err) {
      res.send(500, err);
    } else {
      res.send(200, newEntry);
    }
  });
};

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
  User.find({}).exec(function(err, data) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(data);
    }
  });
};

module.exports = {
  getUserData: getUserData,
  userProfile: userProfile,
  getAllUsers: getAllUsers,
  addUser: addUser
};