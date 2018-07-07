//SETTINGS
var spaceInvasionHasBeenEnded = undefined;
var InvasionSettings = {
    currentTime: 0,
    invasionTime: 30, //seconds (step 10)
    timer: undefined,
    maxAmountSpaceCraftsOnCanvas: 3,
}
var spaceCraftsArr = [];

//STARTING SPACE INVASION
function startSpaceInvasion() {
    //RESET
    InvasionSettings.currentTime = 0;
    spaceCraftsArr = [];
    InvasionSettings.timer = undefined;

    spaceInvasionHasBeenEnded = false;

    //SETTING TIMER
    InvasionSettings.timer = setInterval(function () {
        InvasionSettings.currentTime += 10;
        if (InvasionSettings.currentTime >= InvasionSettings.invasionTime) {
            clearInterval(InvasionSettings.timer);
            InvasionSettings.timer = undefined;
        }
    }, 10000)
}

//STOPING SPACE INVASION
function stopSpaceInvasion() {
    setTimeout(function () {
        spaceInvasionHasBeenEnded = true;
    }, 1000)
}

//ADD SPACE CRAFT
function addSpaceCraftToArr() {
    if (spaceCraftsArr.length < InvasionSettings.maxAmountSpaceCraftsOnCanvas &&
        InvasionSettings.currentTime != InvasionSettings.invasionTime)
    {
        ////RANDOM POSITION
        var pointA = new Point(canvas.vievOffset.x + 79, canvas.vievOffset.y + 197);
        var randomVal = getRandomInt(-5, 88); //-5 -> 88
        var pointB = new Point(pointA.x + randomVal * 4, pointA.y + randomVal);

        var minDist = Math.sqrt(Math.pow(-canvas.camera.stepForward.x, 2) * Math.pow(-canvas.camera.stepForward.y, 2)) * 100;
        var maxDist = Math.sqrt(Math.pow(-canvas.camera.stepForward.x, 2) * Math.pow(-canvas.camera.stepForward.y, 2)) * 220;
        var distanceVal = getRandomInt(minDist, maxDist);

        var differenceX = canvas.camera.stepForward.x * distanceVal;
        var differenceY = canvas.camera.stepForward.y * distanceVal;
        pointB.x -= differenceX;
        pointB.y -= differenceY;

        var pos = {
            x: pointB.x,
            y: pointB.y,
            flyHeight: getRandomInt(26, 160),
        }

        //60% CHANCE TO BE ABLE TO SHOOT
        var ableToShoot = getRandomInt(0, 100);
        if (ableToShoot <= 60) { ableToShoot = true; }
        else { ableToShoot = false; }

        //80% CHANCE TO BE ABLE TO CHANGE FLY HEIGHT
        let ableToChangeFlyHeight = getRandomInt(0, 100);
        if (ableToChangeFlyHeight <= 80) { ableToChangeFlyHeight = true; }
        else { ableToChangeFlyHeight = false; }

        //ADDING SPACE CRAFT TO THE ARR
        spaceCraftsArr.push(new SpaceCraft(pos.x, pos.y - pos.flyHeight + 26, pos.flyHeight, ableToShoot, ableToChangeFlyHeight));

    }
    //IF INVASION MUST END
    else if(InvasionSettings.currentTime==InvasionSettings.invasionTime && spaceCraftsArr.length==0){ stopSpaceInvasion(); }
}

//FUNCTION CALLED EACH FRAME
function spaceInvasionDraw() {
    //ADD SPACE CRAFT TO ARR
    addSpaceCraftToArr();

    //UPDATING AND DRAWING
    for (var i = 0; i < spaceCraftsArr.length; i++) {
        spaceCraftsArr[i].updateFlyHeight();
        spaceCraftsArr[i].update();
        spaceCraftsArr[i].draw();
    }

    //SHOOTING
    for (var i = 0; i < spaceCraftsArr.length; i++) {
        if (spaceCraftsArr[i].isOnCanvas()) {
            spaceCraftsArr[i].shoot();
        }
    }

    //REMOVING CRAFTS WHICH LEVE CANVAS
    for (var i = 0; i < spaceCraftsArr.length; i++) {
        if (spaceCraftsArr[i].leftCanvas()) {
            spaceCraftsArr.splice(i, 1); i--;
        }
    }
}