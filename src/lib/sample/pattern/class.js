/**
 * 
 * @param {*} OldClass
 * 1. Don't use arrow functions
 * 2.  
 */
var OldClass = function (food) {
  this.food = food;
};

OldClass.prototype.eat = function () {
  return '😋';
};

class SuperArray extends Array {
  constructor() {

  }

  diff(comparisonArray) {
    const hash = new Set(comparisonArray)
    return this.filter(v => !hash.has(v))
  }

  // Static Method
  static utensil() {
    return '🥢';
  }
}
