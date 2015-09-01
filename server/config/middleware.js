var bodyParser = require('body-parser');
var express = require('express');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var userRoutes = require('../users/userRoutes');
var questionRoutes = require('../questions/questionRoutes');
var solutionRoutes = require('../solutions/solutionRoutes');
var authRoutes = require('../auth/authRoutes');
var session = require('express-session');

module.exports = function(app) {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(bodyParser.json());

   //app.use(express.cookieParser());
  app.use(express.static(__dirname + '/../../client/'));
   app.use(session({secret: 'keyboard cat'}));

   //passport initialization
   app.use(passport.initialize());
   app.use(passport.session());


   //routing
   authRoutes(app, passport);

  userRoutes(app);
  questionRoutes(app);
  solutionRoutes(app);
};

