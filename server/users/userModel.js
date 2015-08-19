var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: String,

  // format is intended to be: { <qNumber>: "solution string", ...}
  // entries will only exist for a question that the user has solved.
  // Note: Using a mixed type requires calling User.markModified('questionState')
  // before User.save();
  // questionState: mongoose.Schema.Types.Mixed 
});

var User = mongoose.model('User', UserSchema);

module.exports = User;