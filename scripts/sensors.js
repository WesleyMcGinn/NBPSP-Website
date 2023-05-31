// Version 3

function setVal(ElementID, Val) {
    document.getElementById(ElementID).innerHTML = Val.toString();
}

// Gyroscope Data:
window.addEventListener("deviceorientation", function(event) {
    setVal("gx", Math.round(event.alpha*100)/100);
    setVal("gy", Math.round(event.beta*100)/100);
    setVal("gz", Math.round(event.gamma*100)/100);
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

// Battery:
window.setInterval(function() {
    navigator.getBattery().then((battery)=>{
        setVal("battery", Math.round(battery.level*100).toString()+"%");
        var gradient = ("linear-gradient(90deg," + ("springgreen,").repeat(Math.round(battery.level*25)) + ("white,").repeat(Math.round(25-battery.level*25)));
        document.getElementById("battery").style.backgroundImage = gradient.slice(0,gradient.length-1)+")";
        if (battery.charging) {
            document.getElementById("battery_charge").style.backgroundColor = "rgb("+Math.round(battery.level*-255+255).toString()+",255,"+Math.round(battery.level*-255+255).toString()+")";
            if (battery.chargingTime.toString() == Infinity) {
                setVal("battery_charge","Charging<br>");
            } else {
                setVal("battery_charge","Charging<br>(≈"+Math.round(battery.chargingTime/60).toString()+" min until full)");
            }
        } else {
            document.getElementById("battery_charge").style.backgroundColor = "rgb(255,"+Math.round(battery.level*255).toString()+","+Math.round(battery.level*255).toString()+")";
            if (battery.dischargingTime.toString() == Infinity) {
                setVal("battery_charge","Running on Battery<br>");
            } else {
                setVal("battery_charge","Running on Battery<br>(≈"+Math.round(battery.dischargingTime/60).toString()+" min remaining)");
            }
        }
    });
}, 1000);
