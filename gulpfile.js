var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var minifyImage = require('gulp-imagemin');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();

gulp.task('feedback', function () {
  console.log('Change has occurred')
});

//gulp.task('watch', ['feedback'], function () {
//  gulp.watch('./public/*', ['test', 'feedback', 'nodemon']);
//});

gulp.task('test' ,function () {
  return gulp.src('test.js', {read:  false})
      .pipe(mocha({reporter: 'landing'}));
});

gulp.task('minifyJs', function () {
  return gulp.src('./public/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(gulp.dest('./public/dist'))
});

gulp.task('minifyCss', function () {
  return gulp.src('./public/*.css')
      .pipe(minifyCss())
      .pipe(gulp.dest('./public/dist'))
});

gulp.task('minifyHtml', function () {
  var opts = {
    conditionals: true
  };
  return gulp.src('./public/*.html')
      .pipe(minifyHtml(opts))
      .pipe(gulp.dest('./public/dist'))
});

gulp.task('minifyImage', function () {
  return gulp.src('./public/images/*')
      .pipe(minifyImage())
      .pipe(gulp.dest('./public/dist/images'))
});

gulp.task('serve', function() {
  browserSync.init({
    proxy: 'localhost:1337'
  });
  gulp.watch('./public/*', ['test', 'feedback', 'nodemon']);
});

gulp.task('nodemon', function () {
  nodemon({
    script: ['server.js'],
    ext: 'js'
  })
      .on('start', ['minifyJs', 'minifyCss', 'minifyHtml', 'serve', 'watch'], function () {
        console.log('Server has started')
      })
      .on('change', function () {
        console.log('Change has occurred -nodemon')
      })
      .on('crash', function () {
        console.log('Server has crashed!')
      })
      .on('restart', function () {
        console.log('Restarted!')
      })
});

// default start
gulp.task('default', ['nodemon']);