const get = fn => arr => fn(arr)

const compose = (...fns) => fns.reduce((f, g) => (x) => f(g(x)))

const pipe = (...fns) => fns.reduce((f, g) => (x) => g(f(x)))

const curry = (fn) => {
  let totalArguments = fn.length;
  const next = (argumentLength, rest) => {
    return argumentLength > 0
      ? (...args) => next(argumentLength - args.length, [...rest, ...args])
      : fn(...rest)
  };
  return next(totalArguments, []);
};

const memoize = (fn) => {
  const cache = new Map();

  return (...args) => {
    const key = args.join('-');

    if (!cache.has(key)) {
      cache.set(key, fn(args))
    }

    return cache.get(key);
  }
}

const memoizer = (fn) => {
  let cache = {}
  return (n) => {
    if (cache[n] != undefined) {
      return cache[n]
    } else {
      let result = fn(n)
      cache[n] = result
      return result
    }
  }
}

/**
  * How to the way use memoizer function
  */

const fibonacci = (n) => {
  if (n <= 1) return 1
  return fibonacci(n - 1) + fibonacci(n - 2);
}
const fibonacciMemoizer = memoizer(fibonacci)


module.exports = { get, pipe, curry, compose, memoize, memoizer, fibonacciMemoizer }
