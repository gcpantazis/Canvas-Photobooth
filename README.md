Canvas Photobooth
=============================================================
This project's goal is to develop an OSX web-based photobooth that accesses the camera via a server-side script, avoiding fragility of Flash camera shims. Overall I want to make something that will just "work" when I load the browser, as I don't want to have to baby it during usage.


Current Status
-------------------------------------------------------------
Using the isightcapture script to access and save a photo from an OSX webcam (attached to the system functioning as the server).


Current Status
-------------------------------------------------------------
Get the source.

  * Create a canvas view to take 3-4 snapshots, stitch them together, then save the composition back to the server. If internet connection is available, each saved strip will then be posted to a predefined Flickr account.
  * Figure out how to execute bash script from PHP without sudoing.


Notes
-------------------------------------------------------------

  * Using isightcapture, which seems like abandonware but works beautifully. Found the .dmg here: http://deography.com/record/
  * The HTML layer will be listening for keypresses (numbers keys 1-5) I'll be interfacing with the buttons via an Arduino/Python serial connection. This is overkill just for buttons (You could just as easily take apart a keyboard and solder onto the keys you need) but [A] I want a little flexibility if I decide to add LEDs and such and [B] I wanted an excuse to play with Arduino and Python.