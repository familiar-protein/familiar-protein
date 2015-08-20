var Solution = require('./solutionModel');

module.exports = function(app) {
  app.param('qid', function(req, res, next, qid) {
    Solution.find({questionId: qid}).populate('questionId').populate('userId')
    .exec(function(err, data) {
      if (err) {
        res.send(500, err);
      } else {
        req.solutionData = data;
        next();
      }
    });
  });

  app.get('/solutions/:qid', function(req, res, next) {
    res.status(200);
    res.send(req.solutionData);
  });

  //Expect POST object like:
  //{
  //  "content": "sample regex answer",
  //  "questionId": 1,
  //  "userId": 3
  //}
  app.post('/solutions', function(req, res, next) {
    var solution = {
      content: req.body.content,
      questionId: req.body.questionId,
      userId: req.body.userId
    };
    var newSolution = new Solution(solution);
    newSolution.save(function(err, newEntry) {
      if (err) {
        res.send(500, err);
      } else {
        res.send(200, newEntry);
      }
    })
  });

  app.put('/solutions', function(req, res) {
    var id = req.body._id;
    Solution.findByIdAndUpdate(id, req.body, function(err) {
      if (err) {
        return res.send(500, err);
      }
    });
    res.send(req.body);
  });
};