const preKey = 'TAN_X_NAT';
/**
 * @param @redis require('promise-redis')()
 */

const Redis = {
  init(redis, { host, port, auth_pass }) {
    this.__client = redis.createClient({ host, port, auth_pass })
    this.__client.on("error", function (err) {
      console.error('ERROR_REDIS', err)
    });
  },
  async set(key, data, exp) {
    const name = preKey + key.toString();
    await this.__client.set(name, data.toString())
    return await this.__client.expire(preKey + key.toString(), exp || 86400)
  },
  async get(key) {
    return await this.__client.get(preKey + key.toString())
  },
  async del(key) {
    return await this.__client.del(preKey + key.toString())
  }
}

module.exports = Redis
