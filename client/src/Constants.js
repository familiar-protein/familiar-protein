var keyMirror = require('../../node_modules/react/lib/keyMirror');

module.exports = {
  // API route

  ActionTypes: keyMirror({
    LOAD_QUESTIONS: null,
    QUESTIONS_LOADED: null,
    USER_AUTHENTICATION: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};