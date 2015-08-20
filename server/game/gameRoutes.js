var gameController = require('./gameController.js');

module.exports = function(app){
  app.post('/makeGame', gameController.makeGame);
};