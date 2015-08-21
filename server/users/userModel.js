var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  //For local auth only.
  username: {type: String
    , unique: true},
  // email: {type: String, unique: true},
  // password: String,
  // follows: [{
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User'
  // }],
  // solutions: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Solution'
  // }],
  //Github auth
  // github : {
  //   id: String,
  //   displayName: String,
  //   token: String,
  //   username: String,
  //   profileUrl: String,
  //   //only using first email.
  //   email: String
  // }
  // format is intended to be: { <qNumber>: "solution string", ...}
  // entries will only exist for a question that the user has solved.
  // Note: Using a mixed type requires calling User.markModified('questionState')
  // before User.save();
  //questionState: mongoose.Schema.Types.Mixed,

});

var User = mongoose.model('User', UserSchema);

module.exports = User;

//follows.
//solution: array of id's.