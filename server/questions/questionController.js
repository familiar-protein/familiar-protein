// adds a question to the database
var add = function(req, res, next) {

  console.log(req.body);
  var question = {
    title: req.body.title,
    description: req.body.description
  }

  // TODO add question to database
  res.json(question);
};


// gets all questions from the database
var getAll = function(req, res, next) {

  // TODO fetch question data

  res.json({test: 'test'});
};


module.exports = {
  add: add,
  getAll: getAll
};