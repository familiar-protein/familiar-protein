var gameController = require('./gameController.js');

module.exports = function(app){
  console.log("Accessing gameRoutes");
  app.post('/makeGame', gameController.makeGame);
  app.get('/gameExists', gameController.updateGame); // might be code?
};