var GithubStrategy = require('passport-github').Strategy;
var User = require('../users/userModel');

var GITHUB_CLIENT_ID = 'e47b0909a724130cfdac';
var GITHUB_CLIENT_SECRET = 'd3df248c72cdbcaeef66038939d992cf959f7189';

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
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
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
          newUser.github.username = profile.username;
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
