var User = require('./userModel');

var userInfo = function(req, res, next){
  console.log(req.user);
  User.find().exec(function(err, data){
    if(err)
      res.status(500, err);
    else
      res.json(req.user);
  })
};

module.exports = {
  userInfo : userInfo,
};