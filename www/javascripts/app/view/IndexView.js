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

		this.captures = 0;

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
			if ( view.captures === 0 ) {
				view.captureAll();
				return;
			}
		}
	},

	captureImage: function(whichSlide, cb) {

		var view = this;

		$.ajax({
			url: '/services/capture.php',
			dataType: 'json',
			success: function(data){
				view.captures++;
				var newImg = $('<img src="'+data.imagePath+'" />');
				$('#photo' + whichSlide).append(newImg);
				cb();
			}
		});
	},

	captureAll: function() {

		var view = this;

		// This seems dirty, but the service callback takes forever to execute.
		view.captureImage(1, function(){
			view.captureImage(2, function(){
				view.captureImage(3, function(){
					view.captureImage(4);
				});
			});
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
					$('#photostrip').append(newImg);
				},
				error: function(msg){
					console.log(msg);
				}
			});
		}})
	}
});
