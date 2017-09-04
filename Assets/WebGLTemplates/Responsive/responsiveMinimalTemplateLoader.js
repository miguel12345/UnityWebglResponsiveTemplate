/**
 * Created by miguelferreira on 02/09/2017.
 */

var gameInstance = null;
var gameCanvas = null;
var loadingContainer = null;
var loadingText = null;
var runtimeInitialized = false;

function updateLoadingText(timestamp) {

    if(runtimeInitialized) {
        loadingContainer.style.display="none";
        return;
    }

    var timestampSeconds = timestamp / 1000;
    var numberOfLoadingDots = (timestampSeconds % 4);
    var dotsText = "";
    for(var i= 0; i < numberOfLoadingDots; i++) {
        dotsText = dotsText + ".";
    }
    loadingText.textContent = "Loading"+dotsText;
    window.requestAnimationFrame(updateLoadingText);
}

document.addEventListener("DOMContentLoaded", function(event) {
    loadingContainer = document.body.querySelector("#loadingContainer");
    loadingText = loadingContainer.querySelector("span");
    window.requestAnimationFrame(updateLoadingText);
});

function handleResize() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    gameCanvas.width = windowWidth;
    gameCanvas.height = windowHeight;
}

function OnRuntimeIntialized() {
    runtimeInitialized = true;
    gameCanvas = gameInstance.container.querySelector("canvas");
    window.addEventListener("resize", handleResize);
    handleResize();
}

function instantiateUnity(url) {

    var windowWidth = window.innerWidth-2; // -2 accounts for the border
    var windowHeight = window.innerHeight-2;

    gameInstance = UnityLoader.instantiate("gameContainer", url,  {
        width:windowWidth,
        height: windowHeight,
        Module: {
            onRuntimeInitialized: OnRuntimeIntialized
        }});
}
