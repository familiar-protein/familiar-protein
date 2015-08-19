var bodyParser = require('body-parser');
var express = require('express');
var cookieParser = require('cookie-parser');
var userRoutes = require('../users/userRoutes');
var questionRoutes = require('../questions/questionRoutes');
var authRoutes = require('../auth/authRoutes');

var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

var GITHUB_CLIENT_ID = 'e47b0909a724130cfdac';
var GITHUB_CLIENT_SECRET = 'd3df248c72cdbcaeef66038939d992cf959f7189';

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(express.cookieParser());
  app.use(express.static(__dirname + '/../../client/'));
  app.use(express.session({secret: 'keyboard cat'}));

  // pasport initialization
  app.use(passport.initialize());
  app.use(passport.session());


  // routing
  authRoutes(app);
  userRoutes(app);
  questionRoutes(app);
};

