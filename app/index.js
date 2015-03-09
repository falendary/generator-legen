"use strict";
var util = require('util'); // Какая-то неизвестная зависимость
var path = require('path'); // Какая-то неизвестная зависимость
var yeoman = require('yeoman-generator'); // Подключаем генератор yeoman
var yosay = require('yosay');
var chalk = require('chalk');

var Legen = module.exports = function Legen(args, options, config)
{
	yeoman.generators.Base.apply(this, arguments);

	// ASCII

		console.log("                                  ,    ,   .                                  ");
		console.log("                             :@.' ,   ,`  @ `,+:                              ");
		console.log("                      ` `@. :  '   '`;@ # :   ' +` ;:  `.                     ");
		console.log("                      @ #`  `+:`   @#`#+ #``  ,#'   ,+ #;                     ");
		console.log("              	#'. #  @   ;; :.#@@;+#@@#;,.,@   `@ .,`:;                      ");
		console.log("                . :'  @  +@:@,#   `...;....    `'@'#,`#   +# `                ");
		console.log("               .@'.@ `@;; @#`     .       .      @#: ,,@ .,:#'`               ");
		console.log("                ``+ :#.. #       ``        @       '  ':#  :#.                ");
		console.log("                @+  @,; .@        :        `       ;#  ''  .:.                ");
		console.log("                 :.`;` ;;    `@##@:       `#@##'    :#  ++  :                 ");
		console.log("                   ;#@,,;   ,+#####      `'####':    .@  #, #                 ");
		console.log("                ; ',,;'@;    ;',;+#:      @@':,+`   `@`@#@: `                 ");
		console.log("                @`;:@#+ ,     ```  @`    ``` ,       `:.,#`+                  ");
		console.log("                ++., +  .:        `;     @`         #, `@@,#``                ");
		console.log("                ,';, .@ ,'@       .,      ::     `.@: +   ###.                ");
		console.log("                #    @, ;+'      .,,      #+       '. `@; @`.                 ");
		console.log("                ,,  ,,  :,,`    .,`#@   ;+# @    + #,  .@ @ `                 ");
		console.log("                `   ,,  :.`,@   .  `@#@##;   `  +` @:@  ,.@                   ");
		console.log("                    @``@  +.    .     .     `@   @::` @`; `                   ");
		console.log("                    :  ,  #;    #``  ;:#   `,,   :.,. @.                      ");
		console.log("                     '' '':;: ` @@.:#    #.'#    .`,`                         ");
		console.log("                         ,@:   . .  .#;++.`    .  ;`                          ");
		console.log("                              '@.:  @,;,     #.                               ");
		console.log("                               '`  `'. :  +                                   ");
		console.log(".____                                                    __                   ");
		console.log("|    |    ____   _____  ____   ____   ________________ _/  |_  ___________    ");
		console.log("|    |  _/ __ / / ____/ __  \\ /    \\_/ __ \\_  __ \\__  \\    __\\/  _ \\_  __ \\");
		console.log("|    |__\\  ___// /_/  >  ___/|   |  \\  ___/|  | \\// __ \\|  | (  <_> )  | \\/   ");
		console.log("|_______ \\___  >___  / \\___  >___|  /\\___  >__|  (____  /__|  \\____/|__|       ");
		console.log("        \\/   \\/_____/      \\/     \\/     \\/           \\/                     ");
		console.log("                                                                                   ");
                                    

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
		{
			type: 'confirm',
			name: 'useFramework',
			message: 'Вы будете использовать фрейморки?',
			default: true
		},
		{
			type: 'list',
			name: 'CSSframeworks',
			message: 'Какой CSS-фреймворк будете использовать?',
			choices: 
			[
				{
					name: 'Twitter Bootstrap 3',
					value: 'bootstrap'
				},
				{
					name: 'Foundation 5',
					value: 'foundation'
				}
			],
			when: function(answers)
			{
				return answers.useFramework;
			}
		},
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
					value: ['css', 'css']
				}
			],
			default: 0
		},
		{
			type: 'list',
			name: 'typeofApp',
			message: 'Выберите тип вашего приложения?',
			choices:
			[
				{
					name: 'Типовый проект',
					value: 'website',
				},
				{
					name: 'Интернет-магазин',
					value: 'shop',
				},
				{
					name: 'Блог',
					value: 'blog',
				},
				{
					name: 'Уникальный проект',
					value: 'unique',
				}
			]
		},
		{
			type: 'checkbox',
			name: 'jadeShopModules',
			message: 'Выберите необходимые модули для вашего магазина:',
			choices:
			[
				{
					name: 'catalog',
					value: 'jadeCatalog',
					checked: true
				},
				{
					name: 'item',
					value: 'jadeItem',
					checked: true
				},
				{
					name: 'cart',
					value: 'jadeCart',
					checked: true
				},
				{
					name: 'order',
					value: 'jadeOrder',
					checked: true
				},
				{
					name: 'filter',
					value: 'jadeFilter',
					checked: true
				},
				{
					name: 'similar',
					value: 'jadeSimilar',
					checked: true
				},
				{
					name: 'favorite',
					value: 'jadeFavorite',
					checked: true
				}
			],
			when: function(answers)
			{	
				if (answers.typeofApp == 'shop') {
					return answers.typeofApp;
				};
			}
		},
		{
			type: 'checkbox',
			name: 'jadeBlogModules',
			message: 'Выберите необходимые модули для вашего Блога:',
			choices:
			[
				{
					name: 'blog',
					value: 'jadeBlog',
					checked: false
				},
				{
					name: 'post',
					value: 'jadePost',
					checked: false
				}
			],
			when: function(answers)
			{
				if (answers.typeofApp == 'blog') {
					return answers.typeofApp;
				};
			}
		},
		{
			type: 'checkbox',
			name: 'jadeModules',
			message: 'Какие модули вам необходимы?:',
			choices:
			[

				// Модуль шапки страницы
				{
					name: 'header',
					value: 'jadeHeader',
					checked: true
				},
				// Модуль подвала страницы
				{
					name: 'footer',
					value: 'jadeFooter',
					checked: true
				},
				// Модуль хлебных крошек
				{
					name: 'breadcrumbs',
					value: 'jadeBreadcrumbs',
					checked: false
				},
				// Стандартный слайдер
				{
					name: 'slider',
					value: 'jadeCarousel',
					checked: false
				},
				// модуль боковой панели 
				{
					name: 'sidebar',
					value: 'jadeSidebar',
					checked: false
				},
				
				{
					name: 'search',
					value: 'jadeSearch',
					checked: false
				},
				{
					name: 'feedback',
					value: 'jadeFeedback',
					checked: false
				},
				{
					name: 'socials',
					value: 'jadeSocials',
					checked: false
				},
				
				
				// {
				// 	name: 'login',
				// 	value: 'jadeLogin',
				// 	checked: false
				// },
				// {
				// 	name: 'register',
				// 	value: 'jadeRegister',
				// 	checked: false
				// },
				// {
				// 	name: 'forgotPass',
				// 	value: 'jadePassword',
				// 	checked: false
				// },
				// {
				// 	name: 'profile',
				// 	value: 'jadeProfile',
				// 	checked: false
				// },
				{
					name: 'Нет, спасибо, не нужно никаких модулей',
					value: 'null',
					checked: false
				}
			]
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
		
		function hasCommon(mod) { return answers.jadeModules.indexOf(mod) !== -1; };

		function hasShop(mod) { if (answers.jadeShopModules) {return answers.jadeShopModules.indexOf(mod) !== -1;}; };

		function hasBlog(mod) { if (answers.jadeBlogModules) {return answers.jadeBlogModules.indexOf(mod) !== -1;}; };

		// Common modules

			this.jadeHeader 			= hasCommon('jadeBreadcrumbs');

			this.jadeFooter 			= hasCommon('jadeFooter');

			this.jadeBreadcrumbs 		= hasCommon('jadeBreadcrumbs');

			this.jadeCarousel 			= hasCommon('jadeCarousel');

			this.jadeSidebar 			= hasCommon('jadeSidebar');

			this.jadeSearch 			= hasCommon('jadeSearch');

			this.jadeFeedback 			= hasCommon('jadeFeedback');

			this.jadeSocials 			= hasCommon('jadeSocials');

			this.jadePagination 		= hasCommon('jadePagination');

			this.jadeGrid 				= hasCommon('jadeGrid');

			this.jadeInterface 			= hasCommon('jadeInterface');

			this.jadeGallery 			= hasCommon('jadeGallery');			

		// shop modules

			this.jadeCatalog 		= hasShop('jadeCatalog');

			this.jadeItem 			= hasShop('jadeItem');

			this.jadeCart 			= hasShop('jadeCart');

			this.jadeOrder 			= hasShop('jadeOrder');

			this.jadeFilter 		= hasShop('jadeFitler');

			this.jadeSimilar 		= hasShop('jadeSimilar');

			this.jadeFavorite 		= hasShop('jadeFavorite');

		// blog modules

			this.jadeBlog 			= hasBlog('jadeBlog');

			this.jadePost 			= hasBlog('jadePost');

		// user-orientired modules

			this.jadeLogin 			= hasCommon('jadeLogin');

			this.jadeRegister 		= hasCommon('jadeRegister');

			this.jadePassword 		= hasCommon('jadePassword');

			this.jadeProfile 		= hasCommon('jadeProfile');

		// exit

			this.jadenoMods 		= hasCommon('Нет, спасибо, не нужно никаких модулей');

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
		this.write('app/src/'+this.CSSpreprocessorsName+'/index.'+this.CSSpreprocessorsExt, '');
		// Папка для препроцессоров HTML
			// Jade
	this.mkdir('app/src/jade/');
			// Папка для хранения модулей
		this.mkdir('app/src/jade/modules/');
					// Системный невыключаемый модуль <head></head>
				this.copy('jade_modules/head.jade', 'app/src/jade/modules/head.jade');
					// Системный невыключаемый модуль подключаемых скриптов
				this.copy('jade_modules/scripts.jade', 'app/src/jade/modules/scripts.jade');

					// Подключаемые модули
				if (!this.jadenoMods) 

					{

					// Common modules

						// Модуль шапки сайта
						if (this.jadeHeader) 		{this.copy('jade_modules/header.jade', 				'app/src/jade/modules/header.jade');};
						// Модуль подвал сайта
						if (this.jadeFooter) 		{this.copy('jade_modules/footer.jade', 				'app/src/jade/modules/footer.jade');};
						// Модуль хлебный крошек
						if (this.jadeBreadcrumbs) 	{this.copy('jade_modules/breadcrumbs.jade', 		'app/src/jade/modules/breadcrumbs.jade');};
						// Модуль карусели
						if (this.jadeCarousel) 		{this.copy('jade_modules/carousel.jade', 			'app/src/jade/modules/carousel.jade');};
						// Модуль обратной связи
						if (this.jadeFeedback) 		{this.copy('jade_modules/feedback.jade', 			'app/src/jade/modules/feedback.jade');};
						// Модуль страницы поиска
						if (this.jadeSearch) 		{this.copy('jade_modules/search.jade', 				'app/src/jade/modules/search.jade');};
						// Модуль боковой панели
						if (this.jadeSidebar) 		{this.copy('jade_modules/sidebar.jade', 			'app/src/jade/modules/sidebar.jade');};
						// Модуль кнопок соц сетей
						if (this.jadeSocials) 		{this.copy('jade_modules/socials.jade', 			'app/src/jade/modules/socials.jade');};
						// Модуль забыли пароля
						if (this.jadePagination) 	{this.copy('jade_modules/pagination.jade', 			'app/src/jade/modules/pagination.jade');};
						// Модули новостей
							// Модуль списка новостей
						if (this.jadeNewslist) 		{this.copy('jade_modules/news/newslist.jade', 		'app/src/jade/modules/newslist.jade');};
							// Модуль детальной страницы новости
						if (this.jadeNews) 			{this.copy('jade_modules/news/news.jade', 			'app/src/jade/modules/news.jade');};
						// Модуль интерфейса (кнопок, скролбаров, дропдануов)
						if (this.jadeInterface) 	{this.copy('jade_modules/interface.jade', 			'app/src/jade/modules/interface.jade');};
						// Модуль фотогаллереи
						if (this.jadeGallery) 		{this.copy('jade_modules/gallery.jade', 			'app/src/jade/modules/gallery.jade');};
						// Модуль сетки элементов
						if (this.jadeGrid) 			{this.copy('jade_modules/grid.jade', 				'app/src/jade/modules/grid.jade');};

					// shop modules

						// Модуль корзинки товара
						if (this.jadeCart) 			{this.copy('jade_modules/shop/cart.jade', 			'app/src/jade/modules/cart.jade');};
						// Модуль каталога товаров
						if (this.jadeCatalog) 		{this.copy('jade_modules/shop/catalog.jade', 		'app/src/jade/modules/catalog.jade');};
						// Модуль карточки товара
						if (this.jadeItem) 			{this.copy('jade_modules/shop/item.jade', 			'app/src/jade/modules/item.jade');};
						// Модуль страницы заказа
						if (this.jadeOrder) 		{this.copy('jade_modules/shop/order.jade', 			'app/src/jade/modules/order.jade');};
						// Модуль фильтра каталога
						if (this.jadeFilter) 		{this.copy('jade_modules/shop/filter.jade', 		'app/src/jade/modules/filter.jade');};
						// Модуль похожих товаров
						if (this.jadeSimilar) 		{this.copy('jade_modules/shop/similar.jade', 		'app/src/jade/modules/similar.jade');};
						// Модуль избранных товаров
						if (this.jadeFavorite) 		{this.copy('jade_modules/shop/favorite.jade', 		'app/src/jade/modules/favorite.jade');};

					// blog modules

						// Модуль списка блогов
						if (this.jadeBlog) 			{this.copy('jade_modules/blog/blog.jade', 			'app/src/jade/modules/blog.jade');};
						// Модуль поста из блога
						if (this.jadePost) 			{this.copy('jade_modules/blog/post.jade', 			'app/src/jade/modules/post.jade');};

					// user modules

						// Модуль логина
						if (this.jadeLogin) 		{this.copy('jade_modules/user/login.jade', 			'app/src/jade/modules/login.jade');};
						// Модуль регистрации
						if (this.jadeRegister) 		{this.copy('jade_modules/user/register.jade', 		'app/src/jade/modules/register.jade');};
						// Модуль забыли пароля
						if (this.jadePassword) 		{this.copy('jade_modules/user/password.jade', 		'app/src/jade/modules/password.jade');};
						// Модуль профиля пользователя
						if (this.jadeProfile) 		{this.copy('jade_modules/user/profile.jade', 		'app/src/jade/modules/profile.jade');};
					
					};


			// Исходный индексный файлик 
		this.write('app/src/jade/index.jade', '');
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

Legen.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
};
Legen.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
