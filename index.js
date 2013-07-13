
var unshift = Array.prototype.unshift

/**
 * make `fn` curryable
 *
 * @param  {function} fn
 * @return {function}
 */

module.exports = function(fn){
	var arity = fn.length
	return function curryable(){
		// apply is slow
		if (arguments.length >= arity) switch (arguments.length) {
			case 0: return fn.call(this)
			case 1: return fn.call(this, arguments[0])
			case 2: return fn.call(this, arguments[0], arguments[1])
			case 3: return fn.call(this, arguments[0], arguments[1], arguments[2])
			default:return fn.apply(this, arguments)
		}
		var args = arguments
		return function curriedFn(){
			unshift.apply(arguments, args)
			return curryable.apply(this, arguments)
		}
	}
}