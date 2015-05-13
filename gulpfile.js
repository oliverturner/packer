var gulp = require('gulp');
var babel = require('gulp-babel');

var src = 'src/**/*.js';

gulp.task('build', function () {
  return gulp.src(src)
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build'], function () {
  return gulp.watch([src], ['build']);
});
