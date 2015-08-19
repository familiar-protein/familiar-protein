var User = require('./userModel');

var signup = function(req,res,next){
  console.log("req.body === ",req.body);
  User.findOne({username: req.body.username})
  .exec(function(err, data){
    if (err) { console.log("ERROR", err)}
    console.log("DATA === ", data);

    if (data === null) {
      User.create({username: req.body.username, password: req.body.password}, function (err, newUser) {
        if (err) {
          console.log("ERROR - ", err);
        } else {
          // Successfully created!
          console.log("Success! newUser === ", newUser);
          res.statusCode = 201;
        }
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
  User.findOne({username: req.body.username, password: req.body.password})
  .exec(function(err, data){
    if (err) { console.log("ERROR", err)}
    
    if (data !== null) {
      res.statusCode = 200;
      res.send({response: "SUCCESSFULLY LOGGED IN!"});
    // If so, compare req.body.password to password in DB
      // If same, return success response! (And login / go somewhere on client side )
    } else {
      res.statusCode = 400;
      res.send({response: "Error: Incorrect username or password."});
    }
  });

    // Otherwise
      // ERROR: Username or password doesn't match.
      // Return response indicating failed login.
};

module.exports = {
  signup: signup,
  login: login
};
