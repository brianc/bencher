var helper = require(__dirname + '/test-helper');
var bencher = require(__dirname + '/../lib');

test('simplest thing ever',function() {
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
        console.log("ran: %d", ran);
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

