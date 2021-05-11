const events = require('events');
class EventEmitter {
  constructor() {
    this.ee = new events.EventEmitter();
  }

  /**
   * [Add event]
   * @param {en} [Event name]
   * @param {listener} [Function execute]
   */
  add(en, listener = []) {
    if (listener instanceof Array) {
      this.ee.on(`${en}`, [...listener])
    } else {
      this.ee.on(`${en}`, listener)
    }
  }

  /**
   * [Fire event]
   * @param {en} [Event name]
   * @param {data} [Data load to listener function]
   */
  fire(en, data) {
    this.ee.emit(`${en}`, data)
  }

  /**
   * [Remove event]
   * @param {en} [Event name]
   * @param {listener} [Function execute]
   */
  remove(en, listener) {
    this.ee.removeListener(`${en}`, listener);
  }

  /**
   * [Destroy all events]
   * @param  {[ens]} [ens is all event name as en]
   */

  destroy(ens = []) {
    if (ens instanceof Array) {
      this.ee.removeAllListeners(ens)
    }
  }
}

module.exports = new EventEmitter()