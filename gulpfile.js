const { src, dest, task, series, watch } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

 

sass.compiler = require('node-sass');
 
task('clean', () => {
 return src('dist/**/*', { read: false })
   .pipe(rm())
})
 
task('copy:html', () => {
 return src('src/*.html')
   .pipe(dest('dist'))
   .pipe(reload({ stream: true }));
})

task ('copy:images',  () => {
  return src('src/images/*.*').pipe(dest('dist/images'))
});


const styles = [
 'node_modules/normalize.css/normalize.css',
 'src/styles/main.scss'
];
 
task('styles', () => {
 return src(styles)
   .pipe(concat('main.scss'))
   .pipe(sassGlob())
   .pipe(sass().on('error', sass.logError))
   .pipe(cleanCSS())
   .pipe(sourcemaps.write())
   .pipe(dest('dist'));
});

task('scripts', () => {
    return src('src/scripts/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('main.js', {newLine: ';'}))
      .pipe(sourcemaps.write())
      .pipe(dest('dist'));
   });
    
 
task('server', () => {
 browserSync.init({
     server: {
         baseDir: "./dist"
     },
     open: false
 });
});
 
watch('./src/styles/**/*.scss', series('styles'));
watch('./src/*.html', series('copy:html'));
 
task('default', series('clean', 'copy:html','copy:images', 'styles', 'scripts', 'server'));