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
        console.log(data);
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
  
  loadSolutions: function () {
    //TODO: Actual request to server
    ServerActions.solutionsLoaded(solutions);
  },

  incrementSolutionVote: function (solutionId){
    //TODO: Actual request to server
    // console.log("Incrementing votes for: ", solutionId);
    
    // Just temporary code to simulate a put request
    for(solution in solutions){
      if(solutions[solution].id === solutionId) {
        solutions[solution].votes++;

        this.loadSolutions();
      }
    }
  }
};

module.exports = ApiUtils;