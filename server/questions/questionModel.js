var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  qNumber: {type: Number, unique: true},
  title: String,
  description: String
  // examples?
});

module.exports = mongoose.model('Question', QuestionSchema);

