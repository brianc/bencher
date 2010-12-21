var executeAction = function(action, callback) {
  var i = 0
  var doAction = function(action, context) {
    //no more repeats to execute
    if(action.repeat > i++) {
      //support for optional context overloads
      //there might be a better way to do this
      if(context) {
        var cb = function() {
          doAction(action, context)
        }
        action.run(context, cb)
      } else { //no context
        var cb = function() {
          doAction(action)
        }
        action.run(cb)
      }
    } else { //no more actions to repeat, do teardown if teardown
      if(action.teardown) {
        //support for optional context overloads
        //there might be a better way to do this
        if(context) {
          action.teardown(context, callback)
        } else {
          action.teardown(callback)
        }
      } else {
        callback()
      }
    }
  }
  //optional setup parameter
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
