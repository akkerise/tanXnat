class Car {
  constructor(engine, chassis, body) {
    this.engine = engine;
    this.chassis = chassis;
    this.body = body;
  }

  toString() {
    return JSON.stringify(this)
  }
}

class CarBuilder {
  addChassis(chassis) {
    this.chassis = chassis;
    return this;
  }
  addEngine(engine) {
    this.engine = engine;
    return this;
  }
  addBody(body) {
    this.body = body;
    return this;
  }
  build() {
    return new Car(this.engine, this.chassis, this.body);
  }
}

const car = new CarBuilder()
  .addEngine('v12')
  .addBody('KIA SOLUTION')
  .addChassis('LUXURY')
  .build();

const car1st = new CarBuilder()
  .addEngine('v10')
  .addBody('KIA SOLUTION LUXURY')
  .build();

console.log('Car', car.toString())
console.log('Car1st', car1st.toString())