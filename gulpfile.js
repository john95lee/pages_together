var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

//SASS to CSS
function sassTask() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
}

//JS minify using uglify
function jsTask() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
}

//CSS minify with uglifycss
function cssTask() {
    return gulp.src('./src/css/*.css')
        .pipe(uglifycss())
        .pipe(gulp.dest('./public/css'));
}

//Move HTML from src folder to public folder
function htmlTask() {
    return gulp.src('./src/html/*.html')
        .pipe(gulp.dest('./public'))
}

//Watch for changes and reload browser
function watch() {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    });
    gulp.watch('./src/sass/*.scss', sassTask);
    gulp.watch('./src/js/*.js', jsTask);
    gulp.watch('./src/css/*.css', cssTask);
    gulp.watch('./src/html/*.html', htmlTask);
    gulp.watch('./public/*.html').on('change', browserSync.reload);
    gulp.watch('./public/js/*.js').on('change', browserSync.reload);
    gulp.watch('./public/css/*.css').on('change', browserSync.reload);
}

exports.sassTask = sassTask;
exports.jsTask = jsTask;
exports.cssTask = cssTask;
exports.htmlTask = htmlTask;

exports.watch = watch;
exports.update = gulp.series(sassTask,jsTask,cssTask,htmlTask);
