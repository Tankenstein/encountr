var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var server = require('gulp-server-livereload');
 
gulp.task('build', function () {
  return browserify({
    entries: 'src/mount.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('build:production', function () {
  return browserify({
    entries: 'src/mount.jsx',
    extensions: ['.jsx'],
    debug: false
  })
  .transform(babelify)
  .transform({
    global: true,
    sourcemap: false
  }, 'uglifyify')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  return gulp.watch('./src/**/*', ['build']);
});

gulp.task('serve', function () {
  gulp.src('.')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true,
      clientConsole: true
    }));
});

gulp.task('default', ['watch']);