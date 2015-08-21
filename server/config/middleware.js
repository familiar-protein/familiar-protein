var bodyParser = require('body-parser');
var express = require('express');
var userRoutes = require('../users/userRoutes');
var questionRoutes = require('../questions/questionRoutes');
var gameRoutes = require('../game/gameRoutes');
var answerRoutes = require('../answers/answerRoutes');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  app.use(express.static(__dirname + '/../../client/'));

  // Handle routing for users and questions
  gameRoutes(app);
  userRoutes(app);
  questionRoutes(app);
  answerRoutes(app);
};

