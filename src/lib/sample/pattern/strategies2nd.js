const JOBS = ['FE', 'BE'];
const EAT_TYPES = ['Dog', 'Cat']
const ROLES = ['admin']

var strategies = {
  checkRole: v => ROLES.includes(v),
  checkGrade: v => v >= 1,
  checkJob: v => JOBS.includes(v),
  checkEatType: v => EAT_TYPES.includes(v)
}

class Validator {
  constructor() {
    this.cache = [];
  }

  add(value, method) {
    this.cache.push(() => strategies[method](value))
  }

  check() {
    console.log('this.cache', this.cache)
    return this.cache.every(f => f())
  }
}

var compose1 = function () {
  var validator = new Validator();
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
  var validator = new Validator();
  const data2 = {
    role: 'admin',
    job: 'BE'
  };
  validator.add(data2.role, 'checkRole');
  validator.add(data2.job, 'checkJob');
  return validator.check();
}

console.log('compose2', compose2())
