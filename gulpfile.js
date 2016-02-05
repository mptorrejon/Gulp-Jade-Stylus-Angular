var gulp = require('gulp'),
	gutil = require('gulp-util')
	jshint = require('gulp-jshint')
	connect = require('gulp-connect')
	jade = require('jade')
	gulpjade = require('gulp-jade')
	stylus = require('gulp-stylus');

//create html from jade files
gulp.task('html-converter', function(){
	return gulp.src('./index.jade')
			.pipe(gulpjade({
				jade: jade,
				pretty: true
			}))
			.pipe(gulp.dest('./'))
			.pipe(connect.reload());
});
//builds css from stylus
gulp.task('css-converter', function(){
	return gulp.src('./source/stylus/global.styl')
			.pipe(stylus())
			.pipe(gulp.dest('./public/assets/stylesheets/build'))
			.pipe(connect.reload());
})
//watches for index.jade file and
//then calls task to convert it into html
gulp.task('watch', function(){
	gulp.watch(['./**/*.jade'], ['html-converter']);
	gulp.watch(['./source/stylus/*.styl'], ['css-converter']);
});
//fires browser using index.html previously converted from a jade file
gulp.task('html', function(){
	gulp.src('./index.html')
	.pipe(connect.reload() );
});
//app configs
gulp.task('webserver', function(){
	connect.server({
		port: 3000,
		livereload: true
	});
});
//task gets call by running 'gulp' in terminal
gulp.task('default', ['html-converter', 'css-converter', 'webserver', 'watch']);
