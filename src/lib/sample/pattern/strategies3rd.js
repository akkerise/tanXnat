const jobList = ['FE', 'BE'];

var strategies = {
  checkRole: value => value === 'admin',
  checkGrade: value => value >= 1,
  checkJob: value => jobList.includes(value),
  checkEatType: value => value === 'eat Dog'
}

function Validator() {
  this.cache = [];

  this.add = function (value, method) {
    this.cache.push(function () {
      return strategies[method](value);
    });
  };

  this.check = function () {
    for (let i = 0; i < this.cache.length; i++) {
      let validFn = this.cache[i];
      var data = validFn();
      if (!data) {
        return false;
      }
    }
    return true;
  };
}

const data = {
  role: 'admin',
  grade: 3,
  job: 'BE'
};

const compose = () => {
  const validator = new Validator();
  validator.add(data.role, 'checkRole');
  validator.add(data.grade, 'checkGrade');
  validator.add(data.job, 'checkJob');
  return validator.check();
}

console.log('compose :>> ', compose());