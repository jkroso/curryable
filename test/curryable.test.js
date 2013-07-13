
var curryable = require('..')
var chai = require('./chai')
var sum
var spy

beforeEach(function(){
	spy = chai.spy(function(a, b, c, d){
		var val = 0
		for (var i = 0, len = arguments.length; i < len; i++) {
			val += arguments[i]
		}
		return val
	})
})

it('should work', function () {
	sum = curryable(spy)
	sum(5)(5)(5)(5).should.equal(20)
	sum(5, 5)(5, 5).should.equal(20)
	sum(5, 5, 5, 5).should.equal(20)
	sum(5)(5, 5, 5).should.equal(20)
	sum(5, 5, 5)(5).should.equal(20)
	spy.should.have.been.called(5)
})

it('should use the context of the last call', function(){
	var w = {}
	var r = {}
	curryable(function(a, b, c, d){
		this.should.equal(r)
		return spy.apply(this, arguments)
	}).call(w, 5)
		.call(w, 5, 5)
		.call(r, 5).should.equal(20)
})

describe('user defined arity', function(){
	it('should call as soon as it hits it', function(){
		curryable(spy, 2)(1, 2).should.equal(3)
		curryable(spy, 1)(1).should.equal(1)
		curryable(spy, 0)().should.equal(0)
	})

	it('should ignore `fn.length`', function(){
		curryable(spy, 5)(1,1,1,1,1)
		spy.should.not.have.been.called
	})

	it('should support negative numbers', function(){
		curryable(spy, -1)(1,2)(3).should.equal(6)
		curryable(spy, -2)(1)(2).should.equal(3)
		curryable(spy, -3)(1).should.equal(1)
		curryable(spy, -4)().should.equal(0)
	})
})