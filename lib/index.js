module.exports = {
  bench: function(config) {
    return function(callback) {
      config.actions.forEach(function(action) {
        action.run.call(action, callback)
      })
    }
  }
}
