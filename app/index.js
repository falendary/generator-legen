"use strict";
var util = require('util'); // Какая-то неизвестная зависимость
var path = require('path'); // Какая-то неизвестная зависимость
var yeoman = require('yeoman-generator'); // Подключаем генератор yeoman
var yosay = require('yosay');
var chalk = require('chalk');

var Legen = module.exports = function Legen(args, options, config)
{
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function()
		{
			this.installDependencies({ skipInstall: options['skip-install']});
		}
	);
	// преобразуем package.json в строку и заносим его в инстанс pkg
	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};
// Производим наследованием в util?
util.inherits(Legen, yeoman.generators.Base);

// Генерируем вопросы
Legen.prototype.askFor = function askFor()
{
	// Вызываем инстансы асинхронно
	var cb = this.async();
	var prompts = [
		{
			type: 'input',
			name: 'appName',
			message: 'Введите название вашего проекта:',
		},
		// В разработке

		// {
		// 	type: 'list',
		// 	name: 'CSSframeworks',
		// 	message: 'Какой Сборщик проектов предпочитаете?',
		// 	choices: 
		// 	[
		// 		{
		// 			name: 'Grunt',
		// 			value: 'grunt'
		// 		},
		// 		{
		// 			name: 'Gulp',
		// 			value: 'gulp'
		// 		},
		// 		{
		// 			name: 'Никакой',
		// 			value: 'null'
		// 		}
		// 	],
		// 	default: 1
		// },
		//  В разработке
		// {
		// 	type: 'confirm',
		// 	name: 'useFramework',
		// 	message: 'Вы будете использовать фрейморки?',
		// 	default: true
		// },
		// В разработке
		// {
		// 	type: 'list',
		// 	name: 'CSSframeworks',
		// 	message: 'Какой CSS-фреймворк будете использовать?',
		// 	choices: 
		// 	[
		// 		// В разработке
		// 		{
		// 			name: 'Foundation 5',
		// 			value: 'foundation'
		// 		},
		// 		{
		// 			name: 'Twitter Bootstrap 3',
		// 			value: 'bootstrap'
		// 		},
		// 		{
		// 			name: 'Никакой',
		// 			value: 'null'
		// 		}
		// 	],
		// 	default: 0
		// },
		{
			type: 'list',
			name: 'CSSpreprocessors',
			message: 'Какой CSS-препроцессор будете использовать?',
			choices: 
			[
				{
					name: 'Stylus',
					// препроцессор, расширение
					value: ['stylus', 'styl']
				},
				{
					name: 'SCSS',
					// препроцессор, расширение
					value: ['sass', 'scss']
				},
				// В разработке
				{
					name: 'LESS',
					// препроцессор, расширение
					value: ['less', 'less']
				},
				{
					name: 'Никакой',
					value: ['null']
				}
			],
			default: 0
		}
	];

	this.prompt(prompts, function(answers)
	{
		this.appName = answers.appName;
		// Что за CSS фреймворк мы выбрали
		this.CSSframeworks = answers.CSSframeworks;
		// Что за CSS препроцессор мы выбрали
		this.CSSpreprocessorsName = answers.CSSpreprocessors[0];
		// расширение CSS препроцессора
		this.CSSpreprocessorsExt = answers.CSSpreprocessors[1];
		

		console.log(this.CSSpreprocessorsExt);

		cb();
	}.bind(this));
};
Legen.prototype.app = function app() 
{
	// Создаем сам проект
	this.mkdir('app');


	// Создаем папку с исходниками
	this.mkdir('app/src');
		// Папка для препроцессоров CSS
	this.mkdir('app/src/'+this.CSSpreprocessorsName+'/');
		// Папка для препроцессоров HTML
	this.mkdir('app/src/jade/');
		// Coffescript
	this.mkdir('app/src/coffee/');


	// Создаем папку с версией для разработки
	this.mkdir('app/dev');
		// Папка для css
	this.mkdir('app/dev/css');
			// Библиотеки css
	this.mkdir('app/dev/css/libs');
		// Папка для js
	this.mkdir('app/dev/js');
			// Библиотеки js
	this.mkdir('app/dev/js/libs');
		// Папка для картинок
	this.mkdir('app/dev/img');
		// Папка для шрифтов
	this.mkdir('app/dev/fonts');	



	// Папка для продакшена
	this.mkdir('app/build');
		// Папка для css
	this.mkdir('app/build/css');
			// Библиотеки css
	this.mkdir('app/build/css/libs');
		// Папка для js
	this.mkdir('app/build/js');
			// Библиотеки js
	this.mkdir('app/build/js/libs');
		// Папка для картинок
	this.mkdir('app/build/img');
		// Папка для шрифтов
	this.mkdir('app/build/fonts');

	// Генерирует пакет с зависимостями
	this.copy('_package.json', 'package.json');
	// бовер с фреймворками и библиотеками
  	this.copy('_bower.json', 'bower.json');
  	// Gulp file меняющийся от полученных данных о препроцессорах
  	this.copy('_Gulpfile.js', 'Gulpfile.js');
}

Legen.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
