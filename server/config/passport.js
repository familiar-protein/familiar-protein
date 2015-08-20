var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../users/userModel');

var configAuth = require('./auth');

module.exports = function(passport){
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    })
  });

  passport.use(new GoogleStrategy({
    clientID : configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
  },

  function(token, refreshToken, profile, done){
    console.log('USER PROFILE INFO', profile._json);

    
    process.nextTick(function(){

      User.findOne({'google.id': profile.id}, function(err, user){
        if(err)
          return done(err);

        if(user){
          return done(null, user);
        }else{
          var newUser = new User();

          for (var i = 0; i < profile._json.placesLived.length; i++ ) {
            if (profile._json.placesLived[i].primary === true) {
              var location = profile._json.placesLived[i].value;
            }
          }

          function getPathFromUrl(url) {
            console.log(url);
            return url.split("?")[0];
          }
          console.log(profile._json.url);
          newUser.google.id = profile.id;
          newUser.google.token = token;
          newUser.google.name = profile.displayName;
          newUser.google.url = profile._json.url;
          newUser.google.location = location;
          newUser.google.aboutMe = profile._json.aboutMe;
          newUser.google.tagline = profile._json.tagline;
          newUser.google.profileCover = profile._json.cover.coverPhoto.url || null;
          newUser.google.profileImage = getPathFromUrl(profile._json.image.url) || null;

          newUser.save(function(err){
            if(err)
              throw err;
            return done(null, newUser);
          })
        }
      })
    })
  }
  ))
}
