const { task, src, dest, series } = require("gulp");
const babel = require("gulp-babel");
const minify = require('gulp-minify');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');

task("js", () => {
  return src("src/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(minify())
    .pipe(dest("dist"));
});

task("scss", () => {
  return src("src/*.scss")
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(dest("dist"));
});

task("default", series("js", "scss"));
