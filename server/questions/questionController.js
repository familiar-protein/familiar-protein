var Question = require('./questionModel');

// adds a question to the database
var add = function(req, res, next) {

  console.log(req.body);
  var question = {
    qNumber: req.body.qNumber,
    title: req.body.title,
    description: req.body.description
  }

  var newQ = new Question(question);
  newQ.save(function(err, newEntry) {
    if (err) {
      res.send(500, err);
    } else {
      res.send(200, newEntry);
    }
  });
};


// gets all questions from the database
var getAll = function(req, res, next) {

  // TODO fetch question data
  Question.find().exec(function(err, data) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(data);
    }
  });
};


module.exports = {
  add: add,
  getAll: getAll
};