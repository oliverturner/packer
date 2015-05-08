var gulp = require('gulp');
var babel = require('gulp-babel');
var bump = require('gulp-bump');
var git = require('gulp-git');
var data = require('gulp-data');
var spawn = require('child_process').spawn;

var src = 'src/**/*.js';

function onError (err) {
  if (err) {
    throw err;
  }
}

gulp.task('compile', function () {
  return gulp.src(src)
    .pipe(babel({plugins: ['object-assign']}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('bump', ['compile'], function () {
  return gulp.src(['./package.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('publish', ['bump'], function (done) {
  var pkg, v, msg;

  pkg = require('./package.json');
  v   = 'v' + pkg.version;
  msg = 'Release ' + v;

  git.tag(v, msg, onError);

  git.push('origin', 'master', {args: '--tags'}, onError);

  done();
});

gulp.task('default', ['compile'], function () {
  return gulp.watch([src], ['compile']);
});
