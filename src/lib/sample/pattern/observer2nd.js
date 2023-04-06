class Observer {
  constructor(name){
    this.name = name
  }
  
  update(location){
    this.goToHelp(location);
  }

  goToHelp(location){
    console.log(`${this.name} ping::${JSON.stringify(location)}`);
  }
}

class Subject {
  constructor(){
    this.observers = []
  }
  subscribe(observer){
    this.observers.push(observer);
  }
  notify(location){
    this.observers.forEach(observer => observer.update(location));
  }
}

const subject = new Subject();
const riki = new Observer('Riki')
const sniper = new Observer('Sniper')
subject.subscribe(riki)
subject.subscribe(sniper)
subject.notify({long: 123, lat: 106})
