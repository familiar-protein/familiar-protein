var ServerActions = require('../actions/ServerActions');

// TODO: REMOVE when the backend API is working
var solutions = [
  {
    id: 1,
    solution: "Great Solution",
    votes: 0
  }, 
  {
    id: 2,
    solution:"Best Solution",
    votes: 0
  }];

var ApiUtils = {
  loadAllQuestions: function () {
    $.ajax({
      url: window.location.origin + '/questions',
      method: 'GET',
      dataType: 'json',
      success: function(data){
        data.sort(function(a, b){
          return a.qNumber - b.qNumber;
        });
        // console.log(data);
        ServerActions.questionsLoaded(data);
        //this.setState({questions: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
      }
    })
  },

  getUserProfile: function (userId, callback) {
    $.ajax({
      url: window.location.origin + '/user/' + userId,
      method: 'GET',
      dataType: 'json',
      success: callback,
      error: function (xhr, status, err) {
        console.log(xhr, status, err.message);
      }
    })
  },
  
  loadSolutions: function (qId) {
    //TODO: Actual request to server
    // console.log("Loading solutions for question ID: ", qId);

    var populateSolutions = function(solutions){
      // console.log('Got from server: ', solutions);
      ServerActions.solutionsLoaded(solutions);
    };

    $.ajax({
      url: window.location.origin + '/solutions/' + qId,
      method: 'GET',
      dataType: 'json',
      success: populateSolutions,
      error: function (xhr, status, err) {
        console.log(xhr, status, err.message);
      }
    })
  },

  incrementSolutionVote: function (solution){
    //TODO: Actual request to server
    // console.log("Incrementing votes for: ", solutionId);
    
    // Just temporary code to simulate a put request
    // for(solution in solutions){
    //   if(solutions[solution].id === solutionId) {
    //     solutions[solution].votes++;

    //     this.loadSolutions();
    //   }
    // }
    
    solution['votes'] += 1;
    
    var putSolution = {
      _id: solution._id,
      questionId: solution.questionId._id,
      userId: solution.userId._id,
      votes: solution.votes
    };
    console.log(JSON.stringify(putSolution));

    var context = this;
    $.ajax({
      url: window.location.origin + '/solutions',
      method: 'PUT',
      contentType: "application/json",
      data: JSON.stringify(putSolution),
      success: ApiUtils.loadSolutions.bind(context, solution.questionId._id),
      error: function (xhr, status, err) {
        console.log(xhr, status, err.message);
      }
    })
  }
};

module.exports = ApiUtils;