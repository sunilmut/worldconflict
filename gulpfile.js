/**
 * TODO: This file is identical to the one in app-console. Look into not duplicating it.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var gu = require('gulp-util');
var webpack = require('gulp-webpack');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');
var del = require('del');

var buildDir = "build";
var bsAssets = buildDir + "/bootstrap";
var bsScssSrcDir = bsAssets + "/stylesheets";

var webRoot = buildDir + "/webroot";
var jsDir = webRoot + "/js";
var vendorJsDir = jsDir + "/vendor";
var fontsDir = webRoot + "/fonts";

var scssSrcDir = "src/main/scss";
var jsSrcDir = "src/main/js";
var assetsSrcDir = "src/main/assets";

var p = require('./package.json');

/*
 * Removes the build directory.
 */
gulp.task('clean', function() {
    del([buildDir], function (err, deletedFiles) {
        if (deletedFiles && deletedFiles.length > 0) {
            gu.log('Removed: ', gu.colors.magenta(deletedFiles.join(', ')));
        }
    });
});

/*
 * Copy all of the Bootstrap assets (SCSS, fonts, scripts, etc) to the build directory.
 */
gulp.task('copy_bootstrap_assets', function() {
    return gulp.src('node_modules/bootstrap-sass/assets/**/*')
        .pipe(gulp.dest(bsAssets));
});

/**
 * Copy local SCSS files into the BS build directory to get compiled.
 */
gulp.task('copy_local_scss', ['copy_bootstrap_assets'], function() {
    return merge ([
        gulp.src(scssSrcDir + '/theme/**/*.scss').pipe(gulp.dest(bsScssSrcDir + '/theme')),
        gulp.src(scssSrcDir + '/theme.scss').pipe(gulp.dest(bsScssSrcDir))
    ]);
});

/*
 * Compile the SCSS.
 */
gulp.task('sass', ['copy_local_scss'], function () {
    var targetDir = webRoot + '/css';
    return gulp.src(bsScssSrcDir + '/theme.scss')
        .pipe(sass())
        .pipe(gu.env.type === 'production' ? uglifycss() : gu.noop())
        .pipe(gulp.dest(targetDir));
});

/*
 * Copy bootstrap fonts to webroot.
 */
gulp.task('copy_bootstrap_fonts', ['sass'], function() {
    return gulp.src(bsAssets + '/fonts/**/*')
        .pipe(gulp.dest(fontsDir));
});

/*
 * Copies everything in assets to webroot in the build directory.
 */
gulp.task('assets', function() {
    return gulp.src(assetsSrcDir + '/**/*')
        .pipe(gulp.dest(webRoot));
});

/*
 * Copies scripts to the build directory.
 */
gulp.task('scripts', function() {
   return gulp.src([jsSrcDir + '/*.jsx', jsSrcDir + '/**/*.js'])
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(rename('main.js'))
    .pipe(gu.env.type === 'production' ? uglify() : gu.noop())
    .pipe(gulp.dest(jsDir));
});

/*
 * Copies JS scripts to the build directory.
 *
 * To minify the scripts call gulp like ... gulp --type 'production'
 */
gulp.task('vendor_scripts', ['copy_bootstrap_fonts'], function() {
    return merge([
        gulp.src(
            ['node_modules/jquery/dist/jquery.js'])
            .pipe(gu.env.type === 'production' ? uglify() : gu.noop())
            .pipe(concat('jquery.js'))
            .pipe(gulp.dest(vendorJsDir)),
        gulp.src(
            ['node_modules/typeahead.js/dist/typeahead.bundle.js'])
            .pipe(gu.env.type === 'production' ? uglify() : gu.noop())
            .pipe(concat('typeahead.bundle.js'))
            .pipe(gulp.dest(vendorJsDir)),
        gulp.src(
            ['build/bootstrap/javascripts/bootstrap.js'])
            .pipe(gu.env.type === 'production' ? uglify() : gu.noop())
            .pipe(concat('bootstrap.js'))
            .pipe(gulp.dest(vendorJsDir))
    ]);

});

/**
 * Reload on change ...
 */
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(jsSrcDir + '/**/*.jsx', ['scripts']);
    gulp.watch(jsSrcDir + '/**/*.js', ['scripts']);
    gulp.watch(scssSrcDir + '/**/*.scss', ['sass']);
    gulp.watch(assetsSrcDir + '/**/*', ['assets']);
});

/**
 * Define the default target.
 */
gulp.task('default', ['scripts', 'assets', 'sass', 'vendor_scripts']);