var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../Dispatcher');


var questions = [];
var CHANGE_EVENT = 'change';

var QuestionStore = assign({}, EventEmitter.prototype, { // assign === _.extend
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getQuestions: function () {
    return questions;
  },

  loadQuestions: function (loadedQuestions) {
    questions = loadedQuestions;
  }
});

QuestionStore.dispatchToken = Dispatcher.register(function (action) {
  if (action.type === 'QUESTIONS_LOADED') {
    QuestionStore.loadQuestions(action.questions);
    QuestionStore.emitChange();
  }
});

module.exports = QuestionStore;