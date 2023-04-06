function Click() {
  this.handlers = [];  // observers
}

Click.prototype = {
  subscribe: function (fn) {
    this.handlers.push(fn);
  },
  unsubscribe: function (fn) {
    this.handlers = this.handlers.filter(f => f !== fn);
  },
  fire: function (o, thisObj) {
    let scope = thisObj || globalThis.window;
    this.handlers.forEach(function (fn) {
      fn.call(scope, o);
    });
  },
  notify: function (o) {
    this.handlers.forEach(function (fn) {
      fn(o)
    });
  }
}

var click = new Click();
var clickHandler1 = item => console.log("fired: " + item)
click.subscribe(clickHandler1);
click.fire('event #1');
click.unsubscribe(clickHandler1);
click.fire('event #2');
click.subscribe(clickHandler1);
click.fire('event #3');

// var clickHandler2 = item => console.log("notified: " + item)
// click.subscribe(clickHandler2);
// click.notify('notify #1');
// click.unsubscribe(clickHandler2);
// click.notify('notify #2');
// click.subscribe(clickHandler2);
// click.notify('notify #3');
