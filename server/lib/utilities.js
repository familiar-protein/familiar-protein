exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
    req.session.user = newUser;
    console.log('Session created for user');
    //res.redirect('/');
  });
}

// Check if session exists
exports.isLoggedIn = function(req, res) {
  return req.session ? !!req.session.user : false;
}

// Check if user is logged in. If not, redirect them places.
exports.checkUser = function(req, res, next){
  if(!exports.isLoggedIn(req)){ 
    res.redirect('/login');
  } else {
    next();
  }
};