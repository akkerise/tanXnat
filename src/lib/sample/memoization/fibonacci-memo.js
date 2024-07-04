let count = 0;
function fibonacci(n, memo) {
  memo = memo || {}
  if (memo[n]) return memo[n]
  if (n <= 1) return 1
  count++
  return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
}

console.time('time')
const result = fibonacci(20)
console.timeEnd('time')

console.log(count)
console.log(result)
