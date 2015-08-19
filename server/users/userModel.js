var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  google: {
    id: String,
    token: String,
    name: String,
    image: String,
  },

  score: Number,

  stats: [{
      question: String, 
      score: Number, 
      time: Number, 
      timestamp: String
    }]

  // format is intended to be: { <qNumber>: "solution string", ...}
  // entries will only exist for a question that the user has solved.
  // Note: Using a mixed type requires calling User.markModified('questionState')
  // before User.save();
  // questionState: mongoose.Schema.Types.Mixed 
});

var User = mongoose.model('User', UserSchema);

module.exports = User;