# variables
- variables have zero values depending on their type
- declare variables with var or use `:=` (walrus operator) for declaration and instantiation
- there's `make` for creating some things too
# Arrays
- arrays are of a set size
- there are slices to have what looks like dynamic arrays
- slices reference arrays under-the-hood
- slices have length and 'capacity'
- when you increment a slice beyond its underlying array's size, a new array is made with the larger size that will be the new reference to the slice. The data from the smaller array is copied to the larger array.
- slices reference their underlying array, so if you use a slice to take a small part of a very large array, your large array will remain in memory and won't be garbage-collected. To free the unused parts of the array, copy the part that you need into a new array.
# Maps
- when accessing a key in a map, two values may be returned, value of the element and whether the key exists in the map
# Pointers
- pointers, like in other languages
- their type is declared with `*`, for instance `var intPointer *int`
- when you "dereference" a pointer, to access its underlying value, you do so with `*` as well
`pointerValue := *pointer` will set the underlying value of the pointer to the variable pointerValue
- you can also "derefence" a pointer on the left side of an assignment, to change the underlying pointer value.
`*pointer = 45` sets the underlying value of pointer to 45
- if you have a value without a pointer, and you want to create a pointer to it, use the `&` operand.
```go
num := 44
newPointer := &v
```
newPointer will point to the 44 value
- there is no pointer arithmetic like in the C language
# Struct
- declare a list of properties
- access a field by using the dot operator, like a javascript object `structName.structProperty`
- when you have a pointer to a struct, you can access the struct by using `(*p).X`, but go lets us use pointers like javascript objects, so we just need to do `p.X` and go takes care of dereferencing the pointer
# Switch
- switch statements without constant cases is superb, functions can be used as a case
- switch cases always `break`, the program won't run the cases below the matched case, as is common with other programming languages
# if/for
- no parentheses for `if`/`for`, while is removed and replaced with for
- you may use range operator the `for` loop to iterate over a slice or a map, you will get the index and the element inside the for loop
# Defer
- when evaluated, the defer expression will be executed after the function executes, and the function will return after the defer expressions
- when you defer a function with certain arguments, the arguments are evaluated when the `defer` statement is encountered, but the function won't be executed until the end of the function
- if a `panic` is called within a function, the expressions that have been `defer`ed will be executed before the function returns the `panic` to the place where it was called from
# Functions
- functions may return more than one value
- functions may name the return value
- functions may reference their return value inside their body
- functions have closures, like javascript functions
# Methods
- Go has no classes, instead there are methods: functions with a `receiver`, work similarly to `this` in javascript
- pointer receivers modify the value of the original object sent to the function, if you don't use a pointer then you will only modify a variable within the scope of the function, and not from the function's call-site
- functions make a copy of their arguments, use pointers to modify the values outside of the function
- You can only declare a method with a receiver whose type is defined in the same package as the method
- Receivers that are pointers can be called by a variables that is not a pointer, go will handle making it a pointer for the method function
```go
type MyFloat float64
func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}
func main() {
	f := MyFloat(-math.Sqrt2)
	fmt.Println(f.Abs())
}
```
MyFloat is the receiver declared in `Abs()` function
# Interface
- similar to interface in another language, an interface defines method signatures, if a type implements an interface, that means that the method defined by the interface must exist with the given type (the ones that implements the interface) as a receiver
- so for a type to implement an interface:
0. there will be an interface that you want your type to implement, the interface declares a series of function signatures (that will be `methods`)
1. there must be a function that has the name specified by the interface
2. this function must have as receiver the given type
3. repeat for every function signature in the interface
4. your type implements the interface now
- a variable is declared with the interface type, then assigned a type that implements said interface
```go
var a Abser
f := MyFloat(-math.Sqrt2)
a = f // will error if `f` does not implement the Abser interface
```
## Type assertions
```go
var i interface{}
i = "hello"
s, ok := i.(string)
```
- if interface `i` holds a value of type `(string)` then `s` will become the value held by `i` (in this case `"hello"`)
- if interface `i` does not hold a value of type string, then `s` will be the zero value of type `(string)` and the second return value (in this case `ok`) will be `false`
- if the second return value (in this case `ok`) is not used, and the interface does not hold a value of type `(string)`, then a `panic` will be triggered. Eg. `s := i.(float64)`
### Switch type assertion
- you can have a switch for types `switch v := i.(type) { case int: ... case string: ... default: ... }`
# Error & Stringer
- interfaces in Go, implement them for a given type in order to be able to print them with `fmt`
# Goroutines
- `go foo(x, y, z)`
## Channels
- you send stuff to the channel, and you receive stuff from the channel, the order of values when they are received works like... a queue? or first one to get processed maybe?
1. make the channel `someChannel := make(chan int)`
2. send data to the channel `someChannel <- 34`
3. receive data from the channel `value := <- someChannel`
- pass a channel as parameter to a function, then inside the functions send the value to the channel instead of returning the value
- you can have "buffered" channels, determines a maximum amount of "sends" that can be done before the data is received
- a sender can close a channel, usually not necessary, but useful when receiving values from a channel inside a `for i := range channel` loop, a channel can be tested to know if it is closed with a second argument, like `v, ok := <-ch`
## Select
- will wait for values from channels
- has cases for multiple channels, executes the case for the channel that runs first, or randomly picks one if multiple channels send data at the same time
- the default case is run if no other case is ready
## sync.Mutex
- make sure only one goroutine can access a variable at a time to avoid conflicts
- use Lock and Unlock
- you can put Unlock in a `defer`