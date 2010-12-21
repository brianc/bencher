var helper = require(__dirname + '/test-helper');
var bencher = require(__dirname + '/../lib');

test('simplest thing ever',function() {
  var ran = 0;
  var benchmark = bencher.bench({
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

