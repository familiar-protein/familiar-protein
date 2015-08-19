var bodyParser = require('body-parser');
var express = require('express');
var userRoutes = require('../users/userRoutes');
var questionRoutes = require('../questions/questionRoutes');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  app.use(express.static(__dirname + '/../../client/'));

  userRoutes(app);
  questionRoutes(app);
};

