var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  google: {
    id: String,
    token: String,
    name: String,
    url: {type: String, default: 'unknown'},
    location: {type: String, default: 'unknown'},
    aboutMe: {type: String, default: 'unknown'},
    tagline: {type: String, default: 'unknown'},
    profileCover: {type: String, default: 'unknown'},
    profileImage: {type: String, default: 'unknown'},
  },

  score: {type: Number, default:0},

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
