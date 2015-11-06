var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('js', function () {
  return gulp.src('public/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/dist/js/'));
});

gulp.task('watch-js', function() {
  gulp.watch('./public/js/**/*.js', ['js']);
});

gulp.task('css', function () {
  gulp.src('./public/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
    }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('watch-css', function() {
  gulp.watch('./public/css/**/*.scss', ['css']);
});

gulp.task('build', ['js', 'css']);
gulp.task('watch', ['watch-js', 'watch-css']);

gulp.task('default', ['build']);
