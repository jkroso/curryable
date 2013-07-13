
var curryable = require('..')
var chai = require('./chai')
var sum
var spy

beforeEach(function(){
	spy = chai.spy(function(a, b, c, d){
		return a + b + c + d
	})
	sum = curryable(spy)
})

it('should work', function () {
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
		return sum.apply(this, arguments)
	}).call(w, 5)
		.call(w, 5, 5)
		.call(r, 5).should.equal(20)
})