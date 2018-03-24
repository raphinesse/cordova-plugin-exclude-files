'use strict'

const {
  parseConfig,
  extractExcludePatterns,
  buildDeletionJobs,
  processDeletionJob,
} = require('./util')

module.exports = function(context) {
  process.chdir(context.opts.projectRoot)
  return parseConfig('config.xml')
    .then(extractExcludePatterns)
    .then(patterns => buildDeletionJobs(patterns, context))
    .then(jobs => Promise.all(jobs.map(processDeletionJob)))
}
