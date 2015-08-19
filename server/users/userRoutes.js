// var userController = require('./userController');

module.exports = function (app, passport) {
  // TODO: define all user related routes...
  // app.post('/signup', userController.signup);
  // app.post('/login', userController.login);
  app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));
  app.get('/auth/google/callback', passport.authenticate('google'), 
    function(req, res){
      res.redirect('/');
    });
};
