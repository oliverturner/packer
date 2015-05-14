var gulp   = require('gulp');
var babel  = require('gulp-babel');
var rimraf = require('rimraf');

var src = 'src/**/*.js';

gulp.task('clean', function (done) {
  rimraf('./dist', done);
});

gulp.task('compile', function () {
  return gulp.src(src)
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['clean']);

gulp.task('default', ['build'], function () {
  return gulp.watch([src], ['compile']);
});
