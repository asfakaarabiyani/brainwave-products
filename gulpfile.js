const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");

// Define the 'sass' task with source maps
gulp.task("sass", function () {
  return gulp
    .src("assets/stylesheets/scss/**/*.scss") // Source folder containing Sass files
    .pipe(sourcemaps.init()) // Initialize sourcemaps before compilation starts
    .pipe(sass().on("error", sass.logError)) // Compile Sass and log errors
    .pipe(cleanCSS()) // Minify CSS
    .pipe(sourcemaps.write(".")) // Write sourcemaps file in the same directory as the compiled CSS
    .pipe(gulp.dest("assets/stylesheets/css")); // Destination folder for compiled CSS files
});

// Define the 'build' task (used for deployment)
gulp.task("build", gulp.series("sass")); // Build task only compiles the SCSS

// Define the 'watch' task
gulp.task("watch", function () {
  gulp.watch("assets/stylesheets/scss/**/*.scss", gulp.series("sass")); // Watch Sass files for changes
});

// Define the 'default' task
gulp.task("default", gulp.series("sass", "watch")); // Default task that runs 'sass' and 'watch'
