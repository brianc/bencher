module.exports = {
  bench: function(config) {
    return function(callback) {
      var action = config.actions[0];
      var i = 0
      var doAction = function(action) {
        //no more repeats to execute
        if(config.repeat > i++) {
          action.run(function() {
            doAction(action)
          })
        } else {
          callback();
        }
      }
      doAction(action)
    }
  }
}
