Canvas Photobooth
=============================================================

![The Photobooth](https://dl.dropboxusercontent.com/u/34601809/photobooth.jpg)

This project's goal is to develop an OSX web-based photobooth that accesses the camera via a server-side script, avoiding fragility of Flash camera shims. Overall I want to make something that will just "work" when I load the browser, as I don't want to have to baby it during usage. Secondarily, it saves the compiled filmstrips to a folder of your choosing; I'm using my Dropbox so that they become instantly available the next time my computer gets an Internet connection.

**(10/13/2012):** This worked exactly as we hoped it would during our reception; [check out some of the results on my site](http://www.georgepantazis.com/2012/04/diy-html-photobooth/).

How to use
-------------------------------------------------------------
If you want to try to use this, you'll need the following:

  * An Arduino board to run the buttons (but as mentioned below, you could just hack a keyboard apart instead)
  * MAMP, or some other Apache/PHP setup. I use MAMP Pro.

The styles are fairly specific to the photobooth I built, the display case of which is shown above. You'd probably want to restyle it a bit to fit your needs.

![UI Screenshot](https://dl.dropboxusercontent.com/u/34601809/photobooth-demo.jpg)

Current Status
-------------------------------------------------------------

  * Using the isightcapture script to access and save a photo from an OSX webcam (attached to the system functioning as the server).
  * Takes 4 pics, loads them into the DOM, then composites them together using [HTML2Canvas](https://github.com/niklasvh/html2canvas). Composite is saved to the folder defined in `services/config.php`.
  * Saves the photos to a defined directory on your system - I'm using a public dropbox folder.


TODO
-------------------------------------------------------------

  * Figure out how to execute the bash script from PHP without sudoing.
  * Ideally I'd like to convert this app to work with NodeJS, and create a secondary viewer app that hooks into the Dropbox API, with Heroku procfiles ready to go. So all I'd need to do would be `node photobooth.js` locally, and push the viewer to a fresh Heroku instance. Badabing badaboom.


Notes
-------------------------------------------------------------

  * Using isightcapture, which seems like abandonware but works beautifully. Found the .dmg here: http://deography.com/record/
    * After resuscitating this project, I've noticed that isightcapture is slightly fragile in Lion. I've put in front-end checks to make sure the file is real, but this could also be done on the `capture.php` file, or possibly using the [Devices API](http://www.w3.org/TR/dap-api-reqs/), which I haven't had time to dig into yet.
  * The HTML layer will be listening for keypresses (numbers keys 1-5) I'll be interfacing with the buttons via an Arduino/Python serial connection. This is overkill just for buttons (You could just as easily take apart a keyboard and solder onto the keys you need) but [A] I want a little flexibility if I decide to add LEDs and such and [B] I wanted an excuse to play with Arduino and Python.
