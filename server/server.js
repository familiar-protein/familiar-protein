var express = require('express');
var questionRoutes = require('./questions/questionRoutes.js');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var mongoose = require('mongoose');

// XXX EE: this is the format for Azure. Needs to change if we deploy elsewhere.
var mongoURI =  process.env.CUSTOMCONNSTR_MONGOLAB_URI || 
                'mongodb://localhost/regexdb';
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
});


var app = express();

// TODO: Implement middleware file for modularity
app.use(bodyParser.json());
questionRoutes(app);


app.use(express.static(__dirname + '../client'));

app.listen(port);

console.log('Server now listening on port ' + port);

