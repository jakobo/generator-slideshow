var gulp = require('gulp');

var express = require('express');

var tap = require('gulp-tap');
var toBuffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var log = require('gulp-util').log;

var browserify = require('browserify');
var exec = require('child_process').exec;
var which = require('which');

var EXPRESS_ROOT = __dirname;
var EXPRESS_PORT = 8000;
var expressApp = null;

gulp.task('build', ['js', 'compass']);

gulp.task('serve', ['build'], function() {
  expressApp = express();
  expressApp.use(express.static(EXPRESS_ROOT));
  expressApp.listen(EXPRESS_PORT);

  // watch js and compile, watch compass and compile
  gulp.watch('_scripts/**/*', ['js']);
  gulp.watch('_scss/**/*', ['compass']);
  gulp.watch('_config/**/*', ['build']);
});

gulp.task('js', function() {
  return gulp.src('_scripts/main.js')
    .pipe(tap(function(file, through) {
      var bundler = browserify({
        entries: [file.path]
      });
      file.contents = bundler.bundle();
    }))
    .pipe(toBuffer())
    // .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('js/'));
});

gulp.task('compass', function(cb) {
  var compass = which.sync('compass');
  if (!compass) {
    log('compass was not found in your path. Please consider running "gem install compass"');
    throw new Error('compass not found');
  }
  exec('compass compile --config _config/compass.rb', function(err, stdout, stderr) {
    if (err) {
      log(err);
    }
    stdout.split('\n').forEach(function(line) {
      log(line);
    });
    cb();
  });
});
