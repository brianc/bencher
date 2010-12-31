var executeAction = function(action, callback) {
  var i = 0
  var doAction = function(action) {
    //no more repeats to execute
    if(i++ >= action.repeat) {
      return callback();
    }
    var repeat = {};
    repeat.start = new Date()
    action.run(function() {
      repeat.end = new Date()
      action.repeats.push(repeat)
      doAction(action)
    })
  }
  //set up results on action
  action.repeats = [];
  doAction(action)
}

var bench = function(config) {
  return function(callback) {
    var i = 0;
    var doAction = function(action) {
      //no more actions to execute
      if(!action) {
        return callback(config)
      }
      action.repeat = config.repeat;
      executeAction(action, function() {
        aggregateActionResults(action)
        doAction(config.actions[i++])
      })
    }
    doAction(config.actions[i++]);
  }
}

var aggregateActionResults = function(action) {
  var times = action.repeats.map(function(repeat) {
    return repeat.end - repeat.start
  })
  action.totalTime = times.reduce(function(prev, next) {
    return prev + next
  })
  action.meanTime = (action.totalTime/action.repeats.length)
}

module.exports = bench
