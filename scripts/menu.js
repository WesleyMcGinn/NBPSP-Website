function setup() {
    
}

function ham() {
    if (document.getElementsByClassName("ham")[0].style.display == "none") {
        for (i=0; i<document.getElementsByClassName("ham").length; i++) {
            document.getElementsByClassName("ham")[i].style.display = "block";
        }
    } else {
        for (i=0; i<document.getElementsByClassName("ham").length; i++) {
            document.getElementsByClassName("ham")[i].style.display = "none";
        }
    }
}

function resize() {
    if (window.innerWidth <= 870) {
        for (i=0; i<document.getElementsByClassName("ham").length; i++) {
            document.getElementsByClassName("ham")[i].style.display = "none";
        }
    } else {
        for (i=0; i<document.getElementsByClassName("ham").length; i++) {
            document.getElementsByClassName("ham")[i].style.display = "block";
        }
    }
}

function unselectHam() {
    if (document.getElementsByClassName("ham")[0].style.display != "none") {
        if (window.innerWidth <= 870) {
            for (i=0; i<document.getElementsByClassName("ham").length; i++) {
                document.getElementsByClassName("ham")[i].style.display = "none";
            }
        }
    }
}

