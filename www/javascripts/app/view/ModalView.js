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

		this.el.fadeOut(0);

		log("Backbone : ModalView : Initialized");
	},

	render: function(message) {

		if ( !message ) return;
		if ( App.modalActive ) return;

		App.modalActive = true;

		var view = this,
			timeoutDuration = message.timeout || 0,
			viewModel = {
				text: message.text
			};

		var modalTemplate = _.template($('#modal_template').html(), viewModel);
		view.el.html(modalTemplate);

		view.el.fadeIn(350);

		if ( message.timeout ) {
			_.delay(function(){
				view.hide();
			}, timeoutDuration);
		}

		if ( message.cb ) {
			_.delay(function(){
				message.cb();
			}, timeoutDuration);
		}

	},

	hide: function() {

		this.el.fadeOut(350, function(){
			App.modalActive = false;
		});

	}

});
