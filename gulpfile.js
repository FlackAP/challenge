'use strict';

var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  exec = require('child_process').exec,
  shell = require('gulp-shell'),
  // gulp-load-plugins will find modules in
  // package.json that start with 'gulp-' and
  // automatically load them into the $ object.
  // Note that modules with dashes in the name
  // become camelCase in $ object.
  $ = require('gulp-load-plugins')();
      
// Pre-process jade templates and store them in dist
gulp.task('templates', function() {
  return gulp.src('src/templates/pages/**/*.jade')
  .pipe($.jade({
    basedir: "src/templates",
    pretty: true
  }))
  .pipe(gulp.dest('dist'));
});


// Crunch *local* styles in src/stylesheets/main.scss and put them dist/stylesheets
gulp.task('styles', function () {
  return gulp.src('src/stylesheets/main.scss')
    .pipe($.sass({
      // gulp-sass was blowing up without the next two line
      sourceComments: 'map', 
      sourceMap: 'sass', 
      style: 'expanded',
      // // include bourbon (for local styles only)
      // includePaths: require('node-bourbon').includePaths 
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('dist/stylesheets'))
    .pipe($.size());
});

// Just run everything through JS Hint.
gulp.task('scripts', function () {
  return gulp.src('src/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter($.jshintStylish))
    .pipe($.size());
});

// Take images from src, place them in dist as optimized images
gulp.task('images',  function () {
  return gulp.src(['src/images/**/*'])
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

                                           
// Local Dev- serve, watch, etc. To run locally, enter the command "gulp express"
gulp.task('connect', function () {
  var connect = require('connect');
  var app = connect()
    .use(require('connect-livereload')({ port: 35729 }))
    .use(connect.static('src'))
    .use(connect.static('dist'))
    .use(connect.directory('src'));

  require('http').createServer(app)
    .listen(1337)
    .on('listening', function () {
      console.log('Started connect web server on http://0.0.0.0:1337');
    });
});

gulp.task('serve', ['connect', 'styles', 'templates'], function () {
  require('opn')('http://0.0.0.0:1337');
});

gulp.task('watch', ['connect', 'serve'], function () {
  var server = $.livereload();
  // watch for changes
  gulp.watch([
    'src/templates/**/*.jade',
    'src/*.html',
    'dist/stylesheets/**/*.*',
    'src/scripts/**/*.js',
    'src/images/**/*'
  ]).on('change', function (file) {
    server.changed(file.path);
  });

  gulp.watch('src/templates/**/*.jade', ['templates']);
  gulp.watch('src/stylesheets/**/*.scss', ['styles']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});

// Combines watch and serve tasks into one, easy to use super cool genius task
gulp.task('express', ['watch', 'serve'], function(){})


