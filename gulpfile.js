const gulp = require('gulp')
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const less = require('gulp-less');  
const pleeease = require('gulp-pleeease');
const concat = require('gulp-concat')
const browserSync = require('browser-sync');


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

// Copy HTML files from source to distribution folder
gulp.task('html', function() { 
  var files1 = ['./src/*.html'];
  gulp.src(files1)
      .pipe(gulp.dest('./public'))

  var files2 = ['./src/template/*.html'];
  gulp.src(files2)
      .pipe(gulp.dest('./public/template'))
});

/**
 *browser sync
 *if something is changed in src directory, reload browser automatically.
*/
gulp.task('browserSyncTask', function () {
    browserSync({
        server: {
            baseDir: 'src'
        }
    });
 
    gulp.watch('src/**', function() {
        browserSync.reload();
    });
});


gulp.task('default',['concatjs', 'js', 'css', 'html', 'browserSyncTask'])

gulp.task('watch', function() {
  gulp.watch(['./src/js/*.js', './src/css/*.css', './src/*.html', './src/template/*.html'], ['default']);
});
