const gulp = require("gulp");
const { parallel, series } = require("gulp");

const htmlmin = require("gulp-htmlmin");
const sass = require('gulp-sass')(require('sass'));
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create(); //https://browsersync.io/docs/gulp
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const rename = require("gulp-rename");


// /*
// TOP LEVEL FUNCTIONS
//     gulp.task = Define tasks
//     gulp.src = Point to files to use
//     gulp.dest = Points to the folder to output
//     gulp.watch = Watch files and folders for changes
// */


// HTML
function html(cb) {
    gulp.src("src/**/*.html")
        .pipe(gulp.dest("dist"))
        .pipe(
            htmlmin({
                collapseWhitespace: false
            })
        )
        .pipe(gulp.dest("dist"));
    cb();
}

// SCSS
function css(cb) {
    gulp.src("src/scss/**/*.scss")
        .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
        .pipe(autoprefixer({
            browserlist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("dist/css"))
        // Stream changes to all browsers
        .pipe(browserSync.stream());
    cb();
}

// JS
function js(cb) {
    gulp.src("src/js/**/*js")
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat("script.js"))
        // .pipe(uglify())  // TO MINIMIZE
        .pipe(gulp.dest("dist/js"));
    cb();
}

// IMAGES
function imageMin(cb) {
    gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
    cb();
}

// WATCH
function watch_files() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
    gulp.watch("src/*.html", html).on("change", browserSync.reload);
    gulp.watch("src/scss/**/*.scss", css);
    gulp.watch("src/js/*.js", js).on("change", browserSync.reload);
    gulp.watch("src/**/*.+(png|jpg|jpeg|gif|svg)", imageMin).on("change", browserSync.reload);
}

// Default 'gulp' command with start local server and watch files for changes.
exports.default = series(html, css, js, imageMin, watch_files);

// 'gulp build' will build all assets but not run on a local server.
exports.build = parallel(html, css, js, imageMin);

  //
  //
  // ******* END STANDARD SiteBase GULP CONFIG *******
  //
  //