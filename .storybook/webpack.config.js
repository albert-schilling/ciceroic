const babelrc = require('../.babelrc.js')

module.exports = async ({ config, mode }) => {
  config.module.rules[0].use[0].options = {
    babelrc: false,
    cacheDirectory: true,
    ...babelrc,
  }

  return config
}
