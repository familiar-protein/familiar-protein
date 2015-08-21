var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../Dispatcher');

var CHANGE_EVENT = 'change';

var userAuth = {
  username: null,
  user_id: null,
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

  setUserData: function (userData) {
    userAuth.username = userData.username;
    userAuth.user_id = userData.user_id;
    // console.log(userAuth);
  },

  setUserProfile: function (data) { 
    userAuth.profileView = data;
  },
  
  getState: function () {
    return userAuth;
  },

  getUser: function () {
    return {username:userAuth.username, user_id: userAuth.user_id};
  },

  getProfile: function () {
    return userAuth.profileView;
  }
});

UserStore.dispatchToken = Dispatcher.register(function (action) {
  if (action.type === 'USER_AUTHENTICATION') {
    UserStore.setUserData(action.payload);
    UserStore.emitChange();
  }

  if (action.type === 'GET_USER_PROFILE') {
    UserStore.setUserProfile(action.payload);
    UserStore.emitChange();
  }

});

module.exports = UserStore;