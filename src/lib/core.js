const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const debounce = (fn, delay) => {
  return args => {
    clearTimeout(fn.id)
    fn.id = setTimeout(() => {
      fn.call(this, args)
    }, delay)
  }
}

const throttle = (fn, delay) => {
  return args => {
    if (fn.id) return
    fn.id = setTimeout(() => {
      fn.call(this, args)
      clearTimeout(fn.id)
      fn.id = null
    }, delay)
  }
}

const uniq = (raws, key) => [...new Map(raws.map(item => [item[key], item])).values()]

const compose = (...fns) => fns.reduce((f, g) => (x) => f(g(x)))

const pipe = (...fns) => fns.reduce((f, g) => (x) => g(f(x)));

const deduplicate = (arr) => [...new Set(arr)];

const unique = arr => arr.filter((v, i, a) => a.indexOf(v) === i);

module.exports = {
  deduplicate,
  debounce,
  throttle,
  compose,
  unique,
  delay,
  pipe,
  uniq,
} 
