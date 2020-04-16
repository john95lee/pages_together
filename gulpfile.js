var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');

//SASS to CSS---------------------------------
gulp.task('sass', function(){
    return gulp.src('./sass/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('./css'));
});

//CSS minify-----------------------------------

gulp.task('css', async function(){

    gulp.src('./css/*.css')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
    .pipe(gulp.dest('./public/css/'));
});

//Watch files---------------------------------
gulp.task('sass:watch', function(){
    gulp.watch('./sass/*.scss',['sass']);
})

gulp.task('css:watch', function(){
    gulp.watch('./css/*.css',['css']);
})
