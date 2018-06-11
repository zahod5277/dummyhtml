var gulp = require('gulp'),
        sass = require('gulp-sass'),
        concat = require('gulp-concat'),
        cleanCSS = require('gulp-clean-css'),
        prefixer = require('gulp-autoprefixer'),
        sourcemaps = require('gulp-sourcemaps'),
        newer = require('gulp-newer'),
        cssmin = require('gulp-cssnano'),
        imagemin = require('gulp-imagemin'),
        uglify = require('gulp-uglify'),
        browserSync = require("browser-sync");

var paths = {src: 'public_html/app/', dist: 'public_html/dist/'},
        src = {
            sass: paths.src + 'sass/**/**/*.+(scss|sass|less)',
            js: paths.src + 'scripts/**/*.js',
            images: paths.src + 'images/**/*',
            fonts: paths.src + 'fonts/**/*',
            html: paths.src + 'html/**/*'
        },
        dist = {
            html: paths.dist,
            sass: paths.dist + 'css',
            js: paths.dist + 'js',
            images: paths.dist + 'images',
            fonts: paths.dist + 'fonts'
        };

gulp.task('sass', function () {
    return gulp.src([paths.src + 'libs/**/*.css', paths.src + 'sass/app.scss'])
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('main.min.css'))
            .pipe(prefixer())
            .pipe(cleanCSS({compatibility: '*'}))
            .pipe(cssmin())
            .pipe(gulp.dest(dist.sass));
});

gulp.task('js', function () {
    return gulp.src([paths.src + 'libs/jquery.js', paths.src + 'libs/*/*.js', src.js])
            .pipe(uglify())
            .pipe(concat('main.min.js'))
            .pipe(gulp.dest(dist.js));
});

gulp.task('images', function () {
    return gulp.src(src.images)
            .pipe(newer(dist.images))
            .pipe(imagemin())
            .pipe(gulp.dest(dist.images))
});

gulp.task('html', function () {
    var input = src.html;
    return gulp.src([input])
            .pipe(newer(dist.html))
            .pipe(gulp.dest(dist.html))
});

gulp.task('fonts', function () {
    return gulp.src(src.fonts)
            .pipe(newer(dist.fonts))
            .pipe(gulp.dest(dist.fonts))
});

gulp.task('build', ['sass', 'js', 'images', 'fonts', 'html']);

gulp.task('default', function () {

    //browserSync.init({
    //    proxy: "test.creonagency.ru"
    //});

    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.js, ['js']);
    gulp.watch(src.images, ['images']);
    gulp.watch(src.fonts, ['fonts']);

    //browserSync.watch(paths.dist + '**/*').on('change', browserSync.reload);

});