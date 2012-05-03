<!DOCTYPE html>
<!--[if IE 7 ]><html lang="en" class="ie7"><![endif]-->
<!--[if IE 8 ]><html lang="en" class="ie8"><![endif]-->
<!--[if IE 9 ]><html lang="en" class="ie9"><![endif]-->
<!--[if gt IE 9]><!--><html lang="en"><!--<![endif]-->
	<head>

		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="keywords" content="" />
		<meta name="description" content="" />

		<title>Canvas Photobooth</title>

		<link rel="shortcut icon" href="images/favicon.ico" />

		<link rel="stylesheet" href="stylesheets/reset.css" media="screen" />
		<link rel="stylesheet" href="stylesheets/app/app.css" media="screen" />
		<script>
			document.write('<link rel="stylesheet" href="stylesheets/app/javascript.css" media="screen" />');
		</script>
		<link rel="stylesheet" href="stylesheets/app/print.css" media="print" />

		<?php include("jstemplates.php"); ?>

	</head>
	<body>

		<div id="section_main">
			<div id="section_content"></div>
			<div id="section_nav"></div>
			<div id="section_modal"></div>
		</div>

		<script src="javascripts/lib/LAB-debug.min.js"></script>
		<script>
			$LAB
				// Libraries
				.script('javascripts/lib/jquery-1.7.1.js').wait()
				.script('javascripts/lib/underscore.js').wait()
				.script('javascripts/lib/backbone.js').wait()
				// Plugins
				.script('javascripts/plugins/jquery.easing.1.3.js').wait()
				.script('javascripts/plugins/html2canvas.js').wait()
				.script('javascripts/plugins/jquery.html2canvas.js').wait()
				// Backbone - Controllers
				.script('javascripts/app/controller/AppRouter.js')
				// Backbone - Models
				// Backbone - Views
				.script('javascripts/app/view/PhotostripView.js')
				.script('javascripts/app/view/NavView.js')
				.script('javascripts/app/view/ModalView.js')
				// Site-Specific JS - Global
				.script('javascripts/app/app.utilities.js').wait()
				.script('javascripts/app/app.global.js').wait(function() {
					window.isDebugMode = true;
					App.Global.init();
				});
		</script>
	</body>
</html>
