var helper = require(__dirname + '/test-helper');
var bencher = require(__dirname + '/../lib');

test('simplest thing ever',function() {
  var ran = 0;
  var benchmark = bencher.bench({
    repeat: 3,
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
      ran.should.equal(3)
    }))
  })
})
