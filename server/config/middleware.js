var bodyParser = require('body-parser');
var express = require('express');
var userRoutes = require('../users/userRoutes');
var questionRoutes = require('../questions/questionRoutes');


var passport = require('passport');
var session = require('express-session');


module.exports = function(app) {
  app.use(bodyParser.json());

  require('./passport')(passport);
  
  app.use(express.static(__dirname + '/../../client/'));

  app.use(session({secret: 'shhItsASecret'}));
  app.use(passport.initialize());
  app.use(passport.session());

  userRoutes(app, passport);

  questionRoutes(app, passport);
};

