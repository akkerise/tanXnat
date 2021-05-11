const jobList = ['FE', 'BE'];

var strategies = {
  checkRole: value => value === 'admin',
  checkGrade: value => value >= 1,
  checkJob: value => jobList.includes(value),
  checkEatType: value => value === 'eat Dog'
}
var Validator = function () {
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

class Validator {
  constructor() {
    this.queues = [];
  }

  add(value, method) {
    this.queues.push(() => strategies[method](value))
  }

  check() {
    return this.queues.every(fn => fn());
  }
}

const data = {
  role: 'admin',
  grade: 3,
  job: 'BE'
};

const compose1 = () => {
  const validator = new Validator();
  validator.add(data.role, 'checkRole');
  validator.add(data.grade, 'checkGrade');
  validator.add(data.job, 'checkJob');
  return validator.check();
}


// use Map
const actions = new Map([
  ['1', ['processing']],
  ['2', ['fail']],
  ['3', ['fail']],
  ['4', ['success']],
  ['5', ['cancel']],
  ['default', ['other']]
])

const clickHandler = (status) => actions.get(status) || actions.get('default')




// Module
const AnimalContainter = () => {

  const container = [];

  addAnimal: (name) => {
    container.push(name);
  }

  fetchAllAnimals: () => container

  removeAnimal: (name) => {
    const index = container.indexOf(name);
    if (index < 1) {
      throw new Error('Animal not found in container');
    }
    container.splice(index, 1)
  }

  return {
    add: addAnimal,
    fetch: fetchAllAnimals,
    remove: removeAnimal
  }
}

const container = AnimalContainter();
container.add('Hen');
container.add('Goat');
container.add('Sheep');

console.log(container.fetch()) //Array(3) ["Hen", "Goat", "Sheep"]
container.remove('Sheep')
console.log(container.fetch()); //Array(2) ["Hen", "Goat"]




// Singleton
function DatabaseConnection() {
  let databaseInstance = null;
  let count = 0;
  function init() {
    console.log(`Opening database #${count + 1}`);
  }
  function createIntance() {
    if (databaseInstance == null) {
      databaseInstance = init();
    }
    return databaseInstance;
  }
  function closeIntance() {
    console.log('closing database');
    databaseInstance = null;
  }
  return {
    open: createIntance,
    close: closeIntance
  }
}

const database = DatabseConnection();
database.open(); //Open database #1
database.open(); //Open database #1
database.open(); //Open database #1
database.close(); //close database





// Observer
function Observer() {
  this.observerContainer = [];
}

Observer.prototype.subscribe = function (element) {
  this.observerContainer.push(element);
}

// the following removes an element from the container
Observer.prototype.unsubscribe = function (element) {

  const elementIndex = this.observerContainer.indexOf(element);
  if (elementIndex > -1) {
    this.observerContainer.splice(elementIndex, 1);
  }
}

/**
* we notify elements added to the container by calling
* each subscribed components added to our container
*/
Observer.prototype.notifyAll = function (element) {
  this.observerContainer.forEach(function (observerElement) {
    observerElement(element);
  });
}



// Factory

DealerA = {};
DealerA.title = function title() {
  return "Dealer A";
};

DealerA.pay = function pay(amount) {
  console.log(
    `set up configuration using username: ${this.username} and password: ${this.password
    }`
  );
  return `Payment for service ${amount} is successful using ${this.title()}`;
};

//Dealer B
DealerB = {};
DealerB.title = function title() {
  return "Dealer B";
};

DealerB.pay = function pay(amount) {
  console.log(
    `set up configuration using username: ${this.username}
		and password: ${this.password}`
  );
  return `Payment for service ${amount} is successful using ${this.title()}`;
};

//@param {*} DealerOption
//@param {*} config

function DealerFactory(DealerOption, config = {}) {
  const dealer = Object.create(dealerOption);
  Object.assign(dealer, config);
  return dealer;
}

const dealerFactory = DealerFactory(DealerA, {
  username: "user",
  password: "pass"
});
console.log(dealerFactory.title());
console.log(dealerFactory.pay(12));

const dealerFactory2 = DealerFactory(DealerB, {
  username: "user2",
  password: "pass2"
});
console.log(dealerFactory2.title());
console.log(dealerFactory2.pay(50));




// Command 
(function () {
  var carManager = {
    //information requested
    requestInfo: function (model, id) {
      return "The information for " + model + " with ID " + id + " is foo bar";
    },
    // now purchase the car
    buyVehicle: function (model, id) {
      return "You have successfully purchased Item " + id + ", a " + model;
    },

    // now arrange a viewing
    arrangeViewing: function (model, id) {
      return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
    }
  };
})();



// Closure
function name(n) {
  return function (a) {
    return `${n} likes ${a}`;
  };
}
const whoILike = man => woman => `${man} likes ${woman}`;

function Product() {
  let name;

  this.setName = (value) => {
    name = value;
  };

  this.getName = () => name
}

var p = new Product();
p.setName("anonystick.com");

console.log(p.name); // undefined
console.log(p.getName()); // anonystick.com




// Higher order functions

const grades = [
  { name: 'John', grade: 8, sex: 'M' },
  { name: 'Sarah', grade: 12, sex: 'F' },
  { name: 'Bob', grade: 16, sex: 'M' },
  { name: 'Johnny', grade: 2, sex: 'M' },
  { name: 'Ethan', grade: 4, sex: 'M' },
  { name: 'Paula', grade: 18, sex: 'F' },
  { name: 'Donald', grade: 5, sex: 'M' },
  { name: 'Jennifer', grade: 13, sex: 'F' },
  { name: 'Courtney', grade: 15, sex: 'F' },
  { name: 'Jane', grade: 9, sex: 'F' }
]

let isBoy = student => student.sex === 'M'
let isGirl = student => student.sex === 'F'
let getBoys = grades => grades.filter(isBoy)
let getGirls = grades => grades.filter(isGirl)
let average = grades => grades.reduce((acc, curr) => acc + curr.grade, 0) / grades.length
let maxGrade = grades => Math.max(...grades.map(student => student.grade))
let minGrade = grades => Math.min(...grades.map(student => student.grade))

let classroomAverage = average(grades) // 10.2
let boysAverage = average(getBoys(grades)) // 7
let girlsAverage = average(getGirls(grades)) // 13.4
let highestGrade = maxGrade(grades) // 18
let lowestGrade = minGrade(grades) // 2
let highestBoysGrade = maxGrade(getBoys(grades)) // 16
let lowestBoysGrade = minGrade(getBoys(grades)) // 2
let highestGirlsGrade = maxGrade(getGirls(grades)) // 18
let lowestGirlsGrade = minGrade(getGirls(grades)) // 9


/**
 * Closure
 * @param {*} job 
 */

const hello = (greeting) => {
  return (who) => {
    console.log(greeting + ' ' + who);
  }
}

hello('Hello')('Dat'); // Hello Dat
hello('Good morning')('Matianda'); // Good morning Matianda

printInterviewQuestionFor("developer")("Matianda"); //Can you tell me about latest software you have built, Matianda?
printInterviewQuestionFor(); // nothings happen
printInterviewQuestionFor("designer")(); //Can you please explain about UX design, ?
printInterviewQuestionFor("")();

/**
 * IIFE
 */
let Printer = (function () {
  // private
  let hello = "Hello, ";
  // public
  return { greeting: () => hello }
})();

let PrinterController = (function (instancePrinter) {
  // public
  return {
    init: () => {
      var text = instancePrinter.greeting() + "Matianda";
      console.log(text);
    }
  }
})(Printer);

PrinterController.init(); // will print "Hello, Matianda"