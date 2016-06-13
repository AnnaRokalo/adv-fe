var destDir = 'bin';
var gulp = require('gulp');
var bower = require('gulp-bower');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var less = require('gulp-less');
var argv = require('yargs').argv;
var debug = require( 'gulp-debug' );
var clean = require( 'gulp-clean' );
var livereload = require('gulp-livereload');
var csscomb = require('gulp-csscomb');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var minifyCss = require('gulp-minify-css');

var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var htmlhint = require("gulp-htmlhint");
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var autoprefixerOptions = {
    "browsers": ["last 2 versions", "> 5%", "Firefox ESR"]
};


gulp.task('default', ['css', 'copy-static', 'js']);


gulp.task('copy-static', function () {
    return gulp.src(['images/**/*.{png,jpg,svg}', '*.html', '**.*.js'])
        .pipe( gulp.dest(destDir) );
});

gulp.task('bower', function () {
    return bower('libs');
});

gulp.task('css', function () {
    return gulp.src('styles/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(concat('styles.css'))
        .pipe(less())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulpif(argv.prod, minifyCss()))
        .pipe(gulpif(!argv.prod, sourcemaps.write('maps')))
        .pipe(gulp.dest(destDir));
});


gulp.task( 'clean', function (cb) {
    return gulp.src( destDir + '/*', { read: false } )
        .pipe( clean( { force: true } ) );
} );


//CODESTYLE
gulp.task('csscomb', function () {
    return gulp.src('styles/*.less')
        .pipe(csscomb().on('error', handleError))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

gulp.task('htmlhint', function () {
    return gulp.src('*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.reporter());
});

gulp.task('js', function () {
    return gulp.src('js/**/*.js')
        .pipe(sourcemaps.init())
            .pipe(concat('main.js'))
            .pipe(uglify())
        .pipe(gulpif(!argv.prod, sourcemaps.write('maps')))
        .pipe(gulp.dest(destDir));
});


gulp.task('jscs', function () {
    return gulp.src('js/**/*.js')
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('jshint', function () {
    return gulp.src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('html_min', function() {
    return gulp.src('*.html')
        .pipe(gulpif(argv.prod, htmlmin()))
        .pipe(gulp.dest(destDir));
});

gulp.task('style', ['csscomb', 'jshint', 'jscs','htmlhint']);
//CODESTYLE//

gulp.task('browserSync', function () {
    return browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Watchers.
gulp.task('watch', ['browserSync'], function () {
    gulp.watch('./*.html');
    gulp.watch('./*.html', browserSync.reload);
    gulp.watch('./js/**/*.js', browserSync.reload);
    gulp.watch('../styles/**/*.less', ['less']);
});

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
    return this;
}

