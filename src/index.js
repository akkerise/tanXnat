const core = require('./lib/core')
const redis = require('./lib/redis')
const common = require('./lib/common')
const fp = require('./lib/functional')
const handler = require('./lib/handler')
const validator = require('./lib/validator')
module.exports = {
  fp,
  core,
  redis,
  common,
  handler,
  validator
}
