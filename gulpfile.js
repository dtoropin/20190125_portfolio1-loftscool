var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	csso = require('gulp-csso'),
	gcmq = require('gulp-group-css-media-queries'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	notify = require('gulp-notify');

// Browsersync
gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		browser: ['chrome']
	});
});

// Js
gulp.task('js', function () {
	return gulp.src([
		'node_modules/jquery/dist/jquery.js',
		'app/libs/jquery.bpopup.min.js',
		'app/libs/qTip/jquery.qtip.min.js',
		'app/js/common.js' // Всегда в конце
	])
		.pipe(concat('scripts.min.js'))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({ stream: true }));
});

// Sass
gulp.task('sass', function () {
	return gulp.src('app/sass/**/[^_]*.sass')
		.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({ stream: true }));
});

// Build
gulp.task('build', function () {
	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

	var buildJs = gulp.src('app/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist'));

	var buildCss = gulp.src('app/*.css')
		.pipe(autoprefixer(['> 0.01%']))
		.pipe(gcmq())
		.pipe(csso({ comments: false }))
		.pipe(gulp.dest('dist'));

	var buildImg = gulp.src('app/img/**/*')
		.pipe(imagemin({
			interlaced: true, //gif
			progressive: true, //jpg
			optimizationLevel: 5, //png
			svgoPlugins: [{ removeViewBox: false }] //svg
		}))
		.pipe(gulp.dest('dist/img'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));
});

// Watch
gulp.task('watch', ['sass', 'js', 'browser-sync'], function () {
	gulp.watch('app/sass/**/*.sass', function () {
		setTimeout(function () {
			gulp.run('sass');
		}, 1000);
	});
	gulp.watch('app/js/common.js', ['js']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);
