var mongoose = require('mongoose');

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
var questions = [
  {
    qNumber: 1,
    title: "Capital Words",
    description: "Validate whether a given string starts with a capital letter",
    truthy: ['Erik', 'PC', 'Microsoft', 'Hack Reactor', 'London', 'Alabama'],
    falsy: ['table', 'computer', 'hello', 'hEllo', '$Hello']
  },
  {
    qNumber: 2,
    title: "Does a Word Contain One 'a'",
    description: "Validate whether the given word contains one and only one letter 'a'.",
    truthy: ['Apple', 'Jan', 'hamburger', 'David', 'Sophia', 'example'],
    falsy: ['Aaron', 'Tim', 'Ingi', 'Canvas', 'PC', 'hackreactor']
  },
  {
    qNumber: 3,
    title: "Find Prices",
    description: "Determine whether the given string is a valid price",
    truthy: ['$123', '$0', '$0.50', '$99.99', '$102472349.17'],
    falsy: ['hello', '123', '$0.577', '$123.4.3', '$823.h']
  },
  {
    qNumber: 4,
    title: "Username Validation",
    description: "Determine whether a given username is valid according to the following restrictions: A username has to be between 6 and 10 characters and can only contain alphanumeric characters and '_'!",
    truthy: ['myname', 'ingikim', 'ingi_kim', 'alpha123'],
    falsy: ['myreallylongname', '@symbol', 'ingi-kim', 'name', 'jfah&kf']
  },
  {
    qNumber: 5,
    title: "Hex Color Code",
    description: "Determine whether a given string is valid Hex color code.",
    truthy: ['#FFF', '#abcabc', '#123', '#4d2', '#83e9db'],
    falsy: ['#ffff', 'fff', '123123', '%FFF', '#897f', '#44444444']
  }

];

questions.forEach(function(element) {
  var newQ = new Question(element);
  newQ.save(function(err, data) {
    if (err) {
      console.log("Adding questions error: ", err);
    } else {
      console.log("Adding questions success: ", data);
    }
  });
});


module.exports = Question;

