'use strict';
 
var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var notify = require("gulp-notify");

var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
 
function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(watch) {
  
  var props = {
    entries: ['./public/js/index.js'],
    debug : false,
    transform:  [babelify]
  };

  // watchify() if watch requested, otherwise run browserify() once 
  var bundler = watch ? watchify(browserify(props)) : browserify(props);
  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/js/'));
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

// run once
gulp.task('scripts', function() {
  return buildScript(false);
});

// run once then watch for changes
gulp.task('scripts:watch', function() {
  return buildScript(true);
});

gulp.task('default', ['scripts', 'css']);
gulp.task('watch', ['scripts:watch', 'css:watch']);
 
gulp.task('css', function () {
    var processors = [
        autoprefixer
    ];
    return gulp.src('./public/scss/*.scss')
      .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('scss/maps'))
        .pipe(gulp.dest('./public/'));
});

gulp.task('css:watch', function () {
    watch('./public/scss/**/*.scss', function(){
        gulp.start('css');
    });
});