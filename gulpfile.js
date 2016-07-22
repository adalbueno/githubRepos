'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var ngAnnotate = require('gulp-ng-annotate');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var stylish = require('gulp-jscs-stylish');
var connect = require('gulp-connect');
var mainBowerFiles = require('gulp-main-bower-files');
var sourcemaps = require('gulp-sourcemaps');
var gulpFilter = require('gulp-filter');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var gulpif = require('gulp-if');
var karmaServer = require('karma').Server;
require('gulp-watch');

var uglifyAll = false;
var generateSourceMaps = true;
var sassStyle = {};

var bases = {
  src: 'src/',
  dest: 'dist/'
};

var paths = {
  root: ['*.html'],
  views: ['app/**/*.html', '!app/**/partials/**/*.html', '!app/**/templates/**/*.html'],
  partials: ['app/**/partials/**/*.html'],
  templates: ['app/**/templates/**/*.html'],
  data: ['app/**/*.json'],
  appJS: ['app/**/*.js'],
  appCSS: ['assets/css/**/*.scss'],
  componentsJS: [ 'assets/components/**/*.min.js'],
  componentsCSS: ['assets/components/**/*.min.css'],
  vendorJS: ['vendor/**/*.js'],
  vendorCSS: ['vendor/**/*.css'],
  tests: ['tests/**/*.js']
};

var errorAlert = function(error) {
  notify.onError({title: 'Error in <%= error.plugin %> plugin', message: '<%= error.message %>'})(error);
  console.log('There were errors in plugin and your changes will not be build. Please check!');
};

gulp.task('clean', function(callback) {
  return gulp.src(bases.dest, {read: false}, callback)
    .pipe(clean({force: true}));
});

gulp.task('rootHTML', function() {
  return gulp.src(paths.root, {cwd: bases.src})
    .pipe(gulp.dest(bases.dest))
    .pipe(connect.reload());
});

gulp.task('views', function() {
  return gulp.src(paths.views, {cwd: bases.src})
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(bases.dest + 'views'))
    .pipe(connect.reload());
});

gulp.task('partials', function() {
  return gulp.src(paths.partials, {cwd: bases.src})
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(bases.dest + 'views/partials'))
    .pipe(connect.reload());
});

gulp.task('templates', function() {
  return gulp.src(paths.templates, {cwd: bases.src})
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(bases.dest + 'views/templates'))
    .pipe(connect.reload());
});

gulp.task('data', function() {
  return gulp.src(paths.data, {cwd: bases.src})
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(bases.dest + 'data'))
    .pipe(connect.reload());
});

gulp.task('componentsJS', function() {
  return gulp.src('./bower.json')
    .pipe(mainBowerFiles(['**/*.js']))
    .pipe(gulpif(generateSourceMaps, sourcemaps.init()))
    .pipe(concat('components-min-un.js'))
    .pipe(gulpif(uglifyAll, uglify()))
    .pipe(gulpif(generateSourceMaps, sourcemaps.write('.')))
    .pipe(gulp.dest(bases.dest + 'js/'))
    .pipe(connect.reload());
});

gulp.task('vendorJS', function() {
  return gulp.src(paths.vendorJS, {cwd: bases.src})
    .pipe(gulpif(generateSourceMaps, sourcemaps.init()))
    .pipe(concat('vendor-min-un.js'))
    .pipe(gulpif(uglifyAll, uglify()))
    .pipe(gulpif(generateSourceMaps, sourcemaps.write('.')))
    .pipe(gulp.dest(bases.dest + 'js/'))
    .pipe(connect.reload());
});

gulp.task('appJS', function() {
  return gulp.src(paths.appJS, {cwd: bases.src})
    .pipe(plumber({errorHandler: errorAlert}))
    // Lint
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .pipe(jscs())
    .pipe(stylish())
    .pipe(jscs.reporter('fail'))
    // Compile
    .pipe(gulpif(generateSourceMaps, sourcemaps.init()))
    .pipe(concat('app-min-un.js'))
    .pipe(ngAnnotate({'single_quotes': true}))
    .pipe(gulpif(uglifyAll, uglify()))
    .pipe(gulpif(generateSourceMaps, sourcemaps.write('.')))
    .pipe(gulp.dest(bases.dest + 'js/'))
    .pipe(connect.reload());
});

