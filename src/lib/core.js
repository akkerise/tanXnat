const distinct = arr => {
  if (arr === 'undefined' || !(arr instanceof Array)) return
  let found = new Set()
  return this.filter(element => {
    if (found.has(selector(element))) return false
    found.add(selector(element))
    return true
  })
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const uniq = (raws, key) => [...new Map(raws.map(item => [item[key], item])).values()]

const compose = (...fns) => fns.reduce((f, g) => (x) => f(g(x)))

const pipe = (...fns) => fns.reduce((f, g) => (x) => g(f(x)));

module.exports = {
  distinct,
  compose,
  delay,
  pipe,
  uniq
} 
