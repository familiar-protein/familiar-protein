var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var userRoutes = require('../users/userRoutes');
var questionRoutes = require('../questions/questionRoutes');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  app.use(express.static(__dirname + '/../../client/'));

  // Support for session creation and tracking
  app.use(session({
    secret: '00000h, Snap! No 0ne w1ll 3v3r figur3 0ut th1s s3cret k3y!!!1!',
    resave: false,
    saveUninitialized: true
  }));

  // Handle routing for users and questions
  userRoutes(app);
  questionRoutes(app);
};

