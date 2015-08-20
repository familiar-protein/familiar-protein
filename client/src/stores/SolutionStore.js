var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../Dispatcher');


var solutions = [];
var CHANGE_EVENT = 'change';

var SolutionStore = assign({}, EventEmitter.prototype, { // assign === _.extend
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getSolutions: function () {
    return solutions;
  },

  loadSolutions: function (loadedSoutions) {
    solutions = loadedSoutions;
  }
});

SolutionStore.dispatchToken = Dispatcher.register(function (action) {
  if (action.type === 'SOLUTIONS_LOADED') {
    //console.log('Got Solutions');
    SolutionStore.loadSolutions(action.solutions);
    SolutionStore.emitChange();
  }
});

module.exports = SolutionStore;