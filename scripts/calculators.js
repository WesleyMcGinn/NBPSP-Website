// Version 3

var weightCalculator = {
    setup : function() {
        if (localStorage.weight != undefined) {
            document.getElementById("weight").value = localStorage.weight;
            this.calculate(parseFloat(localStorage.weight), false);
        }
    },
    calculate : function(valueInPounds, Calculate) {
        document.getElementById('out1').innerHTML = (Math.round((parseInt(valueInPounds)*0.4535924)*100)/100).toString();
        localStorage.weight = valueInPounds;
        if (document.title == "NBPSP - Potential to Kinetic Energy") {
            potentialCalculator.predefineMass(document.getElementById('out1').innerHTML, Calculate);
        } else if (document.title == "NBPSP - Momentum") {
            momentumCalculator.predefineMass(document.getElementById('out1').innerHTML, Calculate);
        } else if (document.title == "NBPSP - Force Normal") {
            normal0Calculator.predefineMass(document.getElementById('out1').innerHTML, Calculate);
            normalCalculator.predefineMass(document.getElementById('out1').innerHTML, Calculate);
        }
    }
}

var potentialCalculator = {
    predefineMass : function(massInKilograms, Calculate) {
        document.getElementById("mass").value = massInKilograms;
        if (Calculate) {
            this.calculate();
        }
    },
    setup : function() {
        if (localStorage.height != undefined) {
            document.getElementById("height").value = localStorage.height;
        }
        if (localStorage.heightUnits != undefined) {
            document.getElementById("height_units").value = localStorage.heightUnits;
        }
        this.calculate();
    },
    calculate : function() {
        var heightInMeters = document.getElementById("height").value;
        if (document.getElementById("height_units").value == "ft") {
            heightInMeters *= 0.3048;
        } if (document.getElementById("height_units").value == "in") {
            heightInMeters *= 0.0254;
        } if (document.getElementById("height_units").value == "cm") {
            heightInMeters *= 0.01;
        } if (document.getElementById("height_units").value == "mm") {
            heightInMeters *= 0.001;
        } if (document.getElementById("height_units").value == "km") {
            heightInMeters *= 1000;
        } if (document.getElementById("height_units").value == "mi") {
            heightInMeters *= 1609.344;
        }
        document.getElementById('out2').innerHTML = (Math.round((parseFloat(document.getElementById("mass").value)*parseFloat(document.getElementById("gForce").value)*parseFloat(heightInMeters))*100)/100).toString();
        localStorage.heightUnits = document.getElementById("height_units").value;
        localStorage.height = document.getElementById("height").value;
        finalVelocityCalculator.setup();
    }
}

var finalVelocityCalculator = {
    setup : function() {
        document.getElementById("KE").value = document.getElementById('out2').innerHTML;
        document.getElementById("Mass").value = document.getElementById("mass").value;
        this.calculate();
    },
    calculate : function() {
        document.getElementById('out3').innerHTML = (Math.round((Math.sqrt(2*parseFloat(document.getElementById("KE").value)/parseFloat(document.getElementById("Mass").value)))*100)/100).toString()+" <abbr title='Meters per second'>m/s</abbr>"
    }
}

var momentumCalculator = {
    predefineMass : function(massInKilograms, Calculate) {
        document.getElementById("momentum_mass").value = massInKilograms;
        if (Calculate) {
            this.calculate();
        }
    },
    setup : function() {
        if (localStorage.velocity != undefined) {
            document.getElementById("momentum_velocity").value = localStorage.velocity;
        }
        this.calculate();
    },
    calculate : function() {
        localStorage.velocity = document.getElementById("momentum_velocity").value;
        document.getElementById('momentum_out').innerHTML = (Math.round(parseFloat(document.getElementById("momentum_mass").value)*parseFloat(document.getElementById("momentum_velocity").value)*100)/100).toString();
    }
}

var centripetalCalculator = {
    setup : function() {
        if (localStorage.velocity != undefined) {
            document.getElementById("centripetal_velocity").value = localStorage.velocity;
        }
        if (localStorage.radius != undefined) {
            document.getElementById("centripetal_radius").value = localStorage.radius;
        }
        this.calculate();
    },
    calculate : function() {
        localStorage.velocity = document.getElementById("centripetal_velocity").value;
        localStorage.radius = document.getElementById("centripetal_radius").value;
        document.getElementById('centripetal_out').innerHTML = (Math.round(100*Math.pow(parseFloat(document.getElementById("centripetal_velocity").value),2)/parseFloat(document.getElementById("centripetal_radius").value))/100).toString()+' <abbr title="Meters per second per second">m/s<sup>2</sup></abbr>';
    }
}

var normal0Calculator = {
    setup : function() {
        this.calculate();
    },
    predefineMass : function(M, Calculate) {
        document.getElementById("normal0_mass").value = M.toString();
        if (Calculate) {
            this.calculate();
        }
    },
    calculate : function() {
        document.getElementById("normal0_out").innerHTML = (Math.round(100*parseFloat(document.getElementById("normal0_gravity").value)*parseFloat(document.getElementById("normal0_mass").value))/100).toString()+' <abbr title="Newtons">N</abbr>';
    }
}

var normalCalculator = {
    setup : function() {
        this.calculate();
        window.addEventListener("deviceorientation", function(event) {
            document.getElementById("normal_theta").value = (Math.round(event.beta*10)/10).toString();
        }, true);
    },
    predefineMass : function(M, Calculate) {
        document.getElementById("normal_mass").value = M.toString();
        if (Calculate) {
            this.calculate();
        }
    },
    calculate : function() {
        document.getElementById("normal_out").innerHTML = (Math.round(100*parseFloat(document.getElementById("normal_gravity").value)*parseFloat(document.getElementById("normal_mass").value)*Math.cos((Math.PI/180)*(parseFloat(document.getElementById("normal_theta").value))))/100).toString()+' <abbr title="Newtons">N</abbr>';
    }
}

