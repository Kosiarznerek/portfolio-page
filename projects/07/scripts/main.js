//DEBUGGING STUFF
window.DEBUGGING = {
    bulletsCollision: undefined,
    planeCollision: undefined,
}
function debuggingStuff() {
    DEBUGGING.bulletsCollision = document.getElementById("bulletColliionDetection").checked;
    DEBUGGING.planeCollision = document.getElementById("planeColliionDetection").checked;
    document.getElementById("bulletColliionDetection").onchange = function () {
        DEBUGGING.bulletsCollision = this.checked;
    }
    document.getElementById("planeColliionDetection").onchange = function () {
        DEBUGGING.planeCollision = this.checked;
    }
}

//MAIN STUFF
window.canvas;
window.plane;
window.outCorrindor = false;
window.amountOfAvaiableLevels = 2;

//ON-LOAD
window.onload = function () {
    debuggingStuff();
    //CREATE A CANVAS OBJECT
    canvas = new Canvas(640, 354, "canvas", document.getElementById("gameViev"));

    //PRE-LOADING ALL IMAGES -> WHEN ALL IMAGES WILL BE PRE-LOADED "main()" FUNCTION WILL BE CALLED
    preloadAllImages();
}

function main() {
    /*------------------------------------------------------------------------------------------------------------------------*/
    //PLANE
    plane = new Plane(286, 117);
    plane.level = 1;
    plane.enablePlaneStats();

    //CREATING LEVELS INFORMATIONS
    createAllLevels();

    //OBSTACLES, OPPONENTS AND CORRIDOR
    setCurrentLevelObj(plane.level, 286, 117);
    /*------------------------------------------------------------------------------------------------------------------------*/
    //KEY EVENTS
    document.body.addEventListener("keydown", keyDown, false)
    document.body.addEventListener("keyup", keyUp, false)

    function keyDown(e) {
        var keyCode = e.which;
        switch (keyCode) {
            case KEYCODES.leftArrow: plane.move.left = true; break;
            case KEYCODES.rightArrow: plane.move.right = true; break;
            case KEYCODES.downArrow: plane.move.up = true; break;
            case KEYCODES.upArrow: plane.move.down = true; break;

            case KEYCODES.space: plane.shooting = true; break;

                //CAMERA FLY
            case KEYCODES.digit1: canvas.camera.flySpeed += 1; break;
            case KEYCODES.digit2: canvas.camera.flySpeed -= 1; break;
        }
    }

    function keyUp(e) {
        var keyCode = e.which;
        switch (keyCode) {
            case KEYCODES.leftArrow: plane.move.left = false; break;
            case KEYCODES.rightArrow: plane.move.right = false; break;
            case KEYCODES.downArrow: plane.move.up = false; break;
            case KEYCODES.upArrow: plane.move.down = false; break;

            case KEYCODES.space: plane.shooting = false; break;
        }
    }
    /*------------------------------------------------------------------------------------------------------------------------*/
    canvas.animate(function () {
        canvas.bacgroundColor("black");
        canvas.cameraFly();
        if (!outCorrindor) {
            //FLOOR
            currentLevelObjs.corridor.floor.draw();

            //LEFT WALL
            currentLevelObjs.corridor.leftWall.draw();

            //PLANE SHADOW
            if (!plane.crashed) {
                plane.drawPlaneShadow();
            }

            //OBSTACLES
            for (var i = 0; i < currentLevelObjs.obstacles.length; i++) {
                currentLevelObjs.obstacles[i].draw();
            }

            //OPPONENTS
            for (var i = 0; i < currentLevelObjs.opponents.length; i++) {
                currentLevelObjs.opponents[i].draw();
            }

            //DECORATIONS
            for (var i = 0; i < currentLevelObjs.decorations.length; i++) {
                currentLevelObjs.decorations[i].draw();
            }
        }
        //PLANE FLI
        plane.drawFLI();
        //PLANE SHAPE
        plane.drawPlane();
        //PLANE FLUEL STATE
        plane.updateFuelState();

        if (!outCorrindor) {
            //RIGHT WALL
            currentLevelObjs.corridor.rightWall.draw();
        }

        //STARTING SPACE INVASION WHEN LEVEL PASSED
        if (!outCorrindor && currentPlayingLevelIsPassed()) {
            outCorrindor = true;
            startSpaceInvasion();
        }
        //DRAWING PLANE INVASION
        if (!spaceInvasionHasBeenEnded && outCorrindor) {
            spaceInvasionDraw();
        }
        //SPACE INVASION ENDED -> NEXT LEVEL
        if (outCorrindor && spaceInvasionHasBeenEnded) {
            outCorrindor = false;
            plane.level++;
            var x = plane.planeTip.x - canvas.vievOffset.x - 2;
            var y = plane.planeTip.y - canvas.vievOffset.y;
            setCurrentLevelObj(plane.level, x, y);
        }
    }, 30); 
    /*------------------------------------------------------------------------------------------------------------------------*/
}