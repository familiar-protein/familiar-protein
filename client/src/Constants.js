var keyMirror = require('../../node_modules/react/lib/keyMirror');

module.exports = {
  // API route

  ActionTypes: keyMirror({
    LOAD_QUESTIONS: null,
    LOAD_SOLUTIONS: null,
    SOLUTIONS_LOADED: null,
    ADD_VOTE_TO_SOLUTION: null,
    QUESTIONS_LOADED: null,
    USER_AUTHENTICATION: null,
    GET_USER_PROFILE: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};