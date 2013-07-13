
# curryable

  decorate a function so it will curry if not given enough arguments. See [why curry helps](http://hughfdjackson.com/javascript/2013/07/06/why-curry-helps) for a good explanation of the concept.

## Installation

_With [component](//github.com/component/component), [packin](//github.com/jkroso/packin) or [npm](//github.com/isaacs/npm)_  

	$ {package mananger} install jkroso/curryable

then in your app:

```js
var curryable = require('curryable')
```

## API

- [curryable()](#curryable)

### curryable(fn:function)

  make `fn` curryable

```js
var add = curryable(function(a, b){
	return a + b
})
var add1 = add(1)
add1(1) == add(1, 1) == 2 // => true
```

## Running the tests

Just run `make`. It will install and start a development server leaving the tests waiting for you [at](http://localhost:3000/test)
