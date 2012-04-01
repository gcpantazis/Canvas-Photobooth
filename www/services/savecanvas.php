<?php

	// Based on work found at:
	// http://j-query.blogspot.com/2011/02/save-base64-encoded-canvas-image-to-png.html

	header('Content-type: application/json');
	chdir('../images');

	$img = $_POST['img'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$data = base64_decode($img);

	$file = "composite_" . time() . ".png";
	$success = file_put_contents($file, $data);

	if ( $success ) {
		echo json_encode(
			array("imagePath" => "http://" . $_SERVER['HTTP_HOST'] . "/images/" . $file)
		);
	} else {
		echo json_encode(
			array("msg" => "Could not save to server.")
		);
	}

?>
