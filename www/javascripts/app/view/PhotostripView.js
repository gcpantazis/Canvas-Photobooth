/*
 * PhotostripView.js
 *
 */

var PhotostripView = Backbone.View.extend({

	el: $('#section_content'),

	events: {
	},

	initialize: function(options) {

		_.bindAll(this);

		App.bind('show:index', this.render);
		App.bind('press:key', this.keyPress);

		log("Backbone : PhotostripView : Initialized");
	},

	render: function() {
		var indexTemplate = _.template($('#photostrip_template').html());

		this.el.html(indexTemplate);
		this.instructionalModal();
	},

	instructionalModal: function() {

		var view = this;

		App.trigger('show:modal', {
			text: 'Welcome to the photobooth! Press any key to start taking your photos!'
		});

		view.initialModalOpen = true;
	},

	unload: function() {

		var view = this,
			$photoStrip = view.el.find('#photostrip'),
			$photoImgs = $photoStrip.find('.photo_img');

		$photoStrip.removeClass('active');

		$photoStrip.on('transitionend webkitTransitionEnd', function(){
			$photoImgs.remove();
			view.started = false;
			view.photosComplete = false;
			$(this).off();
		});
	},

	showStrip: function() {

		var view = this;

		_.defer(function(){
			view.el.find('#photostrip').addClass('active');
		});
	},

	keyPress: function(data){

		var view = this;

		// Mapping only numbers 1-5.
		if ( data.key >= 49 && data.key <= 53 ) {
			if (view.initialModalOpen) {
				App.trigger('hide:modal');
				view.initialModalOpen = false;
				view.showStrip();
				view.captureAll();
			} else if ( data.key === 53 && view.photosComplete ) {
				view.sendPhotoToServer();
			} else if ( data.key >= 49 && data.key <= 52 && view.photosComplete ) {
				view.retakePhoto(data.key - 48);
			}
		}

		// Debug Key. Leaving it in since it's not exposed to the user.
		if ( data.key === 48 ) {
			view.unload();
		}
	},

	clearImage: function($image, cb) {

		var view = this;

		if ( $image.length === 0 ) {
			if (cb) cb();
		} else {

			if ($image.hasClass('active')) {
				$image.removeClass('active');
				$image.on('transitionend webkitTransitionEnd', function(){
					$(this).remove();
					if (cb) cb();
				});
			} else {
				$image.remove();
				if (cb) cb();
			}
		}

	},

	captureImage: function(whichSlide, cb) {

		var view = this,
			$container = $('#photo' + whichSlide),
			$image = $container.find('img');

		view.clearImage($image, function(){
			$.ajax({
				url: '/services/capture.php',
				dataType: 'json',
				success: function(data){

					var newImg = $('<img class="photo_img" src="'+data.imagePath+'" />');

					$container.append(newImg);
					$image = $container.find('img');

					// Really should use imagesloaded here.
					_.delay(function(){

						// In OSX Lion `isightcapture` isn't super reliable; as such
						// I need to verify that this is a good image before proceeding.
						if ( $image.get(0).naturalWidth > 0 ) {
							$image.addClass('active');
							if (cb) cb();
						} else {
							view.captureImage(whichSlide, cb);
						}
					}, 500);
				}
			});
		});
	},

	captureAll: function() {

		var view = this;

		view.started = true;

		// This seems dirty, but the service callback takes forever to execute.
		view.captureImage(1, function(){
			view.captureImage(2, function(){
				view.captureImage(3, function(){
					view.captureImage(4, function() {
						view.photosComplete = true;

						view.modalUp = true;

						App.trigger('show:modal', {
							text: 'Awesome, you did it! Press buttons 1-4 to retake your pictures, and when you\'re finished press "Done".',
							timeout: 4000,
							cb: function() {
								view.modalUp = false;
							}
						});
					});
				});
			});
		});
	},

	retakePhoto: function(which) {

		var view = this;

		view.photosComplete = false;

		view.captureImage(which, function() {
			view.photosComplete = true;
		});
	},

	sendPhotoToServer: function() {

		var view = this;

		if ( view.modalUp ) return;

		$('#photostrip').html2canvas({onrendered: function(canvas){
			$.ajax({
				url: '/services/savecanvas.php',
				dataType: 'json',
				type: 'POST',
				data: {
					img: canvas.toDataURL()
				},
				success: function(data){

					App.trigger('show:modal', {
						text: 'Photostrip upload! You can grab them when you get home at http://emilyandkevin.herokuapps.com. Photobooth restarting in 10 seconds!',
						timeout: 9000,
						cb: function(){
							view.unload();
							_.delay(function(){
								view.instructionalModal();
							}, 500);
						}
					});
				},
				error: function(msg){
					console.log(msg);
				}
			});
		}})
	}
});
