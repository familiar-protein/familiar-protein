var GithubStrategy = require('passport-github').Strategy;
var User = require('../users/userModel');

var GITHUB_CLIENT_ID = 'e47b0909a724130cfdac';
var GITHUB_CLIENT_SECRET = 'd3df248c72cdbcaeef66038939d992cf959f7189';

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.githubId);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/callback"
    },
    function(accessToken, rereshToken, profile, done) {
      User.findOrCreate({githubId: profile.id}, function(err, user) {
        return done(err, user);
      });
    }
  ));
};
