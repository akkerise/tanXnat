class SuperArray extends Array {
  constructor() { }

  diff(comparisonArray) {
    const hash = new Set(comparisonArray)
    return this.filter(v => !hash.has(v))
  }
}
