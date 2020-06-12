
## Optional chaining `?.`

`obj.?foo.?fee` chains access to a property only if it exists, otherwise returns `undefined`. Useful to replace shortcircuiting when it is unkown if a property exists.

Replace
```js
const foo = user && user.address && user.address.street 
```
With
```js
const foo = user?.address?.street 
```
`?.` Returns `undefined` if a property does not exist.

The issue with shortcircuiting is that if it finds a `falsy` value, it will return the `falsy` value instead of `undefined`.

```js
let obj = { zero: 0, notFalsy: 1 }
let val;

val = obj.zero.one // evaluates to undefined
console.log(val)

// The issue:
// Sometimes 'obj.zero.one.two' exists, sometimes it does not, you need to get its value when it
//  exists, or get undefined if it does not exist, but the following throws an error:

val = obj.zero.one.two // throws undefined TypeError

// Possible solutions:

// A. Shortcircuiting:

val = obj.zero && obj.zero.one // evaluates to 0
val = obj.zero && obj.zero.one && obj.zero.one.two // evaluates to 0, avoids error
val = obj.zero.one && obj.zero.one.two // evaluates to undefined, avoids error
console.log(val)

// The problem with shortcircuiting:
// It is not guaranteed to return 'undefined' when the property does not exist, it will evaluate to
//  falsy values such as '0', 'false', null... Shortcircuiting is also a little hard to read

// shortCircuiting works fine if it doesn't find a falsy value:
val = obj.notFalsy && obj.notFalsy.one && obj.notFalsy.one.two // evaluates to undefined, avoids error
console.log(val)

// B. Optional Chaining

val = obj?.zero?.one?.two // avoids error, evaluates to undefined instead of '0', easy to read
console.log(val)

```

[javascrip.info link](https://javascript.info/optional-chaining)


## Null Coalescing `??`


Replace
```js
const foo = mightBeNullorUndefined || 100
```
With
```js
const foo = mightBeNullorUndefined ?? 100
```
The issue with `someVar || 100` is that if `someVar` equals a falsy value and falsy values are valid, they won't be evaluated, instead `100` will be the result. `someVar ?? 100` checks for `null` and `undefined`, but returns falsy values if they are found in `someVar`.

```js
let someVar = 0
console.log(someVar || 5) // outputs 5
console.log(someVar ?? 5) // outputs 0

someVar = ''
console.log(someVar || 5) // outputs 5
console.log(someVar ?? 5) // outputs ''

someVar = false
console.log(someVar || 5) // outputs 5
console.log(someVar ?? 5) // outputs false

someVar = null
console.log(someVar || 5) // outputs 5
console.log(someVar ?? 5) // outputs 5

someVar = undefined
console.log(someVar || 5) // outputs 5
console.log(someVar ?? 5) // outputs 5

```

[javascrip.info link](https://javascript.info/nullish-coalescing-operator)