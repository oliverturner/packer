var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');

var src = 'src/*.js';

gulp.task('compile', function () {
  return gulp.src(src)
    .pipe(babel({plugins: ['object-assign']}))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['compile'], function () {
  return gulp.watch([src], ['compile']);
});
