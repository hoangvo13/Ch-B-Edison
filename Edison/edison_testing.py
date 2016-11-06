import time, sys, signal, atexit, requests

import pyupm_groveehr as upmGroveehr

alertAPI = 'http://192.168.1.3:3000/api/alert'

# Instantiate a Grove Ear-clip Heart Rate sensor on digital pin D2

myHeartRateSensor = upmGroveehr.GroveEHR(0)

## Exit handlers ##

# This stops python from printing a stacktrace when you hit control-C

def SIGINTHandler(signum, frame):
    raise SystemExit

 

# This lets you run code on exit,

# including functions from myHeartRateSensor

def exitHandler():

    myHeartRateSensor.stopBeatCounter()

    print "Exiting"

    sys.exit(0)

# Make API call to generate alert
def generateAlert(fr):
    status = 'Emergency'
    if fr >= 80 and fr <= 100:
        status = 'Healthy'
    elif fr <= 60 or fr >=120:
        status = 'In Danger'
    
    if status == 'Emergency' or status == 'In Danger':
        alert = requests.post(alertAPI, data = {'name': 'Coc Map', 'status': status, 'rate': fr})
    

# Register exit handlers

atexit.register(exitHandler)

signal.signal(signal.SIGINT, SIGINTHandler)


# set the beat counter to 0, init the clock and start counting beats

myHeartRateSensor.clearBeatCounter()

myHeartRateSensor.initClock()

myHeartRateSensor.startBeatCounter()

 

while(1):

    # we grab these (millis and flowCount) just for display

    # purposes in this example

    millis = myHeartRateSensor.getMillis()

    beats = myHeartRateSensor.beatCounter()

 

    # heartRate() requires that at least 5 seconds pass before

    # returning anything other than 0

    fr = myHeartRateSensor.heartRate()

    # output milliseconds passed, beat count, and computed heart rate

    outputStr = "Millis: {0} Beats: {1} Heart Rate: {2}".format(millis, beats, fr)

    generateAlert(fr)

    print outputStr

    time.sleep(3)