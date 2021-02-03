const get = by => arr => by(arr)

const findMax = arr => Math.max(...arr)

const findMin = arr => Math.min(...arr)

const max = get(findMax)

const min = get(findMin)

module.exports = {
  get,
  min,
  max,
  findMax,
  findMin,
}