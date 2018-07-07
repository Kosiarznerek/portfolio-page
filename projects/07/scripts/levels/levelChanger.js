//CREATING ALL LEVELS
function createAllLevels() {
    createLevel01();
    createLevel02();
}

var currentLevelObjs = {
    opponents: [],
    obstacles: [],
    corridor: {
        leftWall: undefined,
        floor: undefined,
        rightWall: undefined,
    },
    decorations: [],
};

//CLEARING CURRENT LEVEL OBJECTS
function clearCurrentLevelObjs() {
    currentLevelObjs = {
        opponents: [],
        obstacles: [],
        corridor: {
            leftWall: undefined,
            floor: undefined,
            rightWall: undefined,
        },
        decorations: [],
    };
}

//SETTING CURRENT LEVEL OBJECTS
function setCurrentLevelObj(level, x, y, _canvasVievOffset) {
    //DETECTING LEVEL
    var levelInf = undefined;
    if (level > amountOfAvaiableLevels || !level) { level = 1; plane.level = 1; }
    switch (level) {
        case 1: levelInf = level01; break;
        case 2: levelInf = level02; break;
        default: console.log("LEVEL NOT AVAIABLE"); break;
    }

    //CLEARING CURRENT LEVEL OBJECTS
    clearCurrentLevelObjs();

    //CREATING OBSTACLES
    for (let obstacle in levelInf.obstacles) {
        currentLevelObjs.obstacles.push(new Obstacle(levelInf.obstacles[obstacle]));
    }

    //CREATING OPPONENTS
    for (let opponent in levelInf.opponents) {
        let className = levelInf.opponents[opponent].className;
        let leftTopPoint = levelInf.opponents[opponent].leftTopPoint;
        currentLevelObjs.opponents.push(new Opponent(className, leftTopPoint));
    }

    //CREATING DECORATIONS
    for (let decoration in levelInf.decorations) {
        var decShape = new CustomShape({ a: new Point() });
        decShape.style.backgroundImage(levelInf.decorations[decoration].imageObj, levelInf.decorations[decoration].leftTopPoint);
        currentLevelObjs.decorations.push(decShape);
    }

    //CREATING LEFT WALL, FLOOR AND RIGHT WALL
    for (let wall in currentLevelObjs.corridor) {
        currentLevelObjs.corridor[wall] = new CustomShape(levelInf.corridor[wall].coords);
        if (levelInf.corridor[wall].backgroundColor)
        currentLevelObjs.corridor[wall].style.backgroundColor(levelInf.corridor[wall].backgroundColor); 
        if (levelInf.corridor[wall].backgroundImage)
        currentLevelObjs.corridor[wall].style.backgroundImage(levelInf.corridor[wall].backgroundImage.imageObj, levelInf.corridor[wall].backgroundImage.leftTopPoint, levelInf.corridor[wall].backgroundImage._offsetX, levelInf.corridor[wall].backgroundImage._offsetY, levelInf.corridor[wall].backgroundImage._width, levelInf.corridor[wall].backgroundImage._height)
    }

    //SETTING CANVAS VIEV OFFSET
    if (_canvasVievOffset) {
        canvas.vievOffset.x = _canvasVievOffset.x
        canvas.vievOffset.y = _canvasVievOffset.y
    }
    else {
        canvas.vievOffset.x = levelInf.canvas.vievOffset.x;
        canvas.vievOffset.y = levelInf.canvas.vievOffset.y;
    }

    //CREATING PLANE WITH THE SAME STATS
    plane.pernamentFuelWarningKill();
    var level = plane.level;
    var lifes = plane.lifes;
    var flyHeight = plane.flyHeight;
    var fuelState = plane.FUEL_STATE;
    plane = new Plane(x, y, level, lifes, flyHeight, fuelState);
}

//CHECKING LEVEL PROGRESS
function currentPlayingLevelIsPassed() {
    if (distanceBetweenPoints(plane.planeTip, currentLevelObjs.corridor.floor.wallsCoords.C) < 500||
        distanceBetweenPoints(plane.planeTip, currentLevelObjs.corridor.floor.wallsCoords.D) < 500||
        distanceBetweenPoints(plane.planeTip, currentLevelObjs.corridor.leftWall.wallsCoords.C) < 500||
        distanceBetweenPoints(plane.planeTip, currentLevelObjs.corridor.rightWall.wallsCoords.C) < 500
        )
    {
        var pointA = new Point(plane.planeTip.x, plane.planeTip.y);
        var pointB = new Point(plane.planeTip.x, plane.planeTip.y + plane.flyHeight);
        var pointC = new Point(pointB.x, pointB.y);
        var differenceX = canvas.camera.stepForward.x * 150;
        var differenceY = canvas.camera.stepForward.y * 150;
        pointC.x += differenceX;
        pointC.y += differenceY;
        var lineBC = new Line(pointB, pointC);
        var obstacleBottomLine = new Line(new Point(currentLevelObjs.corridor.floor.wallsCoords.C.x, currentLevelObjs.corridor.floor.wallsCoords.C.y), new Point(currentLevelObjs.corridor.floor.wallsCoords.D.x, currentLevelObjs.corridor.floor.wallsCoords.D.y))
        var pointD = intersectionPointOfTwoLineSegments(lineBC, obstacleBottomLine);

        if (pointD) {
            //TEMP LINES
            //canvas.connectPointsWithLine(pointA, pointB, "red");
            //canvas.connectPointsWithLine(pointB, pointD, "red");
            var distance = distanceBetweenPoints(pointB, pointD);
            if (distance > 300) {
                return true;
            }
        }
    }
}