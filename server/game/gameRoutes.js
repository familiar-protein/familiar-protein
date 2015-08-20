var gameController = require('./gameController.js');

module.exports = function(app){
  console.log("Accessing gameRoutes");
  app.post('/makeGame', gameController.makeGame);
  app.get('/gameExists/:id', gameController.getGame); // might be code?
};