var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    less = require('gulp-less');

var paths = {
  scripts: 'js/main.js',
  less: 'less/styles.less'
};

gulp.task('javascript', function () {
   gulp.src([
     'js/jquery-2.1.1.min.js',
     'js/owl.carousel.js',
     'js/jquery.mousewheel.js',
     'js/main.js'
     ])
      .pipe(uglify())
      .pipe(concat('main.min.js'))
      .pipe(gulp.dest('js'))
});

gulp.task('less', function() {
  gulp.src('less/main.less')
    .pipe(less())
    .pipe(cssmin())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['javascript']);
  gulp.watch(paths.less, ['less']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);
