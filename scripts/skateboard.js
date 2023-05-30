// NBPSP Screen Skateboard
// Version 1

var skateboard = {
    HTMLdata : '<svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" width="380" height="58"> <g> <line fill="none" stroke="#7f7f7f" stroke-width="10" x1="68.5" x2="79.5" y1="21" y2="42"/> <line fill="none" stroke="#7f7f7f" stroke-width="12" x1="94.5" x2="77.5" y1="17" y2="43"/> <line fill="none" stroke="#7f7f7f" stroke-width="12" x1="286.5" x2="300.5" y1="19" y2="43"/> <line fill="none" stroke="#7f7f7f" stroke-width="10" x1="309.5" x2="302.5" y1="22" y2="41"/> <circle cx="80" cy="46" fill="#0000bf" r="8" stroke="#ffb200" stroke-width="8"/> <circle cx="300" cy="46" fill="#0000bf" r="8" stroke="#ffb200" stroke-width="8"/> <rect fill="#000000" height="6" stroke="#0000ff" stroke-width="0" width="42" x="280" y="21"/> <rect fill="#000000" height="6" stroke-width="0" width="42" x="58" y="21"/> <path d="M2.5,5L70,19L98,16L287,16L312,20L377,5" fill-opacity="0" stroke="#0000ff" stroke-width="10"/> </g></svg>',
    CSSdata : 'position:fixed;bottom-margin:0px;bottom:-5px;left:-1000px;padding:0px;',
    interval : null,
    run : function() {
        this.skateboard = document.createElement("div");
        this.skateboard.style = this.CSSdata;
        this.skateboard.id = "skateboard_" + Math.random().toString();
        this.skateboard.innerHTML = this.HTMLdata;
        document.documentElement.appendChild(this.skateboard);
        this.interval = window.setInterval(function() {
            if (!skateboard.frozen) {
                skateboard.x += skateboard.speed;
            } else {
                skateboard.x = 0;
            }
            skateboard.skateboard.style.left = skateboard.x.toString()+"px";
            if (skateboard.x > 12000 || skateboard.x < -380) { skateboard.x = -380; }
        },16);//62.5FPS
    },
    frozen : false,
    x : -380,
    speed : 12,
    hide : function() {
        this.skateboard.style.display = "none";
    },
    show : function() {
        this.skateboard.style.display = '';
    }
}

var makeSkateboard = window.setInterval(function() {
    if (document.readyState == 'complete') {
        skateboard.run();
        window.clearInterval(makeSkateboard);
    }
},2000);
