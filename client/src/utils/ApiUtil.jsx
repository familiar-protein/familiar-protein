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
        // console.log(data);
        ServerActions.questionsLoaded(data);
        //this.setState({questions: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err.message);
      }
    })
  },

  login: function (username, callback) {
    $.ajax({
      url: '/users/' + username,
      method: 'GET',
      success: callback,  
      error: function (e) {
        console.log(arguments);
      }
    });
  },

  signup: function (username, callback) { //handle sign up and login
    $.ajax({
      url: '/users',
      method: 'POST',
      data: JSON.stringify({"username": username}),
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
      },
      error: function () {
        console.log(arguments);
      }
    });
  },

  getUserProfile: function (username, callback) {
    $.ajax({
      url: window.location.origin + '/users/' + username,
      method: 'GET',
      dataType: 'json',
      success: callback,
      error: function (xhr, status, err) {
        console.log(xhr, status, err.message);
      }
    })
    // console.log('get user profile');
  },

  getAllUsers: function(){
    
    var loadUsers = function(users){
      ServerActions.usersLoaded(users);
    };

    $.ajax({
      url: window.location.origin + '/users',
      method: 'GET',
      dataType: 'json',
      success: loadUsers,
      error: function (xhr, status, err) {
        console.log(xhr, status, err.message);
      }
    });

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

  loadAllSolutions: function (callback) {
    // $.ajax({
    //   url: window.location.origin + '/solutions',
    //   method: 'GET',
    //   dataType: 'json',
    //   success: callback,
    //   error: function (xhr, status, err) {
    //     console.log(xhr, status, err.message);
    //   }
    // })
    console.log('loadAllSOlutions Api called');
    callback(
      [
      {question_id:"question#1", votes:3, user_id: '55d7921a0129cac5f22b469e', content:'answer1'},
      {question_id:"question#2", votes:1, user_id: '55d7921a0129cac5f22b469e', content:'answer2'},
      {question_id:"question#3", votes:2, user_id: '55d7921a0129cac5f22b469e', content:'answer3'},
      {question_id:"question#4", votes:7, user_id: '55d7921a0129cac5f22b469e', content:'answer4'},
      {question_id:"question#5", votes:5, user_id: '55d7921a0129cac5f22b469e', content:'answer5'},
      {question_id:"question#5", votes:5, user_id: '55d7921a0129cac5f22b469e', content:'answer5'},
      {question_id:"question#6", votes:5, user_id: 'fsdjkfs', content:'answer6'},
      {question_id:"question#7", votes:5, user_id: 'fsdjkfs', content:'answer7'},
      {question_id:"question#8", votes:5, user_id: 'fsdjkfs', content:'answer8'},
      ]);
  },

  incrementSolutionVote: function (solution){

    solution['votes'] += 1;
    
    var putSolution = {
      _id: solution._id,
      questionId: solution.questionId._id,
      userId: solution.userId._id,
      votes: solution.votes
    };
    // console.log(JSON.stringify(putSolution));

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
  },

  postNewSolution: function(qId, uId, solutionStr){
    console.log(qId, uId, solutionStr);

    var postObj = {
      content: solutionStr,
      userId: uId,
      questionId: qId,
      votes: 0
    };

    var context = this;
    $.ajax({
      url: '/solutions',
      method: 'POST',
      data: JSON.stringify(postObj),
      contentType: 'application/json',
      success: ApiUtils.loadSolutions.bind(context, qId),
      error: function () {
        console.log(arguments);
      }
    });
  }
};

module.exports = ApiUtils;