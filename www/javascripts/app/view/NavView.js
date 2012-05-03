/*
 * NavView.js
 *
 */

var NavView = Backbone.View.extend({

	el: $('#section_nav'),

	events: {
	},

	initialize: function(options) {

		_.bindAll(this);

		App.bind('show:nav', this.show);
		App.bind('hide:nav', this.hide);

		this.render();

		log("Backbone : NavView : Initialized");
	},

	render: function() {
		var navTemplate = _.template($('#nav_template').html());
		this.el.html(navTemplate);
	}

});
