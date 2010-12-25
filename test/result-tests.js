var helper = require(__dirname + '/test-helper')
var bench = require(__dirname + '/../lib')
var timeout = 10;
var bm = bench({
  name: 'boom',
  repeat: 10,
  actions:[{
    name: 'first',
    run: function(next) {
      setTimeout(next, 10)
    }
  },{
    name: 'second',
    run: function(next) {
      setTimeout(next, timeout += 10)
    }
  }]
})

test('results', function() {
  bm(should.call(function(result) {
    result.actions.length.should.equal(2)

    test('first action',function() {
      var firstAction = result.actions[0]
      firstAction.name.should.equal('first')
      firstAction.repeats.length.should.equal(10)
      firstAction.repeats.forEach(function(repeat) {
        repeat.start.should.be.instanceof(Date)
        repeat.end.should.be.instanceof(Date)
      })
    })

  }))
})

