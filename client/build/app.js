/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var GameBox = __webpack_require__(1);

	var App = React.createClass({displayName: "App",
	  render: function() {
	    return (
	      React.createElement("div", null, 
	        React.createElement(GameBox, null)
	      )
	    )
	  }
	});

	React.render(React.createElement(App, null), document.body);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var QuestionContainer = __webpack_require__(2)

	var GameBox = React.createClass({displayName: "GameBox",
	  getInitialState: function(){
	    return {
	      questions: [],
	      currentQuestion: -1
	    };
	  },

	  goToQuestionDetail: function(index){
	    console.log("QUESTION DETAIL:", index);
	    this.setState({
	      currentQuestion: index
	    });
	  },

	  goToQuestionMenu: function(){
	    this.setState({
	      currentQuestion: -1
	    });
	  },

	  loadAllQuestions: function(){
	    $.ajax({
	      url: 'http://localhost:3000/questions',
	      method: 'GET',
	      dataType: 'json',
	      success: function(data){
	        data.sort(function(a, b){
	          return a.qNumber - b.qNumber;
	        });
	        console.log("loadAllQuestions: " + data);
	        this.setState({questions: data});

	      }.bind(this),
	      error: function(xhr, status, err){
	        console.error(xhr, status, err.message);
	      }
	    });
	  },

	  componentDidMount: function(){
	    this.loadAllQuestions();
	  },

	  render: function() {
	    return (
	      React.createElement("div", {className: "gameBox"}, 
	        React.createElement("h2", {className: "title"}, "Regex Game"), 
	        React.createElement(QuestionContainer, {
	          data: this.state.questions, 
	          currentQuestion: this.state.currentQuestion, 
	          goToQuestionDetail: this.goToQuestionDetail, 
	          goToQuestionMenu: this.goToQuestionMenu}
	        )
	      )
	    );
	  }

	});

	module.exports = GameBox;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var QuestionContainer = React.createClass({displayName: "QuestionContainer",
	  getInitialState: function(){
	    return {
	      result: '',
	      solved: false
	    };
	  },

	  // proptype validation: errors will show in console!
	  propTypes: {
	    data: React.PropTypes.array.isRequired,
	    currentQuestion: React.PropTypes.number.isRequired,
	    goToQuestionDetail: React.PropTypes.func.isRequired,
	    goToQuestionMenu: React.PropTypes.func.isRequired,
	  },

	  submit: function(e){
	    e.preventDefault();
	    console.log(this);
	    var answer = React.findDOMNode(this.refs.solutionText).value;
	    var payload = JSON.stringify({regexString: answer});
	    $.ajax({
	      url: 'http://localhost:3000/questions/' + this.props.data[0].qNumber,
	      method: "POST",
	      contentType: "application/json",
	      data: payload,
	      success: function(data){
	        this.setState({result: data.result});
	      }.bind(this),
	      error: function(xhr, status, err){
	        console.log(xhr, status, err.message);
	      }.bind(this)
	    });
	  },

	  setRegex: function() {
	    var value = React.findDOMNode(this.refs.solutionText).value;
	    var solved = this.isSolved(value)
	    this.setState({
	      result: value,
	      solved: solved
	    });
	  },

	  checkTestCase: function(testCase, condition) {
	    var regex = new RegExp(this.state.result);
	    return regex.test(testCase) === condition ? 'solved' : 'unsolved';
	  },

	  displayTestCases: function(string, condition) {
	    var question = this.props.data[this.props.currentQuestion];
	    return question[string].map(function(testCase) {
	      return (
	        React.createElement("p", {className: this.checkTestCase(testCase, condition)}, testCase)
	      )
	    }.bind(this));
	  },

	  isSolved: function(regexString) {
	    var question = this.props.data[this.props.currentQuestion];

	    var truthy = question['truthy']
	    var falsy = question['falsy'];
	    var regex = new RegExp(regexString);

	    var solvedTruthy = truthy.reduce(function(result, current) {
	      return result && regex.test(current);
	    }, true);

	    var solvedFalsy = falsy.reduce(function(result, current) {
	      return result && !regex.test(current);
	    }, true);

	    return solvedTruthy && solvedFalsy;
	  },

	  render: function() {
	    var currentIndex = this.props.currentQuestion;
	    if(currentIndex >= 0){
	      return (
	        React.createElement("div", {className: "question-solve"}, 

	          React.createElement("div", {className: "row"}, 
	            React.createElement("div", {className: "col-sm-10"}, 
	              React.createElement("h2", null, this.props.data[currentIndex].title), 
	              React.createElement("p", null, this.props.data[currentIndex].description)
	            ), 

	            React.createElement("div", {className: "col-sm-2"}, 
	              React.createElement("a", {href: "#", className: "btn btn-primary back", onClick: this.props.goToQuestionMenu}, "Back")
	            )
	          ), 

	          React.createElement("form", {className: "form-inline text-center"}, 
	            React.createElement("span", {className: "solution"}, "/", React.createElement("textarea", {ref: "solutionText", onChange: this.setRegex, rows: "1", cols: "50", type: "text", className: "regex form-control", placeholder: "Regex solution..."}), "/")
	          ), 

	          React.createElement("div", null, 

	            this.state.solved ? React.createElement("h3", {className: "success"}, "Success!!! Solved All Test Cases!") : null, 

	            React.createElement("p", {className: "instruction"}, 'Make all words turn green to complete the challenge'), 
	            React.createElement("div", {className: "col-sm-6 text-center"}, 
	              React.createElement("h3", null, 'Should match'), 
	              this.displayTestCases('truthy', true)
	            ), 
	            React.createElement("div", {className: "col-sm-6 text-center"}, 
	              React.createElement("h3", null, 'Should not match'), 
	              this.displayTestCases('falsy', false)
	            )
	          )
	        )
	      );
	    } else {
	      var questions = this.props.data.map(function(question, index) {
	        return (
	          React.createElement("tr", {className: "question"}, 
	            React.createElement("td", null, React.createElement("b", null, question.title)), 
	            React.createElement("td", null, React.createElement("p", null, question.description)), 
	            React.createElement("td", null, React.createElement("a", {className: "btn btn-primary", onClick: this.props.goToQuestionDetail.bind(this, index), href: "#"}, "Solve"))
	          )
	        )
	      }.bind(this));
	      return (
	        React.createElement("div", null, 
	          React.createElement("table", {className: "questionContainer table table-hover"}, 
	            React.createElement("tbody", null, 
	              questions
	            )
	          )
	        )
	      );
	    }
	  }
	});

	module.exports = QuestionContainer;


/***/ }
/******/ ]);