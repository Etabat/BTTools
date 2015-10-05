var gulp = require('gulp');
var wiredep = require('wiredep').stream;

gulp.task('inject', function () {
  gulp.src('./public/index.html')
      .pipe(wiredep({
        optional: 'configuration',
        goes: 'here'
      }))
    // Test distribution folder. Do not use for production
      .pipe(gulp.dest('./public/dist2'));
});