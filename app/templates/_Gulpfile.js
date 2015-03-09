// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
// Инициализируем плагины
var gulp    = require('gulp'), // Сообственно Gulp JS
    css     = require('gulp-<%= CSSpreprocessorsName %>'), // CSS preprocessor
    jade    = require('gulp-jade'), // Jade
    coffee  = require('gulp-coffee'), // coffee-script
    csso    = require('gulp-csso'), // Минификация CSS
    uglify  = require('gulp-uglify'), // Минификация JS
    concat  = require('gulp-concat'), // Склейка файлов
    connect = require('gulp-connect'); // http-сервер



<% if (_.slugify(CSSpreprocessorsName) != 'css') { %>
        //Вариативный таск 
// Собираем CSS препроцессор
gulp.task('css', function () {
    gulp.src('./app/src/<%= _.slugify(CSSpreprocessorsName) %>/**/*.<%= CSSpreprocessorsExt %>')
        .pipe(stylus()) // Преобразуем в css
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем
        .pipe(concat('style.css')) // склеиваем полученные css в style.css
        .pipe(gulp.dest('./app/dev/css')) // отправляем в версию для разработки
        .pipe(connect.reload());
});
<% } else {%>
gulp.task('css', function () {
    gulp.src('./app/src/<%= _.slugify(CSSpreprocessorsName) %>/**/*.<%= CSSpreprocessorsExt %>')
        .pipe(concat('style.css')) // склеиваем полученные css в style.css
        .pipe(gulp.dest('./app/dev/css')) // отправляем в версию для разработки
        .pipe(connect.reload());
});
<% }%>   
        //Вариативный таск
// Собираем HTML препроцессор
gulp.task('jade', function() {
    gulp.src(['./app/src/jade/**/*.jade', '!./app/src/jade/modules/*.jade'])
        .pipe(jade({
            pretty: true
        }))  // Собираем Jade только в папке assets/template/ исключая файлы из utils
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(gulp.dest('./app/dev/')) // отправляем в версию для разработки
    .pipe(connect.reload()); // даем команду на перезагрузку страницы
}); 
        //Вариативный таск
// Собираем JS
gulp.task('js', function() {
    gulp.src(['./app/src/coffee/**/*.coffee'])
        .pipe(coffee({bare: true}))
        .on('error', console.log)
        //.pipe(concat('script.js')) // Склеиваем JS
        .pipe(gulp.dest('./app/dev/js'))
        .pipe(connect.reload()); // даем команду на перезагрузку страницы
});
 
        //Неизменный таск
// Локальный сервер для разработки
gulp.task('http-server', function() {
    connect.server(
    {
        root: 'app/dev',
        livereload: true
    });
});
        // Неизменный таск
// Смотрим за изменениями
gulp.task('watch', function () {
    gulp.watch(['./app/src/<%= _.slugify(CSSpreprocessorsName) %>/**/*.<%= CSSpreprocessorsExt %>'], ['css']);
    gulp.watch(['./app/src/jade/**/*.jade'], ['jade']);  
    gulp.watch(['./app/src/coffee/**/*.coffee'], ['js']);
});

        // Неизменный таск
// Запуск сервера разработки gulp watch
gulp.task('default', ['http-server', 'watch']);
 
        // Вариативный таск
// Запуск сборщика продакшена
gulp.task('build', function() {
 
    // CSS preprocessor
 
    gulp.src(['./app/src/<%= _.slugify(CSSpreprocessorsName) %>/**/*.<%= CSSpreprocessorsExt %>'])
        .pipe(css()) // преобразуем sass в css
        .pipe(concat('style.css')) // склеиванием css
        // .pipe(csso()) // минимизируем css
        .pipe(gulp.dest('./app/build/css/')); // записываем css
 
    // jade
 
    gulp.src(['./app/src/jade/**/*.jade', '!./app/assets/jade/utils/**/*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./app/build/'));
 
    // js
 
    gulp.src(['./app/src/coffee/**/*.coffee', './app/assets/coffee/**/*.js'])
        .pipe(coffee({bare: true}))
        // .pipe(uglify())
        .pipe(gulp.dest('./app/build/js'));
});