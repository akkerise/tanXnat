const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const debounce = (fn, delay) => {
  return args => {
    clearTimeout(fn.id)
    fn.id = setTimeout(() => {
      fn.call(this, args)
    }, delay)
  }
}

/**
 * 
 * @param {*} fn 
 * @param {*} delay 
 * @returns 
 */

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

/**
 * @method deduplicate2nd
 * @param arr [2, 1, 0, 3, 2, 1, 2];
 * @result [2, 1, 0, 3]
 */
const deduplicate2nd = (arr = []) => arr.reduce((t, v) => t.includes(v) ? t : [...t, v], []);

const deduplicate = (arr) => [...new Set(arr)];

const unique = arr => arr.filter((v, i, a) => a.indexOf(v) === i);

const difference = (arr = [], diffArr = []) => arr.reduce((t, v) => (!diffArr.includes(v) && t.push(v), t), []);

/**
 * @method flat
 * @param arr [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
 * @result [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
const flat = arr => arr.reduce((t, v) => t.concat(Array.isArray(v) ? Flat(v) : v), [])

/**
 * @method unzip
 * @param {*} arr [12, 45, 21, 65, 38, 76, 108, 43];
 * @result [["a", "b"], [1, 2], [true, false]]
 */
const unzip = (arr = []) => {
  return arr.reduce(
    (t, v) => (v.forEach((w, i) => t[i].push(w)), t),
    Array.from({ length: Math.max(...arr.map(v => v.length)) }).map(v => [])
  );
}

/**
 * @method group
 * @param {*} arr [
    { area: "GZ", name: "YZW", age: 27 },
    { area: "GZ", name: "TYJ", age: 25 },
    { area: "SZ", name: "AAA", age: 23 },
    { area: "FS", name: "BBB", age: 21 },
    { area: "SZ", name: "CCC", age: 19 }
  ];
 * @result { GZ: Array(2), SZ: Array(2), FS: Array(1) }
 */
const group = (arr = [], key) => key ? arr.reduce((t, v) => (!t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t), {}) : {};

/**
 * @method parseUrl
 * @param {*} url https://anonystick.com?age=55&name=anonystick
 * @result { age: "55", name: "anonystick" }
 */
const parseUrl = url => {
  return url.replace(/(^\?)|(&$)/g, "").split("&").reduce((t, v) => {
    const [key, val] = v.split("=");
    t[key] = decodeURIComponent(val);
    return t;
  }, {});
}

const max = (arr = []) => arr.reduce((t, v) => t > v ? t : v);

const min = (arr = []) => arr.reduce((t, v) => t < v ? t : v);

module.exports = {
  deduplicate2nd,
  deduplicate,
  difference,
  debounce,
  throttle,
  parseUrl,
  compose,
  unique,
  delay,
  group,
  unzip,
  pipe,
  uniq,
  flat,
  max,
  min
} 
