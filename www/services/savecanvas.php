<?php

	include("config.php");

	header('Content-type: application/json');
	chdir($compositeStorage);

	$img = $_POST['img'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$data = base64_decode($img);

	$file = "composite_" . time() . ".png";
	$success = file_put_contents($file, $data);

	if ( $success ) {

		echo json_encode(
			array("success" => true)
		);

	} else {
		echo json_encode(
			array("msg" => "Could not save to server.")
		);
	}

?>
