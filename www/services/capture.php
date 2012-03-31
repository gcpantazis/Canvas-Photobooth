<?php

	include("config.php");

	header('Content-type: application/json');
	chdir('../images');

	$imgPath = time() . ".png";

	// Use isightcapture bin to init the capture.
	// Use an un-versioned config file to temporarily supply un/pass.
	$command = 'sudo -u ' . $username . ' -p ' . $password . ' isightcapture -t png ' . $imgPath;
	exec($command." 2>&1", $test);

	// echo json once capture is complete.
	echo json_encode(
		array("imagePath" => "http://" . $_SERVER['HTTP_HOST'] . "/images/" . $imgPath)
	);

?>
