var User = require('./userModel');
var bcrypt = require('bcrypt');
var utils = require('../lib/utilities');
var url = require('url');

var signup = function(req,res,next){
  console.log("req.body === ",req.body);
  User.findOne({username: req.body.username})
  .exec(function(err, data){
    if (err) { console.log("ERROR", err);}
    console.log("DATA === ", data);

    if (data === null) {
      bcrypt.hash(req.body.password, 8, function(err, hash){
        User.create({username: req.body.username, password: hash, name: req.body.name, image: req.body.image}, function (err, newUser) {
          if (err) {
            console.log("ERROR - ", err);
          } else {
            // Successfully created!
            console.log("Success! newUser === ", newUser);
            utils.createSession(req, res, data);
            res.statusCode = 201;
          }
        });
      });
    } else{
      // user already exists
      res.statusCode = 409;
      res.send({response: "Failure!"});
    }
  });
};

var login = function(req,res,next){
  // Get username and see if it exists
  User.findOne({username: req.body.username})
  .exec(function(err, data){
    if (err) { console.log("ERROR", err);}
    
    if (data !== null) {
      // check that the passwords match if so, log in else don't
      bcrypt.compare(req.body.password, data.password, function(err, match){
        if (err){console.log(err);}

        if (match){
          utils.createSession(req, res, data);
          res.statusCode = 200;
          console.log("SUCCESSFULLY LOGGED IN!");
          res.send({
            response: "SUCCESSFULLY LOGGED IN!", 
            loggedIn: utils.isLoggedIn(req),
            userInfo: req.session.user
          });
        }else{
          res.statusCode = 401;
          console.log("WRONG PASSWORD");
          res.send({response: "WRONG PASSWORD", loggedIn: false});
        }
      });
    }else{
      res.statusCode = 401;
      console.log("WRONG USERNAME");
      res.send({response: "WRONG USERNAME", loggedIn: false});
    }
  });
};

var getUserInfo = function(req, res, next) {
  var url_parts = url.parse(req.url,true);
  var username = url_parts.query.username;
  //res.send("Username: " + username);

  User.findOne({username: username})
  .exec(function(err, data){
    if (err) { console.log("ERROR", err);}
    
    if (data !== null) {
      // check that the passwords match if so, log in else don't
      if (err){console.log(err);}

      utils.createSession(req, res, data);
      res.statusCode = 200;
      res.send({
        response: "Found user profile!", 
        userInfo: req.session.user
      });
    }else{
      res.statusCode = 401;
      res.send({response: "No user found"});
    }
  });
}

// Simply check whether the user is logged in based on a cookie.
var checkLoggedIn = function(req, res, next) {
  var userData = req.session.user || null;
  res.send({loggedIn: utils.isLoggedIn(req), user: userData});
}

module.exports = {
  checkLoggedIn: checkLoggedIn,
  getUserInfo: getUserInfo,
  login: login,
  signup: signup
};
