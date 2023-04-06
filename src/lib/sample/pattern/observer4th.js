var Subject = function () {
  let observers = []
  return {
    subscribe: function (observer) {
      observers.push(observer);
    },
    unsubscribe: function (observer) {
      let index = observers.indexOf(observer);
      if (index > -1) {
        observers.splice(index, 1);
      }
    },
    notify: function (observer) {
      let index = observers.indexOf(observer);
      if (index > -1) {
        observers[index].notify(index);
      }
    },
    notifyAll: function () {
      for (let i = 0; i < observers.length; i++) {
        observers[i].notify(i);
      };
    }
  };
};

var Observer = function () {
  return {
    notify: function (index) {
      console.log("Observer " + index + " is notified!");
    }
  }
}

var subject = new Subject();

var observer0 = new Observer();
var observer1 = new Observer();
var observer2 = new Observer();
var observer3 = new Observer();

subject.subscribe(observer0);
subject.subscribe(observer1);
subject.subscribe(observer2);
subject.subscribe(observer3);

// subject.notify(observer0); // Observer 0 is notified!
// subject.notify(observer1); // Observer 1 is notified!


subject.unsubscribe(observer0);
subject.notifyAll();
// Observer 0 is notified!
// Observer 1 is notified!
// Observer 2 is notified!
// Observer 3 is notified!


