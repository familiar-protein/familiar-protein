var bodyParser = require('body-parser');
var express = require('express');
var cookieParser = require('cookie-parser');
var userRoutes = require('../users/userRoutes');
var questionRoutes = require('../questions/questionRoutes');
var authRoutes = require('../auth/authRoutes');

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

