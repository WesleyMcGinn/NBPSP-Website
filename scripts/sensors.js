function setVal(ElementID, Val) {
    document.getElementById(ElementID).innerHTML = Val.toString();
}

window.addEventListener("deviceorientation", function(event) {
    setVal("gx", event.alpha);
    setVal("gy", event.beta);
    setVal("gz", event.gamma);
    setVal("accel", JSON.stringify(event.acceleration));
    setVal("ax", event.acceleration.x);
    setVal("ay", event.acceleration.y);
    setVal("az", event.acceleration.z);
}, true);

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
