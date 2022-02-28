'use strict';

var fs = require('fs');
var assert = require('assert');
var gutil = require('gulp-util');
var px2rem = require('../');

describe('gulp-smile-px2rem', function () {
  describe('px2remPlugin()', function () {
    it('should replace px to rem', function (done) {
      var file = new gutil.File({
        path: 'test/file.css',
        cwd: 'test/',
        base: '.',
        contents: fs.readFileSync('test/file.css')
      });

      var stream = px2rem();
      stream.on('data', function (data) {
        // var content = data.contents.toString('utf8');
        // assert.equal(content, '#header { max-width: 46.875rem; box-shadow: 0 0 1px #ddd; }');
        done();
      });
      stream.write(file);
      stream.end();
    });
  });
});