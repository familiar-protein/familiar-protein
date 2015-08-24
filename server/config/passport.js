 var GithubStrategy = require('passport-github2').Strategy;
 var User = require('../users/userModel');
 var configAuth = require('./auth');

 module.exports = function(passport) {
   passport.serializeUser(function(user, done) {
     done(null, user.id);
   });

   passport.deserializeUser(function(id, done) {
     User.findById(id, function(err, user) {
       done(err, user);
     });
   });

   passport.use(new GithubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL
     },
     function(accessToken, refreshToken, profile, done) {
       User.findOne({'github.id': profile.id}, function(err, user) {
         if (err) {
           return done(err);
         }
         if (user) {
           return done(null, user);
         } else {
           var newUser = new User();
           newUser.github.id = profile.id;
           newUser.github.token = accessToken;
           newUser.username = profile.username;
           newUser.github.displayName = profile.displayName;
           newUser.github.profileUrl = profile.profileUrl;
           newUser.github.email = profile.emails[0].value;

           //save our user to the database
           newUser.save(function(err) {
             if (err) {
               throw err;
             }
             return done(null, newUser);
           });
         }
       });
     }
   ));
 };
