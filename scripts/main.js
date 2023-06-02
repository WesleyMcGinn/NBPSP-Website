// MASTER SCRIPT

// Timer
var pageTime = 0;
window.setInterval(function(){
    pageTime++;
}, 1000);

// Visit/Visotor Count
document.head.appendChild((($,s)=>{$.src=s;return $})(document.createElement('script'),"https://kihtrak.com/cloud_variable/cloudify.min.js"));
var cloud_views;
var cloud_userStayedThisLong;
function pageID() {
    var IDinProgress = document.title;
    while (IDinProgress.indexOf(" ") != -1) {
        IDinProgress = IDinProgress.replace(" ","");
    } while (IDinProgress.indexOf("-") != -1) {
        IDinProgress = IDinProgress.replace("-","");
    } while (IDinProgress.indexOf("_") != -1) {
        IDinProgress = IDinProgress.replace("_","");
    } while (IDinProgress.indexOf("?") != -1) {
        IDinProgress = IDinProgress.replace("?","");
    }
    return IDinProgress;
}
window.setTimeout(function() {
    if (cloud_views == undefined) {
        cloud_views = { total: 0, people: 0 };
    }
    cloud_views.total++;
    if (localStorage.been != 'true') {
        localStorage.been = true;
        cloud_views.people++;
    }
    eval("if (cloud_views."+pageID()+"==undefined) { cloud_views."+pageID()+"=0; } cloud_views."+pageID()+"++;");
    console.log("This page has been viewed " + JSON.stringify(eval("cloud_views."+pageID())) + " times.");
}, 2000);


function setup() {}

function teardown() {}
