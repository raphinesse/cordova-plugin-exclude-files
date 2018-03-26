'use strict'

const test = require('blue-tape')
const { extend, resolveConfigPath } = require('./common').helpers
const {
  GLOBAL_PATTERNS,
  ANDROID_PATTERNS,
  MERGED_PATTERNS,
  OPTIONS,
} = require('./common').fixtures
const {
  parseConfig,
  extractExcludePatterns,
  buildDeletionJobs,
} = require('../scripts/util')

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
    { platform: 'android', path: 'android-path', patterns: MERGED_PATTERNS },
    { platform: 'ios', path: 'ios-path', patterns: GLOBAL_PATTERNS },
  ])
  t.end()
})

const MIN_OPTIONS = { platforms: ['test'], paths: ['test-path'] }
const EMPTY_TEST_JOB = { platform: 'test', path: 'test-path', patterns: [] }
test('deletion job construction with no patterns', t => {
  const jobs = buildDeletionJobs(EMPTY_PATTERNS, { opts: MIN_OPTIONS })
  t.deepEqual(jobs, [EMPTY_TEST_JOB])
  t.end()
})
