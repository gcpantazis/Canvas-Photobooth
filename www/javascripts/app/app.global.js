/*
 * app.global.js
 *
 */

var App = App || {};
App.routers = App.models = App.collections = App.views = {};
_.extend(App, Backbone.Events);

App.Global = (function(window, document) {

	var _$window = $(window),
		_$body = $(document.body),
		_$sectionMain = $('#section_main');

	var self = {
		'init': function() {
			_$sectionMain.show();

			App.routers.galleryRouter = new AppRouter;
			Backbone.history.start();

			$(document).keypress(function(e) {
				App.trigger('press:key', {key: e.keyCode});
			});

			log("Global : Initialized");
		}
	};

	return self;

})(this, this.document);
