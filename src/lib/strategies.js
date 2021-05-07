// list job 
const jobList = ['FE', 'BE'];

// function
var strategies = {
  checkRole: (value) => value === 'admin',
  checkGrade: (value) => value >= 1,
  checkJob: (value) => jobList.includes(value),
  checkEatType: (value) => value === 'eat Dog'
}

var Validator = function() {
  this.cache = [];

  // add su kien
  this.add = function(value, method) {
    this.cache.push(function() {
      return strategies[method](value);
    });
  };

  // check
  this.check = function() {
    for (let i = 0; i < this.cache.length; i++) {
      let valiFn = this.cache[i];
      var data = valiFn(); // check tai day
      if (!data) {
        return false;
      }
    }
    return true;
  };
}

var compose1 = function() {
  var validator = new Validator();
  const data1 = {
    role: 'admin',
    grade: 3
  };
  validator.add(data1.role, 'checkRole');
  validator.add(data1.grade, 'checkGrade');
  const result = validator.check();
  return result;
}

var compose2 = function() {
  var validator = new Validator();
  const data2 = {
    role: 'admin',
    job: 'BE'
  };
  validator.add(data2.role, 'checkRole');
  validator.add(data2.job, 'checkJob');
  const result = validator.check();
  return result;
}

console.log(compose2())