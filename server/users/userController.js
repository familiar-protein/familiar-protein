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

var newSolution = function(req, res){
	console.log('TEST inside userController->newSolution. data=', req.body);

	var user = User.find({});
	console.log('TEST inside userController->newSolution. user=', user.models);
} //newSolution()

module.exports = {
  userInfo : userInfo,
  newSolution: newSolution
};