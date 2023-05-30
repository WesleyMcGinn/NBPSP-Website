// Version 2

function setVal(ElementID, Val) {
    document.getElementById(ElementID).innerHTML = Val.toString();
}

// Gyroscope Data:
window.addEventListener("deviceorientation", function(event) {
    setVal("gx", event.alpha);
    setVal("gy", event.beta);
    setVal("gz", event.gamma);
}, true);

// Accelerometer Data:
const accel = new Accelerometer({frequency:20});
accel.onreading = function() {
    setVal("ax", accel.x);
    setVal("ay", accel.y);
    setVal("az", accel.z);
}
accel.start();

// Vibrator:
var vibe = {
    len : function(Duration) {
        navigator.vibrate(Duration);
    },
    blink : function() {
        this.interval = window.setInterval(function() {
            navigator.vibrate(500);
        }, 800);
    },
    stopBlink : function() {
        window.clearInterval(this.interval);
    }
}

window.setInterval(function() {
    navigator.getBattery().then((battery)=>{setVal("battery", Math.round(battery.level*100).toString()+"%")});
}, 1000);
