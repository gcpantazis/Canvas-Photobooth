/*
 * IndexView.js
 *
 */

var IndexView = Backbone.View.extend({

	el: $('#section_content'),

	events: {},

	initialize: function(options) {

		_.bindAll(this, 'render');

		App.bind('show:index', this.render);

		log("Backbone : IndexView : Initialized");
	},

	render: function() {
		var indexTemplate = _.template($('#example_backbone_template').html());
		this.el.html(indexTemplate);
	}

});
