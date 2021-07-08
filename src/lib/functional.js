const get = fn => arr => fn(arr)

const findMax = arr => Math.max(...arr)

const findMin = arr => Math.min(...arr)

const max = get(findMax)

const min = get(findMin)

const curry = (fn) => {
  let totalArguments = fn.length;
  const next = (argumentLength, rest) => {
    return argumentLength > 0
      ? (...args) => next(argumentLength - args.length, [...rest, ...args])
      : fn(...rest)
  };
  return next(totalArguments, []);
};

module.exports = {
  get,
  min,
  max,
  curry,
  findMax,
  findMin,
}