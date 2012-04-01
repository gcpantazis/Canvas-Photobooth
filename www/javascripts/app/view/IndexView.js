/*
 * IndexView.js
 *
 */

var IndexView = Backbone.View.extend({

	el: $('#section_content'),

	events: {
		'click #capture': 'captureImage',
		'click #send': 'sendPhotoToServer'
	},

	initialize: function(options) {

		_.bindAll(this);

		App.bind('show:index', this.render);

		log("Backbone : IndexView : Initialized");
	},

	render: function() {
		var indexTemplate = _.template($('#example_backbone_template').html());
		this.el.html(indexTemplate);
	},

	captureImage: function() {
		$.ajax({
			url: '/services/capture.php',
			dataType: 'json',
			success: function(data){
				var newImg = $('<img src="'+data.imagePath+'" />');
				$('#photostrip').append(newImg);
			}
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
