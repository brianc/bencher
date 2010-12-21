var executeAction = function(action, callback) {
  var i = 0
  var doAction = function(action) {
    //no more repeats to execute
    if(action.repeat > i++) {
      action.run(function() {
        doAction(action)
      })
    } else {
      callback();
    }
  }
  doAction(action)
}

var bench = function(config) {
  return function(callback) {
    var i = 0;
    var doAction = function(action) {
      if(action) {
        action.repeat = config.repeat;
        executeAction(action, function() {
          doAction(config.actions[i++])
        })
      } else {
        callback();
      }
    }
    doAction(config.actions[i++]);
  }
}

module.exports = bench
