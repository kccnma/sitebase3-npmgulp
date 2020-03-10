const gulp = require("gulp");
const { parallel, series } = require("gulp");

const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create(); //https://browsersync.io/docs/gulp#page-top
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');

// /*
// TOP LEVEL FUNCTIONS
//     gulp.task = Define tasks
//     gulp.src = Point to files to use
//     gulp.dest = Points to the folder to output
//     gulp.watch = Watch files and folders for changes
// */

// Optimise Images
function imageMin(cb) {
    gulp.src("src/img/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
    cb();
}


// Minify and copy HTML
function html(cb) {
    gulp.src("src/*.html")
        .pipe(gulp.dest("dist"))
        .pipe(
            htmlmin({
                collapseWhitespace: true
            })
        )
        .pipe(gulp.dest("dist"));
    cb();
}

// Scripts
function js(cb) {
    gulp.src("src/js/*js")
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat("script.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
    cb();
}

// Compile Sass
function css(cb) {
    gulp.src("src/scss/*.scss")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(autoprefixer({
            browserlist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("dist/css"))
        // Stream changes to all browsers
        .pipe(browserSync.stream());
    cb();
}



// Watch Files
function watch_files() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
    gulp.watch("src/scss/**/*.scss", css);
    gulp.watch("src/js/*.js", js).on("change", browserSync.reload);
    gulp.watch("src/*.html", html).on("change", browserSync.reload);

}

// Default 'gulp' command with start local server and watch files for changes.
exports.default = series(html, css, js, imageMin, watch_files);

// 'gulp build' will build all assets but not run on a local server.
exports.build = parallel(html, css, js, imageMin);