gulp.task('componentsCSS', function() {
  return gulp.src('./bower.json')
    .pipe(mainBowerFiles(['**/*.css']))
    .pipe(gulpif(generateSourceMaps, sourcemaps.init()))
    .pipe(sass(sassStyle).on('error', sass.logError))
    .pipe(concat('components-min-un.css'))
    .pipe(gulpif(generateSourceMaps, sourcemaps.write('.')))
    .pipe(gulp.dest(bases.dest + 'css/'))
    .pipe(connect.reload());
});

gulp.task('vendorCSS', function() {
  return gulp.src(paths.vendorCSS, {cwd: bases.src})
    .pipe(sass(sassStyle).on('error', sass.logError))
    .pipe(concat('vendor-min-un.css'))
    .pipe(gulp.dest(bases.dest + 'css/'))
    .pipe(connect.reload());
});

gulp.task('appCSS', function() {
  return gulp.src(paths.appCSS, {cwd: bases.src})
    .pipe(sass(sassStyle).on('error', sass.logError))
    .pipe(concat('app-min-un.css'))
    .pipe(gulp.dest(bases.dest + 'css/'))
    .pipe(connect.reload());
});

var _karmaConf = {
  configFile: __dirname + '/karma.conf.js',
  reporters: 'notify,dots'
};

gulp.task('unitTest', (done) => {
  new karmaServer(_karmaConf, function() {
    done();
  }).start();
});

gulp.task('watch', function() {
  gulp.watch(paths.root, {cwd: bases.src, interval: 1000, debounceDelay: 1000, mode: 'poll'}, ['rootHTML']);
  gulp.watch(paths.data, {cwd: bases.src, interval: 1000, debounceDelay: 1000, mode: 'poll'}, ['data']);
  gulp.watch(paths.views, {cwd: bases.src, interval: 1000, debounceDelay: 1000, mode: 'poll'}, ['views']);
  gulp.watch(paths.partials, {cwd: bases.src, interval: 1000, debounceDelay: 1000, mode: 'poll'}, ['partials']);
  gulp.watch(paths.templates, {cwd: bases.src, interval: 1000, debounceDelay: 1000, mode: 'poll'}, ['templates']);
  gulp.watch(paths.componentsJS, {cwd: bases.src, interval: 1000, debounceDelay: 1000, mode: 'poll'}, ['componentsJS']);
  gulp.watch(paths.componentsCSS, {cwd: bases.src, interval: 1000, debounceDelay: 1000, mode: 'poll'}, ['componentsCSS']);
  gulp.watch(paths.vendorJS, {cwd: bases.src, interval: 1000, debounceDelay: 1000, mode: 'poll'}, ['vendorJS']);
  gulp.watch(paths.vendorCSS, {cwd: bases.src, interval: 1000, debounceDelay: 1000, mode: 'poll'}, ['vendorCSS']);
  gulp.watch(paths.appJS, {cwd: bases.src, interval: 1000, debounceDelay: 1000, mode: 'poll'}, ['appJS', 'unitTest']);
  gulp.watch(paths.appCSS, {cwd: bases.src, interval: 1000, debounceDelay: 1000, mode: 'poll'}, ['appCSS']);
  gulp.watch(paths.tests, {cwd: bases.src, interval: 1000, debounceDelay: 1000, mode: 'poll'}, ['unitTest']);
});

gulp.task('uglifyAll', function() {
  uglifyAll = true;
  generateSourceMaps = false;
  sassStyle = { outputStyle: 'compressed' };
})

gulp.task('default', function(callback) {
  runSequence('clean',
    [
      'rootHTML',
      'views',
      'templates',
      'partials',
      'data',
      'componentsJS',
      'vendorJS',
      'appJS',
      'componentsCSS',
      'vendorCSS',
      'appCSS',
      'unitTest'
    ], callback);
});

gulp.task('connect', function() {
  connect.server({
    root: bases.dest,
    port: 8000,
    livereload: true
  });
});

gulp.task('server', function(callback) {
  runSequence(['default'], 'connect', 'watch', callback);
});

gulp.task('deploy', function(callback) {
  runSequence(['uglifyAll', 'default'], callback);
});
