<?php

	include("config.php");

	$imgPath = "../images/" . time() . ".png";

	// Use isightcapture bin to init the capture.
	// Use an un-versioned config file to temporarily supply un/pass.
	$command = 'sudo -u ' . $username . ' -p ' . $password . ' isightcapture -t png ' . $imgPath;
	exec($command." 2>&1", $test);
	
	// echo out a string once capture is complete.
	echo "<img src='/" . $imgPath . "' />";

?>