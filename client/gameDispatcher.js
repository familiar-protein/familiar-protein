var Dispatcher = function() {
  this._subs = [];
};

/**
 * Registers a callback to later recieve event objects
 * @param cb Function that expects a single object parameter
 */
Dispatcher.prototype.register = function(cb){
    this._subs.push(cb);
};

/**
 * Executes all registered callbacks with an event object
 * @param payload Object that has keys and values relevant
 *                       to a target callback
 */
Dispatcher.prototype.dispatch = function(payload){
  for(var i = 0; i < this._subs.length; i++){
    this._subs[i](payload);
  }
};