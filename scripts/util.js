'use strict'

const Q = require('q')
const del = require('del')
const readFile = Q.denodeify(require('fs').readFile)
const parseXml = Q.denodeify(require('xml2js').parseString)
const { pipe, get, keyBy } = require('lodash/fp')
const { map, mapValues, zipAll, zipObj } = require('lodash/fp')

module.exports = {
  parseConfig,
  extractExcludePatterns,
  buildDeletionJobs,
  processDeletionJob,
}

function parseConfig(path) {
  return readFile(path, 'utf8')
    .then(parseXml)
    .then(get('widget'))
}

function extractExcludePatterns(config) {
  const getPatterns = pipe(get('exclude-files'), map('$.pattern'))
  const getPlatformConfigs = pipe(get('platform'), keyBy('$.name'))
  return {
    global: getPatterns(config),
    byPlatform: mapValues(getPatterns, getPlatformConfigs(config)),
  }
}

function buildDeletionJobs(patterns, context) {
  const platformPaths = context.opts.paths
  const platformNames = context.opts.platforms
  const normalizedPatterns = platformNames
    .map(name => patterns.byPlatform[name])
    .map(excludes => patterns.global.concat(excludes))

  return zipAll([platformNames, platformPaths, normalizedPatterns]).map(
    zipObj(['platform', 'path', 'patterns'])
  )
}

function processDeletionJob(job) {
  return del(job.patterns, { cwd: job.path }).then(
    excludedPathsLoggerFor(job.platform)
  )
}

function excludedPathsLoggerFor(platform) {
  const header = `Excluded following paths from ${platform} build:\n  `
  return function logExcludedPaths(paths) {
    if (!paths.length) return
    console.log(header + paths.join('\n  '))
  }
}
