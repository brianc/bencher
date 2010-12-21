var executeAction = function(action, callback) {
  var i = 0
  var doAction = function(action, context) {
    //no more repeats to execute
    if(action.repeat > i++) {
      if(context) {
        var cb = function() {
          doAction(action, context)
        }
        action.run(context, cb)
      } else {
        var cb = function() {
          doAction(action)
        }
        action.run(cb)
      }
    } else {
      callback();
    }
  }
  if(action.setup) {
    action.setup(function(result) {
      doAction(action, result)
    })
  } else {
    doAction(action)
  }

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
