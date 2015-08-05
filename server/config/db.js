var mongoose = require('mongoose');

// XXX EE: this is the format for Azure. Needs to change if we deploy elsewhere.
var mongoURI =  process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/regexdb';

mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('Mongodb connection open');
});

