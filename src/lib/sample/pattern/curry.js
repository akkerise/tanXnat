
const sum = (a, b, c) => a + b + c;
const multiply = (a, b, c) => a * b * c;

const curry = (fn) => {
  let totalArguments = fn.length;
  let next = (argumentLength, rest) => {
    console.log('argumentLength :>> ', argumentLength);
    return argumentLength > 0
      ? (...args) => next(argumentLength - args.length, [...rest, ...args])
      : fn(...rest)
  };
  return next(totalArguments, []);
};

const curriedSum = curry(sum);

console.log('curriedSum(4, 4, 2) :>> ', curriedSum(4, 4, 2)); // => 10
console.log('curriedSum(4, 3, 3) :>> ', curriedSum(4, 3, 3)); // => 10
console.log('curriedSum(3, 5, 2) :>> ', curriedSum(3, 5, 2)); // => 10
console.log('curriedSum(5, 3)(2) :>> ', curriedSum(5, 3)(2)); // => 10
console.log('curriedSum(5)(3)(2) :>> ', curriedSum(5)(3)(2)); // => 10