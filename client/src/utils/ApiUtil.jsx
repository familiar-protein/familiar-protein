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
    if(!solution[votes]){
      solution[votes] = 0;
    }
    solution[votes]++;

    var populateSolutions = function(solutions){
      // console.log('Got from server: ', solutions);
      ServerActions.solutionsLoaded(solutions);
    };
     
    $.ajax({
      url: window.location.origin + '/solutions/' + solution._id,
      method: 'PUT',
      dataType: 'json',
      data: solution,
      success: loadSolutions,
      error: function (xhr, status, err) {
        console.log(xhr, status, err.message);
      }
    })
  }
};

module.exports = ApiUtils;