import time
import serial
import os

ser = serial.Serial('/dev/tty.usbmodemfd131', 9600)

while 1:

	try:  
		print ser.readline()
	except:  
		print "Failed to send!"  


	# cmd = """
	# osascript -e 'tell application "System Events" to keystroke "m"' 
	# """
	# os.system(cmd)
	time.sleep(0.1)
    