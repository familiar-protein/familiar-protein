var Solution = require('./solutionModel');

module.exports = function(app) {
  app.param('qid', function(req, res, next, qid) {
    Solution.find({questionId: qid}).populate('questionId').populate('userId')
    .exec(function(err, data) {
      if (err) {
        //res.send(500, err);
        res.status(500).send(err);
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

  app.get('/solutions', function(req, res, next) {
    Solution.find().exec(function(err, data) {
      if (err) {
        res.send(500, err);
      } else {
        res.json(data);
      }
    });
  });

  //Expect POST object like:
  //{
  //  "content": "sample regex answer",
  //  "questionId": 1,
  //  "userId": 3
  //}
  app.post('/solutions', function(req, res, next) {
    var data = req.body;

    var addSolution = Solution.create({
      content: data.content,
      questionId: data.questionId,
      userId: data.userId
    },
    function(err, newSolution) {
      res.send(newSolution);
    });
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