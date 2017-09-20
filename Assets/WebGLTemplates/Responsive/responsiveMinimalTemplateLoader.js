/**
 * Created by miguelferreira on 02/09/2017.
 */

var gameInstance = null;
var gameContainer = null;
var gameCanvas = null;
var loadingContainer = null;
var loadingText = null;
var runtimeInitialized = false;
var canvasAspectRatio = false;

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


function handleResize() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    console.log("window.innerHeight "+window.innerHeight);

    if(gameCanvas != null) {
        var canvasSize = getCanvasSize();
        gameCanvas.width = canvasSize.width;
        gameCanvas.height = canvasSize.height;
    }

    gameContainer.style.height = windowHeight+"px";
}

document.addEventListener("DOMContentLoaded", function(event) {
    loadingContainer = document.body.querySelector("#loadingContainer");
    gameContainer = document.body.querySelector("#gameContainer");
    loadingText = loadingContainer.querySelector("span");
    window.requestAnimationFrame(updateLoadingText);
    window.addEventListener("resize", handleResize);
    handleResize();
});


function OnRuntimeIntialized() {
    runtimeInitialized = true;
    gameCanvas = gameInstance.container.querySelector("canvas");
    gameCanvas.style.width = null;
    gameCanvas.style.height = null;
    handleResize();
}

function dummyProgressFunction() {

}

function getCanvasSize() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    if(canvasAspectRatio) {
        var aspectWindowHeight = windowWidth / canvasAspectRatio;
        if(aspectWindowHeight > windowHeight) {
            windowWidth = windowHeight * canvasAspectRatio;
        }
        else {
            windowHeight = aspectWindowHeight;
        }
    }

    return {width:windowWidth,height:windowHeight};
}

function instantiateUnity(url,aspectRatio) {

    if(aspectRatio) {
        var aspectRatioComponents = aspectRatio.split(":");
        if(aspectRatioComponents.length != 2) {
            console.exception("Unity: Aspect Ratio tag doesn't follow the expect aspect ratio format A:B e.g. 16:9")
            return;
        }

        canvasAspectRatio = aspectRatioComponents[0]/aspectRatioComponents[1];
    }

    var canvasSize = getCanvasSize();

    gameInstance = UnityLoader.instantiate("gameContainer", url,  {
        width:canvasSize.width,
        height: canvasSize.height,
        margin: 0,
        onProgress: dummyProgressFunction,
        Module: {
            onRuntimeInitialized: OnRuntimeIntialized
        }});
}
