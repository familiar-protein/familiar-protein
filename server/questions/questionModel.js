var mongoose = require('mongoose');
var questions = require('./questionData');

var QuestionSchema = new mongoose.Schema({
  qNumber: {type: Number, unique: true},
  title: String,
  description: String,
  truthy: [String],
  falsy: [String]
  // examples?
});

var Question = mongoose.model('Question', QuestionSchema);

// Set up some dummy initial data for now by hardcoding.
questions.forEach(function(element) {
  var newQ = new Question(element);
  newQ.save(function(err, data) {
    // if (err) {
    //   console.log("Adding questions error: ", err);
    // } else {
    //   console.log("Adding questions success: ", data);
    // }
  });
});


module.exports = Question;

