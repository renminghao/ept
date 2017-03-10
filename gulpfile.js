var gulp = require('gulp');
var babel = require('gulp-babel');
var BABEL_CONFIG = {
	presets : ['es2015','stage-0'],
	plugins : ['transform-async-to-generator']
}

gulp.task('js', ()=>{
	return gulp.src(['lib/**/*.js'])
			.pipe(babel(BABEL_CONFIG))
			.pipe(gulp.dest('dist'));
})

gulp.task('test', ['copy'], ()=>{
	return gulp.src(['dev/**/*.js'])
				.pipe(babel(BABEL_CONFIG))
				.pipe(gulp.dest('build'));
})

gulp.task('copy', ()=>{
	return gulp.src(['dev/**/*.ept'])
				.pipe(gulp.dest('build'));
})

gulp.task('default',['test','js'],()=>{});
