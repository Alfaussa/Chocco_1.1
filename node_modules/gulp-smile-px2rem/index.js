'use strict';

var _ = require('lodash');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-smile-px2rem';

function prefixStream(prefixText) {
  var stream = through();
  stream.write(prefixText);
  return stream;
}

// dealing with files
function px2rem(options) {
  options = _.merge({
    dpr: 2,
    rem: 16,
    one: false // whether convert 1px

  }, options);

  // check config
  if (!options.dpr || !options.rem) {
    throw new PluginError(PLUGIN_NAME, 'Missing options dpr or rem');
  }

  // Creating a stream through which each file will pass
  return through.obj(function (file, enc, cb) {
    if (file.isStream()) {
      throw new PluginError(PLUGIN_NAME, 'Plugin do not support stream file');
    }
    if (file.isNull()) {
      cb(null, file);
    }
    if (file.isBuffer()) {
      gutil.log(gutil.colors.green('\tcompile:'), file.relative);
      var content = file.contents.toString(enc).replace(/\b\d+(\.\d+)?px\b(?!(\s*\)|\s*"\]))/ig, function (match) {
        if (options.one === false && '1px' === match.toLowerCase()) {
          return match;
        }
        return parseInt(match) / parseFloat(options.rem * options.dpr, 10) + 'rem';
      });
      file.contents = new Buffer(content);
      cb(null, file);
    }
  });

};

// Exporting the plugin main function
module.exports = px2rem;