var helper = require(__dirname + '/test-helper');
var bencher = require(__dirname + '/../lib');

test('single repeat',function() {
  var ran = 0;
  var benchmark = bencher.bench({
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
  var benchmark = bencher.bench({
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
    var benchmark = bencher.bench({
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
