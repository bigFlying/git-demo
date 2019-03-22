'use strict'
//创建任务
//1:less编译(css) 压缩 合并
//2:js 压缩混淆合并
//3:img的复制
//4:html压缩
//在gulpfile.js文件中载入gulp模块
var gulp = require('gulp');
//less模块
var less = require('gulp-less');
//concat模块
var concat = require('gulp-concat');
//uglify模块
var uglify = require('gulp-uglify');
//创建gulp-cssnano
var cssnano = require('gulp-cssnano');
//创建htmlmin
var htmlmin = require('gulp-htmlmin');
//less编译(css) 压缩 合并
gulp.task('styles',function(){
	//styles任务之行时候执行的代码
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({stream:true}));
});
//js 压缩混淆合并
gulp.task('script',function(){
	gulp.src('src/javascript/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/javascript'))
	.pipe(browserSync.reload({stream:true}));
});
//img的复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({stream:true}))
	;
});
//html压缩
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace:true,
		removeComments:true
	}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream:true}));
});
//browser-sync模块
var browserSync = require('browser-sync');

gulp.task('serve',function(){

		browserSync({
			server:{
				baseDir:['dist']
			}
		});
		gulp.watch('src/styles/*.less',['styles']);
		gulp.watch('src/javascript/*.js',['script']);
		gulp.watch('src/images/*.*',['image']);
		gulp.watch('src/*.html',['html']);
})
