var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var sequence = require('gulp-sequence');

gulp.task('sass', function() {
  return gulp.src('src/css/scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css/'))
});

gulp.task('watch', function(){
  gulp.watch('src/css/scss/**/*.scss', ['sass']);
})

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('/*.css', cleanCSS()))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', () => {
  return gulp.src('dist/css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('build', function(callback) {
  sequence('sass', 'html', 'minify-css')(callback)
});
