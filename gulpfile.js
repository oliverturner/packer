var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function () {
  return gulp.src('src/index.js')
    .pipe(babel({plugins: ['object-assign']}))
    .pipe(gulp.dest('./'));
});
