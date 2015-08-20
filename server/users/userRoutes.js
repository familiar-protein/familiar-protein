var userController = require('./userController');
var utils = require('../config/authHelper');

module.exports = function (app, passport) {
  // TODO: define all user related routes...
  // app.post('/signup', userController.signup);
  // app.post('/login', userController.login);
  
  app.get('/user', userController.userInfo);

  app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));
  app.get('/auth/google/callback', passport.authenticate('google'), 
    function(req, res){
      res.redirect('/');
    });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  }); //app.get

  app.post('/user/solved', function(){
    console.log("TEST inside user/solved ----->");
  }); //app.post   
};
