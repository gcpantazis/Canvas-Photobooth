<?php

	$imgPath = "images/" . time() . ".jpg";

	//Use isightcapture bin to init the capture.
	$command = 'sudo isightcapture ' . $imgPath;
	exec($command." 2>&1");
	
	// echo out a string once capture is complete.
	echo "<img src='" . $imgPath . "' />";

?>