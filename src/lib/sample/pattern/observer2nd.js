class Observer {
  constructor(name) {
    this.namePick = name;
  }

  update(location) {
    this.goToHelp(location);
  }

  goToHelp(location) {
    console.log(`${this.namePick} ping ::${location}`);
  }
}

class Subject {
  constructor() {
    this.observerList = []
  }

  addObserver(observer) {
    this.observerList.push(observer);
  }

  notify(location) {
    this.observerList.forEach(observer => observer.update(location))
  }
}

const subject = new Subject()

// your pick
const riki = new Observer('Riki')
const sniper = new Observer('Sniper')

// add riki and sniper to team
subject.addObserver(riki)
subject.addObserver(sniper)

// push location to Team
subject.notify({ long: 123, lat: 106 })
