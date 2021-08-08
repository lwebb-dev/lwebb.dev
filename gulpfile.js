"use strict";

const { watch, series, parallel } = require("gulp");
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const htmlMin = require("gulp-htmlmin");

function cssTranspile() {
    return gulp.src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./src/css"));
};

function cssPublish() {
    return gulp.src("./src/css/**/*.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/css"));
}

function htmlPublish() {
    return gulp.src("./src/**/*.html")
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist"));
}

function resPublish() {
    return gulp.src("./src/res/**/*")
    .pipe(gulp.dest("./dist/res"));
}

exports.default = () => {
    watch("./src/scss/*", cssTranspile);
}

exports.publish = series(cssTranspile, parallel(cssPublish, htmlPublish, resPublish));