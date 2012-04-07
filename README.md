Canvas Photobooth
=============================================================
This project's goal is to develop an OSX web-based photobooth that accesses the camera via a server-side script, avoiding fragility of Flash camera shims. Overall I want to make something that will just "work" when I load the browser, as I don't want to have to baby it during usage. Secondarily, it sends the photos to a predefined email address, which I use to post to Flickr.

How to use
-------------------------------------------------------------
If you want to try to use this, you'll need the following software / objects.
  * An arduino board to run the buttons (but as mentioned below, you could just hack a keyboard apart instead)
  * MAMP, or some other Apache/PHP setup with postfix support. I just use MAMP Pro.
  * A Flickr account, if you follow it exactly. But it can also forward the photos to any email address.

Current Status
-------------------------------------------------------------

  * Using the isightcapture script to access and save a photo from an OSX webcam (attached to the system functioning as the server).
  * Takes 4 pics, loads them into the DOM, then composites them together using HTML2Canvas. Composite is saved back to the server to await transfer.
  * Emails the photos to Flickr (or wherever) once they're composed.


TODO
-------------------------------------------------------------

  * Style interface, work out UI flow.
  * Figure out how to execute the bash script from PHP without sudoing.


Notes
-------------------------------------------------------------

  * Using isightcapture, which seems like abandonware but works beautifully. Found the .dmg here: http://deography.com/record/
  * The HTML layer will be listening for keypresses (numbers keys 1-5) I'll be interfacing with the buttons via an Arduino/Python serial connection. This is overkill just for buttons (You could just as easily take apart a keyboard and solder onto the keys you need) but [A] I want a little flexibility if I decide to add LEDs and such and [B] I wanted an excuse to play with Arduino and Python.
  * RE: Emailing to Flickr: You could use OAuth and hook up with the API, but the advantage here is that postfix will just queue up the finished photographs if the Internet connection dies / lags out. Then when it picks back up, it'll just send the whole queue to the destination. You could definitely manage failures and the queue in the PHP layer, but passing the responsibility to postfix works great in this setting.
