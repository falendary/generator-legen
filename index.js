"use strict";
var util = require('util'); // Какая-то неизвестная зависимость
var path = require('path'); // Какая-то неизвестная зависимость
var yeoman = require('yeoman-generator'); // Подключаем генератор yeoman

var leGenerator = module.exports = function leGenerator(args, options, config)
{
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function()
		{
			this.InstallDependencies({ skipInstall: options['skip-install']});
		}
	);
	// преобразуем package.json в строку и заносим его в инстанс pkg
	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};
// Производим наследованием в util?
util.inherits(leGenerator, yeoman.generators.Base);

// Генерируем вопросы
leGenerator.prototype.askFor = function askFor()
{
	// Вызываем инстансы асинхронно
	var cb = this.async();

	console.log(this.yeoman);

	var prompts = [
		{
			type: 'input',
			anme: 'appName',
			message: 'What your project name is?',
		}
	];

	this.prompt(prompts, function(answers)
	{
		this.appName = answers.appName;

		cb();
	}.bind(this));
};
leGenerator.prototype.app = function app() 
{
	// Создаем сам проект
	this.mkdir('app');
	// Создаем папку с исходниками
	this.mkdir('app/dev');
	// Создаем папку с версией для разработки
	this.mkdir('app/test');
	// Папка для создания продакшена
	this.mkdir('app/deploy');
}
