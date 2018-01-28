const gulp = require('gulp');
const sequence = require('gulp-sequence');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const path = require('path');
const fs = require('fs');
const map = require('map-stream');
const browserSync = require('browser-sync');
const server = browserSync.create();
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const concat = require('gulp-concat');

process.env.NODE_ENV = 'production';

gulp.task('build:store', () => {
    return rollup.rollup({
        input: './src/store/index.js',
        plugins: [
            resolve(),
            commonjs(),
            babel()
        ]
    }).then(bundle => {
        return bundle.write({
            file: './dist/store.js',
            format: 'iife',
            name: 'IQ.Store',
            sourcemap: true
        });
    });
});

gulp.task('hbs:runtime', () => {
    return gulp.src([
            './node_modules/handlebars/dist/handlebars.runtime.min.js'
        ])
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build:index', () => {
    return gulp.src([
            './src/index.html'
        ])
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', sequence('build:templates', 'hbs:runtime', 'build:store', 'build:index'));

gulp.task('watch', ['default'], () => {

    server.init({
        server: {
            baseDir: './dist',
            index: './index.html',
            routes: {
                "/bower_components": "bower_components",
                "/dist": 'dist'
            }
        }
    });

    gulp.watch([
        './src/reducers/**/*.js',
        './src/store/**/*.js',
    ], () => {
        sequence('build:store')((err) => {
            if (err) console.log(err);
            server.reload();
        });
    });

    gulp.watch([
        './src/**/*.hbs',
    ], () => {
        sequence('build:templates')((err) => {
            if (err) console.log(err);
            server.reload();
        });
    });

    gulp.watch([
        './src/**/*.html',
    ], () => {
        sequence('build:index')((err) => {
            if (err) console.log(err);
            server.reload();
        });
    });

});

gulp.task('build:templates', function () {
    gulp.src('./src/**/*.hbs')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'IQ.Templates',
            noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist'));
});