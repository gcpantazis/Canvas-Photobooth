
# This script reads an analog value (0-1023) from the attached arduino via pyserial.
# The value is matched to the corresponding button, which triggers the matching keystroke.

import time
import serial
import os

ser = serial.Serial('/dev/tty.usbmodemfd131', 9600)
currentbtn = "BTNUP"
lastbtn = currentbtn

while 1:

	inputval = ser.readline()
	try:
		inputval = float(ser.readline())
	except:
		inputval = inputval

	try:
		if inputval > 165 and inputval < 175:
			currentbtn = "5"
		elif inputval > 195 and inputval < 205:
			currentbtn = "4"
		elif inputval > 245 and inputval < 255:
			currentbtn = "3"
		elif inputval > 325 and inputval < 335:
			currentbtn = "2"
		elif inputval > 480 and inputval < 495:
			currentbtn = "1"
		else:
			currentbtn = "BTNUP"
	except:
		print "Failed to send!"

	if lastbtn != currentbtn:
		lastbtn = currentbtn
		if currentbtn != "BTNUP":

			# If the current button is one of the desired values (1-5), execute applescript
			# to trigger that keystroke.

			cmd = '''osascript -e 'tell application "System Events" to keystroke "'''
			cmd += currentbtn
			cmd += '''"' '''

			os.system(cmd)

	time.sleep(0.03)

