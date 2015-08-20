var ServerActions = require('../actions/ServerActions');


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
    var solutions = [
      {
        id: 1,
        solution: "Great Solution"
      }, 
      {
        id: 2,
        solution:"Best Solution"
      }];
    ServerActions.solutionsLoaded(solutions);
  }
};

module.exports = ApiUtils;