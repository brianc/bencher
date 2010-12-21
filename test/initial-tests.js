var helper = require(__dirname + '/test-helper');
var bench = require(__dirname + '/../lib');

test('single repeat',function() {
  var ran = 0;
  var benchmark = bench({
    repeat: 1,
    actions:[{
      name: 'first',
      run: function(next) {
        ran++;
        next();
      }
    }]
  })
  test('execues', function() {
    benchmark(should.call(function() {
      ran.should.equal(1)
    }))
  })

})

test('multiple itterations', function() {
  var ran = 0;
  var benchmark = bench({
    repeat: 3,
    actions:[{
      name: 'multiple',
      run: function(next) {
        ran++;
        next();
      }
    }]
  })

  test('executes multiple times', function() {
    benchmark(should.call(function() {
      ran.should.equal(3)
    }))
  })
})

test('multiple actions', function() {
  test('with multiple itteration', function() {
    var oneCalled = 0
    var twoCalled = 0
    var threeCalled = 0
    var benchmark = bench({
      repeat: 3,
      actions:[{
        name: 'calling 1',
        run: function(next) {
          oneCalled++
          next()
        }
      },{
        name: 'calling 2',
        run: function(next) {
          twoCalled++
          next()
        }
      },{
        name: 'calling 3',
        run: function(next) {
          threeCalled++
          next()
        }
      }]
    })
    benchmark(should.call(function() {
      test('calls first', function() {
        oneCalled.should.equal(3)
      })

      test('calls second', function() {
        twoCalled.should.equal(3)
      })

      test('calls third', function() {
        threeCalled.should.equal(3)
      })

    }))
  })

})

test('action setup', function() {
  test('not passing setup arg to following contexts', function() {
    var boom = 0;
    var bm = bench({
      repeat: 10,
      actions:[{
        name: 'boom',
        setup: function(next) {
          next(++boom)
        },
        run: function(context, next) {
          context.should.equal(1)
          next()
        },
        teardown: should.call(function(context, next) {
          context.should.equal(1)
          next()
        })
      }]
    })
    bm(should.call(function() {
      test('executes', function() {
        boom.should.equal(1)
      })

    }))
  })
})
