'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta');
var runSequence = require('run-sequence');

var testFiles = 'test/**/*.js';
var srcFiles = 'src/**/*.js';

gulp.task('copyswaggertosrc', ()=> {
  gulp.src('api/swagger/*')
  .pipe(gulp.dest('src/api/swagger/'));
});

gulp.task('transpileSource', ['copyswaggertosrc'], () => {
  gulp.src(srcFiles)
    .pipe(plumber(function (error){
      console.log('Error transpiling', error.message)
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./'));
});

gulp.task('runtests', () => {
  return gulp.src([testFiles])
    .pipe(mocha());
});

gulp.task('default', ['transpileSource'], () => {
  gulp.watch(srcFiles, ['transpileSource']);
});

gulp.task('transpileandtest', (callback) => {
  runSequence('transpileSource', 'runtests', callback);
});

gulp.task('test', ['transpileandtest'], () => {
  gulp.watch(srcFiles, ['transpileandtest']);
});
