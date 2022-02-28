var gulp = require('gulp');
/** REMOVE ME **/
var px2rem = require('../../');
/** USE ME **/ // var px2rem = require('gulp-smile-px2rem');

gulp.task('px2rem', function () {
  return gulp.src('file.css', {
      base: './'
    })
    .pipe(px2rem({
      dpr:2
    }))
    .pipe(gulp.dest('./result'));
});

gulp.task('default', ['px2rem']);