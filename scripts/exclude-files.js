'use strict'

const curryRight = require('lodash/curryRight')
const pMap = curryRight(require('p-map'), 2)
const {
  parseConfig,
  extractExcludePatterns,
  buildDeletionJobs,
  processDeletionJob,
} = require('./util')
const deletionJobBuilderFor = curryRight(buildDeletionJobs)

module.exports = function excludeFiles(context) {
  process.chdir(context.opts.projectRoot)
  return parseConfig('config.xml')
    .then(extractExcludePatterns)
    .then(deletionJobBuilderFor(context))
    .then(pMap(processDeletionJob))
}
