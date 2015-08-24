 module.exports = function(app, passport) {
   app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }),
     function(req, res) {
       // will never be called
     });
   app.get('/auth/github/callback', passport.authenticate('github'),
       function(req, res) {
         console.log(req.user);
       res.redirect('/#/user/' + req.user.username);
     });

   // signup/login only used for local auth
   // app.post('/signup', authController.signup);
   // app.post('/login', function(req, res) {});

   app.get('/logout', function(req, res) {
     req.logout();
     res.redirect('/');
   });
 };

 function ensureAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
     return next();
   }
   res.redirect('/')
 }