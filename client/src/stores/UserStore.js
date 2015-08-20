var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../Dispatcher');

var CHANGE_EVENT = 'change';

var userAuth = {
  loggedIn: false,
  error: false,
  profileView: { //  handles the /user route
    username: null
  }
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

  setAuthentication: function (authentication) {
    userAuth.loggedIn = authentication;
  },

  setUserProfile: function (data) {
    userAuth.profileView = data;
  },

  getUser: function () {
    return userAuth.profileView;
  }
});

UserStore.dispatchToken = Dispatcher.register(function (action) {
  if (action.type === 'USER_AUTHENTICATION') {
    UserStore.setAuthentication(action.authentication);
    UserStore.emitChange();
  }

  if (action.type === 'GET_USER_PROFILE') {
    UserStore.setUserProfile(action.userData);
    UserStore.emitChange();
  }
});

module.exports = UserStore;