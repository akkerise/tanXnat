
const sum = (a, b, c) => a + b + c
const multiply = (a, b, c) => a * b * c;

const curry = (fn) => {
  let totalArguments = fn.length;
  const next = (argumentLength, rest) => {
    return argumentLength > 0
      ? (...args) => next(argumentLength - args.length, [...rest, ...args])
      : fn(...rest)
  };
  return next(totalArguments, []);
};

const curriedSum = curry(sum);
const curriedMultiply = curry(multiply);

console.log('curriedSum(4, 4, 2) :>> ', curriedSum(4, 4, 2)); // => 10
console.log('curriedSum(4, 3, 3) :>> ', curriedSum(4, 3, 3)); // => 10
console.log('curriedSum(3, 5, 2) :>> ', curriedSum(3, 5, 2)); // => 10
console.log('curriedSum(5, 3) :>> ', curriedSum(5, 3)); // => 10
console.log('curriedSum(5)(3)(2) :>> ', curriedSum(5)(3)(2)); // => 10
console.log('curriedSum(5, 3)(2, 4, 8) :>> ', curriedSum(5, 3)(2, 4, 8));
console.log('curriedMultiply(2,2,2) :>> ', curriedMultiply(2, 2, 2)); // => 8


const isLengthOver = (n) => (s) => s.length > n;
const is10Length = isLengthOver(10);
console.log('is10Length("333333333333") :>> ', is10Length('333333333333'));

const pickNumbers = (maximum) => {
  return (fn) => {
    const result = [];
    for (let i = 1; i <= maximum; i += 1) {
      if (fn(i)) result.push(i);
    }
    return result;
  };
}

const pickNumberLess20 = pickNumbers(20);

const odds = number => number % 2 === 1;

console.log('pickOdds :>> ', pickNumberLess20(odds));

// pickNumbers(20)(function (number) {
//   return number % 2 === 1;
// });

// pickNumbers(20)(function (number) {
//   return (number * 3 - 2) % 2 === 0;
// });