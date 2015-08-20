module.exports = function(app, passport) {
  app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }), 
    function(req, res) {
      // will never be called
    });
  //app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: /*failpage*/ }),
  //  function(req, res) {
  //    res.redirect(/*mainpage*/);
  //  });

  // signup/login only used for local auth
  // app.post('/signup', authController.signup);  
  // app.post('/login', function(req, res) {});

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect(/*redirect*/);
  });
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(/*redirect*/)
}