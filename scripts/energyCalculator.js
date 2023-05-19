var weightCalculator = {
    setup : function() {
        if (localStorage.weight != undefined) {
            document.getElementById("weight").value = localStorage.weight;
            this.calculate(parseFloat(localStorage.weight), false);
        }
    },
    calculate : function(valueInPounds, Interfere) {
        document.getElementById('out1').innerHTML = (Math.round((parseInt(valueInPounds)*0.4535924)*100)/100).toString();
        localStorage.weight = valueInPounds;
        potentialCalculator.predefineMass(document.getElementById('out1').innerHTML, Interfere);
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

weightCalculator.setup();
potentialCalculator.setup();
finalVelocityCalculator.setup();
