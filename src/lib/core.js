const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const uniq = (raws, key) => [...new Map(raws.map(item => [item[key], item])).values()]

const compose = (...fns) => fns.reduce((f, g) => (x) => f(g(x)))

const pipe = (...fns) => fns.reduce((f, g) => (x) => g(f(x)));

const deduplicate = (arr) => [...new Set(arr)];

const unique = arr => arr.filter((v, i, a) => a.indexOf(v) === i);

module.exports = {
  deduplicate,
  compose,
  unique,
  delay,
  pipe,
  uniq,
} 
