var app = require('./server/server.js');
var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('server', ['bundle', 'copy'], function() {
  app.listen(7777);
});

gulp.task('bundle', function() {
  return browserify({
    entries: 'app/main.jsx',
    debug: true
  })
  .transform(reactify)
  .bundle()
  .pipe(source('browserified.js'))
  .pipe(gulp.dest('./.tmp'));
});

gulp.task('copy', function() {
  gulp.src(['app/*.css'])
  .pipe(gulp.dest('./.tmp'));

  gulp.src(['app/*.png'])
  .pipe(gulp.dest('./.tmp'));
});
