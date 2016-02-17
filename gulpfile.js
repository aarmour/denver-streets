const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const minifyCss = require('gulp-cssnano');
const autoprefixer = require('autoprefixer');
const rev = require('gulp-rev');
const devServer = require('gulp-nodemon');

const paths = {
  scss: './src/common/**/*.scss'
};

gulp.task('build-css', () => {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(postcss([autoprefixer]))
    .pipe(minifyCss())
    .pipe(rev())
    .pipe(gulp.dest('./dist'))
    // Save the revision manifest
    .pipe(rev.manifest('css-manifest.json'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
  gulp.watch(paths.scss, ['build-css']);
});

gulp.task('develop', ['build-css'], () => {
  gulp.watch(paths.scss, ['build-css']);

  return devServer({
    script: './src/server/index.js',
    watch: ['src/server', 'dist/css-manifest.json']
  });
});
