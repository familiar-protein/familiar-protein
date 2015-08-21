var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../Dispatcher');

var CHANGE_EVENT = 'change';

var userAuth = {
  username: null,
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

  setUsername: function (username) {
    userAuth.username = username;
  },

  setUserProfile: function (data) { 
    userAuth.profileView = data;
  },
  
  getState: function () {
    return userAuth;
  },

  getUsername: function () {
    return userAuth.username;
  },

  getUser: function () {
    return userAuth.profileView;
  }
});

UserStore.dispatchToken = Dispatcher.register(function (action) {
  if (action.type === 'USER_AUTHENTICATION') {
    UserStore.setUsername(action.payload.username);
    UserStore.emitChange();
  }

  if (action.type === 'GET_USER_PROFILE') {
    UserStore.setUserProfile(action.payload.username);
    UserStore.emitChange();
  }

});

module.exports = UserStore;