const gulp = require('gulp')
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const less = require('gulp-less');  
const pleeease = require('gulp-pleeease');
const concat = require('gulp-concat')

//concat javascript
gulp.task('concatjs', function() {
  var files = ['./src/js/app.js', './src/js/config.js', './src/js/directive.js', './src/js/auth_controller.js', './src/js/event_controller.js'];
  gulp.src(files)
    .pipe(plumber())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./src/js'));
});

//compress javascript
gulp.task('js', ['concatjs'], function () {
  var files = ['./src/js/all.js'];
  gulp.src(files)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

//compress css
gulp.task('css', function() {  
  gulp.src('./src/css/*.css')
    .pipe(plumber())
    .pipe(less({
     }))
    .pipe(pleeease({
        minifier: true
     }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('default',['concatjs', 'js', 'css'])

/*//compress javascript
gulp.task('js', function () {
  var files = ['./src/js/*.js'];
  gulp.src(files)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

//compress css
gulp.task('css', function() {  
  gulp.src('./src/css/*.css')
    .pipe(plumber())
    .pipe(less({
     }))
    .pipe(pleeease({
        minifier: true
     }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('default',['js', 'css'])
*/

/*
gulp.task('watch', function() {
  gulp.watch(['./src/js/*.js', './src/css/*.css'], ['default']);
});
*/


