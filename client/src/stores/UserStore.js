var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../Dispatcher');

var CHANGE_EVENT = 'change';

var userAuth = {
  loggedIn: false
};

var UserStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getState: function () {
    return userAuth;
  },

  setState: function (authentication) {
    userAuth.loggedIn = authentication;
  }
});

UserStore.dispatchToken = Dispatcher.register(function (action) {
  if (action.type === 'USER_AUTHENTICATION') {
    UserStore.setState(action.authenticated);
    UserStore.emitChange();
  }
});

module.exports = UserStore;