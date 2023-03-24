const jobList = ['FE', 'BE'];

const email = (val) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(val).toLowerCase());
}

const Validator = () => {
  const strategies = {
    checkEmail: v => email(v),
    checkNull: v => !!v,
    checkBetween255: v => v > 0 && v < 255,
    checkBetween50: v => v > 0 && v < 50,
    checkBetweenOptional: (v, lt, gt) => v > parseInt(gt) && v < parseInt(lt),
  }
  const queues = [];
  const add = (value, method) => {
    queues.push(() => strategies[method](value))
  }
  const check = () => queues.every(fn => fn());
  return { add, check }
}

const data = {
  value: 'admin',
  key: 'email'
};

const compose = () => {
  const validator = Validator();
  validator.add(data.value, 'checkEmail');
  validator.add(data.value, 'checkNull');
  return validator.check();
}

console.log('compose() :>> ', compose());