var express = require('express');
var questionRoutes = require('./questions/questionRoutes.js');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var app = express();

// TODO: Implement middleware file for modularity
app.use(bodyParser.json());
questionRoutes(app);


app.use(express.static(__dirname + '../client'));

app.listen(port);

console.log('Server now listening on port ' + port);