//Timer
var Clock = {
    totalSeconds: 0,
    TotalMinutes: 0,

    start: function () {
        var self = this;

        this.interval = setInterval(function () {
            self.totalSeconds += 1;
            document.getElementById('lPlayTime').innerHTML = 'Play Time: ' + (self.TotalMinutes) + ':' + (self.totalSeconds % 60);
            self.TotalMinutes = Math.floor(self.totalSeconds / 60);
        }, 1000);
    },

    pause: function () {
        clearInterval(this.interval);
        delete this.interval;
    },

    resume: function () {
        if (!this.interval) this.start();
    }
};


function setupEvents(thePlayer)
{
    //Register for events after intialization not in Ready function to ensure all event are captured
    thePlayer.addEventListener(amp.eventName.volumechange, _ampEventHandler);
    thePlayer.addEventListener(amp.eventName.ended, _ampEventHandler);
    thePlayer.addEventListener(amp.eventName.timeupdate, _ampEventHandler);

    thePlayer.addEventListener(amp.eventName.pause, _ampEventHandler);
    thePlayer.addEventListener(amp.eventName.play, _ampEventHandler);
    thePlayer.addEventListener(amp.eventName.playing, _ampEventHandler);
    thePlayer.addEventListener(amp.eventName.seeking, _ampEventHandler);
    thePlayer.addEventListener(amp.eventName.seeked, _ampEventHandler);

    thePlayer.addEventListener(amp.eventName.loadstart, _ampEventHandler);
    thePlayer.addEventListener(amp.eventName.loadedmetadata, _ampEventHandler);
    thePlayer.addEventListener(amp.eventName.loadeddata, _ampEventHandler);
    thePlayer.addEventListener(amp.eventName.fullscreenchange, _ampEventHandler);

    thePlayer.addEventListener(amp.eventName.waiting, _ampEventHandler);
    thePlayer.addEventListener(amp.eventName.canplaythrough, _ampEventHandler);
    thePlayer.addEventListener(amp.eventName.error, _ampEventHandler);
}

function _ampEventHandler(evt) {

    var txtLog = document.getElementById("txtLog");

    switch (evt.type) {
        case "timeupdate":
            //nothing
            break;
        case "pause":
            Clock.pause();
            txtLog.innerHTML += "amp: " + evt.type + "\n";
            ga('send', 'event', 'player', evt.type, videoManifest);
            break;
        case "ended":
            Clock.pause();
            txtLog.innerHTML += "amp: " + evt.type + "\n";
            ga('send', 'event', 'player', evt.type, videoManifest);
            break;
        case amp.eventName.error:
            ga('send', 'exception', {
                'exDescription': errorInfo(myPlayer.error()),
                'exFatal': false
            });
            txtLog.innerHTML += "amp: " + errorInfo(myPlayer.error()) + "\n";
            //Stop seen Video
            Clock.pause();
            break;
        case amp.eventName.playing:

            if (Clock.totalSeconds == 0) {
                Clock.start();
                txtLog.innerHTML += "amp: Sart playing" + new Date() + "\n";
            } else {
                //Resume Close
                Clock.resume();
            }
            txtLog.innerHTML += "amp: " + evt.type + "\n";
            ga('send', 'event', 'player', evt.type, videoManifest);
            break;
        default:
            ga('send', 'event', 'player', evt.type, videoManifest);
            txtLog.innerHTML += "amp: " + evt.type + "\n";
    }


}

function errorInfo(err) {

    var errMsg = highlevelError(err.code);
    errMsg += " code: " + err.code.toString(16);

    if (err.message) {
        errMsg += " msg: " + err.message;
    }

    return errMsg;
}

function highlevelError(errorCode) {
    var errorDesc;
    var uiCodeMask = 0xff00000;
    var uiCode = (errorCode & uiCodeMask) >> 20;
    switch (uiCode) {
        case 0:
            errorDesc = "MEDIA_ERR_CUSTOM"
            break;
        case 1:
            errorDesc = "MEDIA_ERR_ABORTED";
            break;
        case 2:
            errorDesc = "MEDIA_ERR_NETWORK";
            break;
        case 3:
            errorDesc = "MEDIA_ERR_DECODE";
            break;
        case 4:
            errorDesc = "MEDIA_ERR_SRC_NOT_SUPPORTED";
            break;
        case 5:
            errorDesc = "MEDIA_ERR_ENCRYPTED";
            break;
        case 6:
            errorDesc = "SRC_PLAYER_MISMATCH";
            break;
        default:
            errorDesc = "MEDIA_ERR_UNKNOWN";
    }

    return errorDesc;
}
//idempotency control Switch
var swonbeforeunload = true;
//Event of End of watch
function goodbye() {
    if (swonbeforeunload) {
        swonbeforeunload = false;
        //Out Event
        ga('send', 'event', 'page', 'onbeforeunload', videoManifest);

        if (Clock.totalSeconds > 0) {

            var minutes = Math.floor(Clock.totalSeconds / 60 % 60);
            ga('send', 'event', 'playtime', minutes, videoManifest);
        } else {
            ga('send', 'event', 'playtime', 'NO_PLAY', videoManifest);
        }

    }
}

//Windows Events
window.addEventListener("onbeforeunload", goodbye, false);
window.addEventListener("pagehide", goodbye, false);