var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
	questionID: String,
	// userID: Number,
	answer: String
});

var Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
