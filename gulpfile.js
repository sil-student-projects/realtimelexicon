var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('live-server', ['bundle', 'copy'], function() {
  var server = new LiveServer('server/server.js');
  server.start();
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
});
