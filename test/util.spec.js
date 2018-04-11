'use strict'

const test = require('blue-tape')
const {
  parseConfig,
  extractExcludePatterns,
  buildDeletionJobs,
} = require('../scripts/util')
const {
  extend,
  resolveConfigPath,
  optionsFor,
  jobFor,
} = require('./helpers').helpers
const {
  GLOBAL_PATTERNS,
  ANDROID_PATTERNS,
  MERGED_PATTERNS,
  OPTIONS,
} = require('./helpers').fixtures

const expectPatternsFrom = configFile => ({
  toBe(expectedPatterns) {
    test('read patterns from ' + configFile, t =>
      parseConfig(resolveConfigPath(configFile))
        .then(extractExcludePatterns)
        .then(patterns => t.deepEqual(patterns, expectedPatterns))
    )
  },
})

const EMPTY_PATTERNS = { global: [], byPlatform: {} }
const FULL_PATTERNS = {
  global: GLOBAL_PATTERNS,
  byPlatform: { android: ANDROID_PATTERNS, ios: [] },
}

expectPatternsFrom('none.xml').toBe(EMPTY_PATTERNS)
expectPatternsFrom('global.xml').toBe(extend(FULL_PATTERNS, { byPlatform: {} }))
expectPatternsFrom('platform.xml').toBe(extend(FULL_PATTERNS, { global: [] }))
expectPatternsFrom('mixed.xml').toBe(FULL_PATTERNS)

test('deletion job construction', t => {
  const jobs = buildDeletionJobs(FULL_PATTERNS, { opts: OPTIONS })
  t.deepEqual(jobs, [
    jobFor('android', MERGED_PATTERNS),
    jobFor('ios', GLOBAL_PATTERNS),
  ])
  t.end()
})

test('deletion job construction with no patterns', t => {
  const jobs = buildDeletionJobs(EMPTY_PATTERNS, { opts: optionsFor('test') })
  t.deepEqual(jobs, [jobFor('test', [])])
  t.end()
})
