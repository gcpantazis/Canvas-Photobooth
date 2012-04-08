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
		var indexTemplate = _.template($('#example_backbone_template').html());
		this.el.html(indexTemplate);
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
			if ( !view.started ) {
				view.showStrip();
				view.captureAll();
				return;
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
			$image.removeClass('active');
			$image.on('transitionend webkitTransitionEnd', function(){
				$(this).remove();
				if (cb) cb();
			});
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
						$image.addClass('active');
					}, 500);

					if (cb) cb();
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
		$('#photostrip').html2canvas({onrendered: function(canvas){
			$.ajax({
				url: '/services/savecanvas.php',
				dataType: 'json',
				type: 'POST',
				data: {
					img: canvas.toDataURL()
				},
				success: function(data){
					alert('sent');
				},
				error: function(msg){
					console.log(msg);
				}
			});
		}})
	}
});
