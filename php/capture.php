<?php

	//Use isightcapture bin to init the capture.
	$command = 'sudo isightcapture images/test.jpg';
	exec($command." 2>&1");
	
	// echo out a string once capture is complete.
	echo 123;

?>