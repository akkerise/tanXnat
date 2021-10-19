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

module.exports = { get, pipe, curry, compose, }