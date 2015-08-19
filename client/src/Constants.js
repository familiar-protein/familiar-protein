var keyMirror = require('react/lib/keyMirror');

module.exports = {
  // API route

  ActionTypes: keyMirror({
    LOAD_QUESTIONS: null,
    QUESTIONS_LOADED: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  });
};