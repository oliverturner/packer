var gulp   = require('gulp');
var babel  = require('gulp-babel');
var rimraf = require('rimraf');

var src = 'src/**/*.js';

function compile () {
  return gulp.src(src)
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
}

gulp.task('compile', compile);

gulp.task('build', function(done){
  rimraf('./dist', function () {
    compile();
    done();
  });
});

gulp.task('default', ['build'], function () {
  return gulp.watch([src], ['compile']);
});
