var express = require('express');
var sessions = require("client-sessions");
var middleware = require('./config/middleware');
require('./config/db');

var port = process.env.PORT || 3000;

var app = express();

// Setup option for user cookies
app.use(sessions({
  cookieName: 'session', // cookie name dictates the key name added to the request object
  secret: '0h, N0 yo0 w1ll n3v3r gue55 th1s str1ng!!!1!', // should be a large unguessable string
  duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

// Tracking and debugging user sessions.
// app.use(function(req, res, next) {
//   if (req.session.user !== undefined) {
//     console.log('User cookie for: ', req.session.user.username);
//   }
//   // console.log(req.session.user);
//   next();
// });

middleware(app);

// only execute if server.js was the root process rather than being required by other module,
// for example, for access in test suite.
// if (!module.parent) {
  app.listen(port);
  console.log('Server now listening on port ' + port);
// }

module.exports = app;

