#### Regular Function
```
function add(one, two) {
    return one + two
}
```

#### Named Function
```
function sayHello(name) {
    console.log(`Hello...`)
}
```

#### Anonymous Function
```
function(name) {
    console.log(`Hello ${name}`)
}
```

#### Function Expression

1. Named Function Expression
```
const say = function sayHello(name) {
    console.log(`Hello Anonystick.com>>>`, name)
}
say('anonystick.com')
```
2. Anonymous Function Expression
```
const say = function(name) {
    console.log(`Hello ${name}`)
}
```

#### Arrow Function
```
const say = (name) => {
    console.log(`Hello ${name}`)
}
```

#### IIFE
```
(function(name){
    console.log(`Hello ${name}`)
})('anonystick.com')
```

#### Closures

```
function f1(){
    var N=0
    console.log(N)
    function f2() // Function f2
    {
        N += 1 // Plus for N variable
    }
    return f2
}
var result = f1()

result() // 1
result() // 2
result() // 3
```

#### Callbacks

```
function callback(name){
    console.log(`Hello ${name}`)
}
function b(callback){
    callback('anonystick.com')
}
b(callback)
```


