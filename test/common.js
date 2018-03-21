'use strict'

const path = require('path')

function extend(base, props) {
  return Object.assign({}, base, props)
}

function resolveConfigPath(configFile) {
  return path.resolve(__dirname, 'fixtures', configFile)
}

module.exports.helpers = {
  extend,
  resolveConfigPath,
}

const GLOBAL_PATTERNS = ['global-pattern']
const ANDROID_PATTERNS = ['android-pattern']
const MERGED_PATTERNS = GLOBAL_PATTERNS.concat(ANDROID_PATTERNS)

const OPTIONS = {
  platforms: ['android', 'ios'],
  paths: ['android-path', 'ios-path'],
}

module.exports.fixtures = {
  GLOBAL_PATTERNS,
  ANDROID_PATTERNS,
  MERGED_PATTERNS,
  OPTIONS,
}
