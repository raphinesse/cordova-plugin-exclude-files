'use strict'

const path = require('path')
const test = require('ava')
const fse = require('fs-extra')
const tmp = require('tmp-promise')
const dircmp = require('dir-compare').compare

const excludeFiles = require('../scripts/exclude-files')
const { extend, resolveConfigPath } = require('./helpers').helpers
const { MERGED_PATTERNS, OPTIONS } = require('./helpers').fixtures

const withTmpDir = f => tmp.withDir(f, { unsafeCleanup: true })

const SRC_DIR = 'src'
const SRC_FILES = MERGED_PATTERNS.concat('unmatched')

testWithFiles('main cordova hook', (t, testFs) => {
  // Paths have to be absolute, as provided by cordova
  const opts = extend(OPTIONS, { projectRoot: testFs() })
  opts.paths = opts.paths.map(p => path.resolve(testFs(), p))

  const srcPath = testFs(SRC_DIR)
  return excludeFiles({ opts }).then(_ =>
    Promise.all([
      dircmp(srcPath, testFs('android-path'))
        .then(getFilesByState('equal'))
        .then(preservedFiles => t.deepEqual(preservedFiles, ['unmatched'])),
      dircmp(srcPath, testFs('ios-path'))
        .then(getFilesByState('left'))
        .then(removedFiles => t.deepEqual(removedFiles, ['global-pattern'])),
    ])
  )
})

function testWithFiles(name, f) {
  test(name, t =>
    withTmpDir(async d => {
      const testFs = (...args) => path.join(d.path, ...args)
      await setupTestFs(testFs)
      await f(t, testFs)
    })
  )
}

function setupTestFs(testFs) {
  const srcPath = testFs(SRC_DIR)
  const copySrcDir = p => fse.copy(srcPath, testFs(p))
  const createSrcFile = f => fse.createFile(path.join(srcPath, f))
  return Promise.all([
    fse.copy(resolveConfigPath('mixed.xml'), testFs('config.xml')),
    Promise.all(SRC_FILES.map(createSrcFile)).then(_ =>
      Promise.all(OPTIONS.paths.map(copySrcDir))
    ),
  ])
}

function getFilesByState(state) {
  return res => res.diffSet.filter(x => x.state === state).map(x => x.name1)
}
