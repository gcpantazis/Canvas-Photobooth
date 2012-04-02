<?php

	// Based on work found at:
	// http://j-query.blogspot.com/2011/02/save-base64-encoded-canvas-image-to-png.html

	// Awesome email script found here:
	// http://www.finalwebsites.com/forums/topic/php-e-mail-attachment-script

	include("config.php");

	header('Content-type: application/json');
	chdir('../images');

	$img = $_POST['img'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$data = base64_decode($img);

	$file = "composite_" . time() . ".png";
	$success = file_put_contents($file, $data);

	if ( $success ) {

		function mail_attachment($filename, $path, $mailto, $from_mail, $from_name, $replyto, $subject, $message) {
			$file = $path.$filename;
			$file_size = filesize($file);
			$handle = fopen($file, "r");
			$content = fread($handle, $file_size);
			fclose($handle);
			$content = chunk_split(base64_encode($content));
			$uid = md5(uniqid(time()));
			$name = basename($file);
			$header = "From: ".$from_name." <".$from_mail.">\r\n";
			$header .= "Reply-To: ".$replyto."\r\n";
			$header .= "MIME-Version: 1.0\r\n";
			$header .= "Content-Type: multipart/mixed; boundary=\"".$uid."\"\r\n\r\n";
			$header .= "This is a multi-part message in MIME format.\r\n";
			$header .= "--".$uid."\r\n";
			$header .= "Content-type:text/plain; charset=iso-8859-1\r\n";
			$header .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
			$header .= $message."\r\n\r\n";
			$header .= "--".$uid."\r\n";
			$header .= "Content-Type: application/octet-stream; name=\"".$filename."\"\r\n"; // use different content types here
			$header .= "Content-Transfer-Encoding: base64\r\n";
			$header .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n";
			$header .= $content."\r\n\r\n";
			$header .= "--".$uid."--";

			mail($mailto, $subject, "", $header);
		}

		$my_file = $file;
		$my_path = "../images/";
		$my_name = "John Doe";
		$my_mail = "photobooth@someemail.com";
		$my_replyto = "photobooth@someemail.com";
		$my_subject = "Photobooth - SUCCESS!";
		$my_message = "This is a picture taken by the photobooth. Wahoo!";
		mail_attachment($my_file, $my_path, $flickrSendEmailAddress, $my_mail, $my_name, $my_replyto, $my_subject, $my_message);

		echo json_encode(
			array("imagePath" => "http://" . $_SERVER['HTTP_HOST'] . "/images/" . $file)
		);

	} else {
		echo json_encode(
			array("msg" => "Could not save to server.")
		);
	}

?>
