/*
 * AppRouter.js
 *
 */

var AppRouter = Backbone.Router.extend({

	initialize: function() {

		// Initialize Section Views
		indexView = new IndexView();

		log("Backbone : AppRouter : Initialized");
	},

	'routes': {
		'': 'index',
	},

	'index': function() {
		App.trigger('show:index');
	}

});
