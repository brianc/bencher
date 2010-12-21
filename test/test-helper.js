//global test function
var should = require('should')
var Assertion = should.Assertion;
var assert = require('assert');

Assertion.prototype.call = function(method, timeout) {
  var called = false
  timeout = timeout || 100;
  var id = setTimeout(function() {
    assert.ok(false, "Timeout wasn't called within " + timeout);
  }, timeout)
  return function() {
    called = true
    clearTimeout(id);
    method.apply(this, arguments)
  }
}

test = function(name, testFn) {
  testFn()
}

