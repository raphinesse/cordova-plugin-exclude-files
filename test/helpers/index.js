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

const GLOBAL_PATTERNS = Object.freeze(['global-pattern'])
const ANDROID_PATTERNS = Object.freeze(['android-pattern'])
const MERGED_PATTERNS = Object.freeze(GLOBAL_PATTERNS.concat(ANDROID_PATTERNS))
const OPTIONS = Object.freeze(optionsFor('android', 'ios'))

module.exports.fixtures = {
  GLOBAL_PATTERNS,
  ANDROID_PATTERNS,
  MERGED_PATTERNS,
  OPTIONS,
}
