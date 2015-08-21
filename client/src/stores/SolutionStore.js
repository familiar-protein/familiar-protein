var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../Dispatcher');


var solutions = [];
var allSolutions = [];
var CHANGE_EVENT = 'change';

var SolutionStore = assign({}, EventEmitter.prototype, { // assign === _.extend
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getSolutions: function () {
    return solutions;
  },

  getAllSolutions: function () {
    return allSolutions;
  },

  loadSolutions: function (loadedSoutions) {
    solutions = loadedSoutions;
  },

  loadAllSolutions: function (loadedSolutions) {
    allSolutions = loadedSolutions;
  }
});

SolutionStore.dispatchToken = Dispatcher.register(function (action) {
  if (action.type === 'SOLUTIONS_LOADED') {
    // console.log('Got Solutions', action.solutions);
    SolutionStore.loadSolutions(action.solutions);
    SolutionStore.emitChange();
  }

  if (action.type === 'ALL_SOLUTIONS_LOADED') {
    console.log('reaches solution store');
    SolutionStore.loadAllSolutions(action.solutions);
    SolutionStore.emitChange();
  }
});

module.exports = SolutionStore;