/*
 * AppRouter.js
 *
 */

var AppRouter = Backbone.Router.extend({

	initialize: function() {

		// Initialize Section Views
		photostripView = new PhotostripView();
		navView = new NavView();
		modalView = new ModalView();

		log("Backbone : AppRouter : Initialized");
	},

	'routes': {
		'': 'index',
	},

	'index': function() {
		App.trigger('show:index');
	}

});
