// list job 
const jobList = ['FE', 'BE'];

// function
var strategies = {
  checkRole: value => value === 'admin',
  checkGrade: value => value >= 1,
  checkJob: value => jobList.includes(value),
  checkEatType: value => value === 'eat Dog'
}

class Validator1st {
  constructor() {
    this.cache = [];
  }

  add(value, method) {
    this.cache.push(() => strategies[method](value))
  }

  check() {
    return this.cache.every(fn => fn())
  }
}

var compose1 = function () {
  var validator = new Validator1st();
  const data1 = {
    role: 'admin',
    grade: 3
  };
  validator.add(data1.role, 'checkRole');
  validator.add(data1.grade, 'checkGrade');
  return validator.check();
}

console.log('compose1', compose1())

var compose2 = function () {
  var validator = new Validator1st();
  const data2 = {
    role: 'admin',
    job: 'BE'
  };
  validator.add(data2.role, 'checkRole');
  validator.add(data2.job, 'checkJob');
  return validator.check();
}

console.log('compose2', compose2())
