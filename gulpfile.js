//Let's get started

//Our required bits and bobs
  var gulp = require('gulp');
  var concat = require('gulp-concat');

  //Minifiers
  const sass = require('gulp-sass');
  const htmlmin = require('gulp-htmlmin');
  const imagemin = require('gulp-imagemin');
  const minify = require('gulp-minify');




///////// TASKS

  //Minify our HTML
  gulp.task('minify-html', function() {
    return gulp.src('src/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('dist'))
  });


  //I just want to copy all php files from the src folder to dist
  gulp.task('copy-php-files', function() {
      gulp.src('src/**/*.php')
      // Perform minification tasks, etc here
      .pipe(gulp.dest('dist'))
  });

  //Minify our JS
  gulp.task('minify-js', function() {
    gulp.src('src/scripts/**/*.js')
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/scripts'))
  });

  //Minify our images
  gulp.task('minify-images', () =>
  	gulp.src('src/images/*')
  		.pipe(imagemin())
  		.pipe(gulp.dest('dist/images'))
  );

  //Turn out less files into css
  gulp.task('minify-styling', function() {
    // Get our less files, and compile them
    return gulp.src('src/styles/**/*.scss')
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(sass())
    .pipe(gulp.dest('dist/styles'))
  });

///////// Watchers
gulp.task('watch', ['minify-styling' , 'copy-php-files'],  function(){
  gulp.watch('src/images/*.*', ['minify-images']);
  gulp.watch('src/styles/**/*.scss', ['minify-styling']);
  gulp.watch('src/scripts/**/*.js', ['minify-js']);
  gulp.watch('src/**/*.php', ['copy-php-files']);
});
