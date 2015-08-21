var userController = require('./userController');

module.exports = function (app) {
  // TODO: define all user related routes...

  app.post('/signup', userController.signup);
  app.post('/login', userController.login);

  app.get('/user', userController.getUserInfo);

  app.get('/logout', function(req, res) {
    console.log('Logging out');
    req.session.reset(); // Destroy our current session when the user logs out.
    res.redirect('/');
    res.end();
  });

  // This is probably an inefficient way to do this, but
  // check whether or not a cookie has been set for the user.
  app.get('/loggedin', userController.checkLoggedIn);
};