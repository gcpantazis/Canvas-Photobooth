<?php

	include("config.php");
	include("flickroauth.php");

	$class = 'Flickr';
	$flickr = new $class('ef52c9748b4bc230df3f33b91023dd2a', '799fa1198ecf8583');

/*
	# sample usage

	$rsp = $flickr->call_method('flickr.photos.search', array(
				'auth_token' => $auth_token,
				'user_id' => 'me',
				'has_geo' => 1,
				'tags' => 'cameraphone',
				'min_taken_date' => $ago,
				'extras' => 'machine_tags,geo',
		));

		foreach($rsp['photos']['photo'] as $photo) {
		....
	}

*/

$rsp = $flickr->call_method('flickr.auth.getFrob');
$frob = $rsp["frob"]["_content"];

$rsp = $flickr->call_method('flickr.blogs.getList', array(
));

// flickr.auth.getToken
// flickr.auth.getFrob

// $rsp = $flickr->call_method('flickr.auth.getFrob', array());

print_r($rsp);

?>
