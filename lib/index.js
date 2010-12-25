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
        doAction(config.actions[i++])
      })
    }
    doAction(config.actions[i++]);
  }
}

module.exports = bench
