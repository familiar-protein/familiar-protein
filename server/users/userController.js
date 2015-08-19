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
          res.send("Success!", newUser);
        }
      });     
    } else{
      // user already exists
      res.statusCode = 409;
      res.send("Failure!");
    }
  });
};

var login = function(req,res,next){

};

module.exports = {
  signup: signup,
  login: login
};
