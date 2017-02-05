const _ = require('lodash');

module.exports = function(context) {
  process.chdir(context.opts.projectRoot);
  const del = require('del'),
    Q = context.requireCordovaModule('q'),
    readFile = Q.denodeify(require('fs').readFile),
    parseXml = Q.denodeify(require('xml2js').parseString);

  const paths = context.opts.paths;
  function applyPatterns(patterns) {
    return Q.all(paths.map(path => del(patterns, {cwd: path}))).then(_.flatten);
  }

  return readFile('config.xml', 'utf8')
    .then(parseXml)
    .then(getExcludePatternsFromConfig)
    .then(applyPatterns)
    .then(logExcludedPaths);
};

function getExcludePatternsFromConfig(config) {
  return _.chain(config).get('widget.exclude-files').map('$.pattern').value();
}

function logExcludedPaths(paths) {
  console.log('Excluded following paths from build:\n', paths.join('\n '));
}
