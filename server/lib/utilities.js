/** 
 *  Utilities and helpers for the server.
 */

exports.createSession = function(req, res, newUser) {
  req.session.user = newUser;
  console.log('Session created for user', req.session);
  return;
}

// Check if session exists
exports.isLoggedIn = function(req, res) {
  // console.log("Current cookie: ", req.session);
  // var sessionResult = {};
  // if (req.session.user != undefined) {
  //   sessionResult = {
  //     loggedIn: true,
  //     user: req.session
  //   }
  // } else {
  //   sessionResult = {
  //     loggedIn: false
  //   }
  // }

  //return sessionResult
  var result = req.session ? !!req.session.user : false;
  console.log("is Logged In?? ", result);
  return result;
}

// Check if user is logged in. If not, redirect them places.
exports.checkUser = function(req, res, next){
  if(!exports.isLoggedIn(req)){ 
    res.redirect('/login');
  } else {
    next();
  }
};