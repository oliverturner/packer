var gulp   = require('gulp');
var babel  = require('gulp-babel');
var rimraf = require('rimraf');

var src = 'src/**/*.js';

function compile () {
  return gulp.src(src)
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
}

gulp.task('clean', function (done) {
  rimraf('./docs', function (err) {
    if (err) throw err;
  });

  rimraf('./dist', function (err) {
    if (err) throw err;

    done();
  });
});

gulp.task('compile', compile);

gulp.task('build', ['clean'], function (done) {
  compile();
  done();
});

gulp.task('default', ['build'], function () {
  return gulp.watch([src], ['compile']);
});
