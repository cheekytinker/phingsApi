'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

gulp.task('transpileSource', function() {
  gulp.src('src/**/*.js')
    .pipe(plumber(function(error){
      console.log("Error transpiling", error.message)
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('/'));
});

gulp.task('default', ['transpileSource'], () => {
  gulp.watch('src/**/*.js', ['transpileSource']);
});