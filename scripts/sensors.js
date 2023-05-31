// Version 4

function setVal(ElementID, Val) {
    document.getElementById(ElementID).innerHTML = Val.toString();
}

// Gyroscope Data:
window.addEventListener("deviceorientation", function(event) {
    setVal("gx", Math.round(event.alpha*100)/100);
    setVal("gy", Math.round(event.beta*100)/100);
    setVal("gz", Math.round(event.gamma*100)/100);
}, true);
window.setTimeout(function() {
    setVal("gx", "<i class='red'>No Alpha Gyroscope</i>");
    setVal("gy", "<i class='red'>No Beta Gyroscope</i>");
    setVal("gz", "<i class='red'>No Gamma Gyroscope</i>");
}, 2000);

// Accelerometer Data:
const accel = new Accelerometer({frequency:60});
accel.onreading = function() {
    setVal("ax", Math.round(accel.x*100)/100);
    setVal("ay", Math.round(accel.y*100)/100);
    setVal("az", Math.round(accel.z*100)/100);
}
accel.onactivate = function(event) {
    if (event.isTrusted) {
        window.setTimeout(function() {
            if (!accel.hasReading) {
                setVal("ax", "<i class='red'>No X-accelerometer</i>");
                setVal("ay", "<i class='red'>No Y-accelerometer</i>");
                setVal("az", "<i class='red'>No Z-accelerometer</i>");
            }
        }, 2000);
    }
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
        var gradient = ("linear-gradient(90deg," + ("#0f0,").repeat(Math.round(battery.level*50)) + ("white,").repeat(Math.round(50-battery.level*50)));
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
