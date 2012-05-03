/*
 * ModalView.js
 *
 */

var ModalView = Backbone.View.extend({

	el: $('#section_modal'),

	events: {
	},

	initialize: function(options) {

		_.bindAll(this);

		App.bind('show:modal', this.render);
		App.bind('hide:modal', this.hide);

		log("Backbone : ModalView : Initialized");
	},

	render: function() {

		var view = this,
			viewModel = {};

		var modalTemplate = _.template($('#modal_template').html(), viewModel);
		this.el.html(modalTemplate);
	}

});
