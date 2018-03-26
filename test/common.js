'use strict'

const path = require('path')

function extend(base, props) {
  return Object.assign({}, base, props)
}

function resolveConfigPath(configFile) {
  return path.resolve(__dirname, 'fixtures', configFile)
}

function optionsFor(...platforms) {
  return { platforms, paths: platforms.map(p => p + '-path') }
}

module.exports.helpers = {
  extend,
  resolveConfigPath,
  optionsFor,
}

const GLOBAL_PATTERNS = ['global-pattern']
const ANDROID_PATTERNS = ['android-pattern']
const MERGED_PATTERNS = GLOBAL_PATTERNS.concat(ANDROID_PATTERNS)
const OPTIONS = optionsFor('android', 'ios')

module.exports.fixtures = {
  GLOBAL_PATTERNS,
  ANDROID_PATTERNS,
  MERGED_PATTERNS,
  OPTIONS,
}
