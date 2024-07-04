let count = 0
function memoizer(fun) {
  let cache = {}
  return function(n) {

    if (cache[n] != undefined) {
      return cache[n]
    } else {
      let result = fun(n)
      cache[n] = result
      return result
    }
  }
}

function fibonacci(n) {
  if (n <= 1) return 1
  count++
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const fibonacciMemoization = memoizer(fibonacci)


console.time('time')
const result = fibonacciMemoization(20)
console.timeEnd('time')

console.log(result)
console.log(count)

