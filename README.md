Canvas Photobooth
=============================================================
This project's goal is to develop an OSX web-based photobooth that accesses the camera via a server-side script, avoiding fragility of Flash camera shims. Overall I want to make something that will just "work" when I load the browser, as I don't want to have to baby it during usage.


Current Status
-------------------------------------------------------------

  * Using the isightcapture script to access and save a photo from an OSX webcam (attached to the system functioning as the server).
  * Takes 4 pics, loads them into the DOM, then composites them together using HTML2Canvas. Composite is saved back to the server to await transfer.


TODO
-------------------------------------------------------------

  * Save composite photo to Flickr account.
  * Style interface, work out UI flow.
  * Figure out how to execute the bash script from PHP without sudoing.


Notes
-------------------------------------------------------------

  * Using isightcapture, which seems like abandonware but works beautifully. Found the .dmg here: http://deography.com/record/
  * The HTML layer will be listening for keypresses (numbers keys 1-5) I'll be interfacing with the buttons via an Arduino/Python serial connection. This is overkill just for buttons (You could just as easily take apart a keyboard and solder onto the keys you need) but [A] I want a little flexibility if I decide to add LEDs and such and [B] I wanted an excuse to play with Arduino and Python.
