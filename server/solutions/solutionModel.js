var mongoose = require('mongoose');

var SolutionSchema = new mongoose.Schema({
  content: String,
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  votes: {
    type: Number,
    default: 0
  },
  voters: [String]
});

var Solution = mongoose.model('Solution', SolutionSchema);

module.exports = Solution;

