var questionRoutes = require('../questions/questionRoutes.js');
var bodyParser = require('body-parser');
var express = require('express');

module.exports = function(app) {
  app.use(bodyParser.json());

  app.use(express.static(__dirname + '../client'));

  questionRoutes(app);
};

