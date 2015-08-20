var Question = require('./questionModel');
var questionValidation = require('../question_validation/validation');

// adds a question to the database
var add = function(req, res, next) {
  var str = '';
  req.on('data', function(chunk){
    str += chunk;
  });
  req.on('end', function(){
    // console.log('=============================', str);
    str = JSON.parse(str);
    
    var question = {
      qNumber: str.qNumber,
      title: str.title,
      description: str.description,
      truthy: str.truthy,
      falsy: str.falsy,
      solution: str.solution
    }

    var newQ = new Question(question);
    newQ.save(function(err, newEntry) {
      // console.log('=================', newEntry, err);
      if (err) {
        res.status(500).send('error when adding to db', err);
      } else {
        res.status(201).json(newEntry);
      }
    });
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

// get question data and add it to the request object for further request handling
var getQuestionData = function(req, res, next, id) {
  Question.findOne({qNumber: id}).exec(function(err, data) {
    if (err) {
      res.send(500, err);
    } else {
      req.questionData = data;
      next();
    }
  });
};

// return the question data for specified question
var getQuestion = function(req, res, next) {
  res.status(200);
  res.send(req.questionData);
};

// run tests on submitted regular expression
var runTests = function(req, res, next) {
  var regexString = req.body.regexString;

  var result = questionValidation(regexString, req.questionData.truthy, req.questionData.falsy);

  res.status(201);
  res.send({result: result})
};

module.exports = {
  add: add,
  getAll: getAll,
  getQuestion: getQuestion,
  getQuestionData: getQuestionData,
  runTests: runTests
};