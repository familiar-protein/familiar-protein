
var isAuth = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.json('not logged in');
}

module.exports = {
  isAuth: isAuth,
}