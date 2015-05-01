var gulp = require('gulp');
var babel = require('gulp-babel');
var bump = require('gulp-bump');
var git = require('gulp-git');
var spawn = require('child_process').spawn;

var src = 'src/*.js';

function onError (err) {
  if (err) {
    throw err;
  }
}

gulp.task('compile', function () {
  return gulp.src(src)
    .pipe(babel({plugins: ['object-assign']}))
    .pipe(gulp.dest('./'));
});

gulp.task('bump', ['compile'], function () {
  return gulp.src(['./package.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('tag', ['bump'], function () {
  var pkg, v, msg;

  pkg = require('./package.json');
  v   = 'v' + pkg.version;
  msg = 'Release ' + v;

  return gulp.src('./')
    .pipe(git.commit(msg))
    //.pipe(git.tag(v, msg))
    //.pipe(git.push('origin', 'master', {args: '--tags'}, onError))
    .pipe(gulp.dest('./'));
});

gulp.task('publish', ['tag'], function (done) {
  spawn('npm', ['publish'], { stdio: 'inherit' }).on('close', done);
});

gulp.task('default', ['compile'], function () {
  return gulp.watch([src], ['compile']);
});
