'use strict'

const path = require('path')

function extend(base, props) {
  return Object.assign({}, base, props)
}

function resolveConfigPath(configFile) {
  return path.resolve(__dirname, '..', 'fixtures', configFile)
}

function optionsFor(...platforms) {
  return { platforms, paths: platforms.map(p => p + '-path') }
}

function jobFor(platform, patterns) {
  return { platform, path: platform + '-path', patterns }
}

module.exports.helpers = {
  extend,
  resolveConfigPath,
  optionsFor,
  jobFor,
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
