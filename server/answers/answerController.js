var Answer = require('./answerModel');

var saveAnswer = function(req, res, next, id) {
	console.log("saveAnswer req.body: ", req.body);
	var newAnswer = new Answer(req.body);
	newAnswer.save(function(err, data) {
		if (err) {
			console.log("Add answer error: ", err);
		} else {
			console.log("Add answer success: ", data);
		}
	});
}

module.exports = {
	saveAnswer: saveAnswer
}