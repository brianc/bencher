var helper = require(__dirname + '/test-helper');
var bencher = require(__dirname + '/../lib');

test('simplest thing ever',function() {
  var ran = false;
  var benchmark = bencher.bench({
    actions:[{
      name: 'first',
      run: function(next) {
        ran = true;
        next();
      }
    }]
  })
  test('execues', function() {
    benchmark(should.call(function() {
      ran.should.equal(true)
    }))
  })
})
