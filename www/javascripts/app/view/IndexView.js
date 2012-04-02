/*
 * IndexView.js
 *
 */

var IndexView = Backbone.View.extend({

	el: $('#section_content'),

	events: {
	},

	initialize: function(options) {

		_.bindAll(this);

		App.bind('show:index', this.render);
		App.bind('press:key', this.keyPress);

		log("Backbone : IndexView : Initialized");
	},

	render: function() {
		var indexTemplate = _.template($('#example_backbone_template').html());
		this.el.html(indexTemplate);
	},

	keyPress: function(data){

		var view = this;

		// Mapping only numbers 1-5.
		if ( data.key >= 49 && data.key <= 53 ) {
			if ( !view.started ) {
				view.captureAll();
				return;
			}
			if ( data.key === 53 && view.photosComplete ) {
				view.sendPhotoToServer();
			}
			if ( data.key >= 49 && data.key <= 52 && view.photosComplete ) {
				view.retakePhoto(data.key - 48);
			}
		}
	},

	captureImage: function(whichSlide, cb) {

		var view = this;

		$.ajax({
			url: '/services/capture.php',
			dataType: 'json',
			success: function(data){
				var newImg = $('<img src="'+data.imagePath+'" />'),
					$container = $('#photo' + whichSlide),
					$images = $container.find('img');

				if ( $images.length > 0 ) {
					$images.remove();
				}

				$container.append(newImg);
				if (cb) cb();
			}
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
					var newImg = $('<img src="'+data.imagePath+'" />');
					$('#preview').html(newImg);
				},
				error: function(msg){
					console.log(msg);
				}
			});
		}})
	}
});
