'use strict'

const curryRight = require('lodash/curryRight')
const pMap = curryRight(require('p-map'), 2)
const findConfig = require('cordova-find-config')
const {
  parseConfig,
  extractExcludePatterns,
  buildDeletionJobs,
  processDeletionJob,
} = require('./util')

const deletionJobBuilderFor = curryRight(buildDeletionJobs)

module.exports = function(context) {
  return findConfig(context.opts.projectRoot)
    .then(parseConfig)
    .then(extractExcludePatterns)
    .then(deletionJobBuilderFor(context))
    .then(pMap(processDeletionJob))
}
