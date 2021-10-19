const jobList = ['FE', 'BE'];

const strategies = {
  checkRole: value => value === 'admin',
  checkGrade: value => value >= 1,
  checkJob: value => jobList.includes(value),
  checkEatType: value => value === 'eat Dog'
}

const Validator = () => {
  const queues = [];

  const add = (value, method) => {
    queues.push(() => strategies[method](value))
  }

  const check = () => queues.every(fn => fn());

  return { add, check }
}

const data = {
  role: 'admin',
  grade: 3,
  job: 'BE'
};

const compose = () => {
  const validator = Validator();
  validator.add(data.role, 'checkRole');
  validator.add(data.grade, 'checkGrade');
  validator.add(data.job, 'checkJob');
  return validator.check();
}

