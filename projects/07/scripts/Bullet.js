function Bullet(x, y, flyHeight, direction, _speed) {
    //PRIVATE SHAPE
    var wallCoords, bullet;
    switch (direction.toUpperCase()) {
        case "FORWARDSTRAIGHT":
            wallCoords = {
                a: new Point(0 + x, 0 + y),
                b: new Point(0 + x, -2.31 + y),
                c: new Point(11.76 + x, -8 + y),
                d: new Point(20.14 + x, -8 + y),
                e: new Point(20.14 + x, -5.9 + y),
                f: new Point(7.92 + x, 0 + y),
            }
            bullet = new CustomShape(wallCoords);
            bullet.style.backgroundImage(PRELOADED.images.bulletStraight, wallCoords.a, 0, 8);
            break;
        case "BACKWARDSSTRAIGHT":
            wallCoords = {
                a: new Point(0 + x, 0 + y),
                b: new Point(0 + x, 2.1 + y),
                c: new Point(-12.22 + x, 8 + y),
                d: new Point(-20.14 + x, 8 + y),
                e: new Point(-20.14 + x, 5.69 + y),
                f: new Point(-8.38 + x, 0 + y),
            }
            bullet = new CustomShape(wallCoords);
            bullet.style.backgroundImage(PRELOADED.images.bulletStraight, wallCoords.d, 0, 8);
            break;
        case "BACKWARDSUP":
            wallCoords = {
                a: new Point(0 + x, 0 + y),
                b: new Point(0 + x, -3.67 + y),
                c: new Point(-16.33 + x, -8 + y),
                d: new Point(-20 + x, -8 + y),
                e: new Point(-20 + x, -4 + y),
                f: new Point(-3.63 + x, 0 + y),
            }
            bullet = new CustomShape(wallCoords);
            bullet.style.backgroundImage(PRELOADED.images.bulletSkew, wallCoords.d);
            break;
        case "VERTICALUP":
            wallCoords = {
                a: new Point(0 + x, 0 + y),
                b: new Point(4.46 + x, 0 + y),
                c: new Point(4.5 + x, 9.63 + y),
                d: new Point(8 + x, 9.63 + y),
                e: new Point(8 + x, 16 + y),
                f: new Point(-8 + x, 16 + y),
                g: new Point(-8 + x, 9.63 + y),
                h: new Point(-4.42 + x, 9.63 + y),
                i: new Point(-4.42 + x, 0 + y),
            }
            bullet = new CustomShape(wallCoords);
            bullet.style.backgroundImage(PRELOADED.images.bulletVerticalUp, wallCoords.i, 3.58);
            bullet.style.backgroundColor(randomRGBColor());
            break;
        case "BACKWARDSSTRAIGHT_AUTO":
            wallCoords = {
                a: new Point(-32 + x, 20 + y),
                b: new Point(-32 + x, 11.75 + y),
                c: new Point(-16 + x, 0 + y),
                d: new Point(-3.5 + x, 1.83 + y),
                e: new Point(0 + x, 12.25 + y),
                f: new Point(-24 + x, 20 + y),
            }
            bullet = new CustomShape(wallCoords);
            bullet.style.backgroundImage(PRELOADED.images.racket, wallCoords.a, 0, 20);
            bullet.style.backgroundColor(randomRGBColor());
            break;
    }

    //WALLSCOORDS
    this.wallsCoords = bullet.wallsCoords;

    //BULLET POSITION
    this.position = {
        x: bullet.wallsCoords.a.x,
        y: bullet.wallsCoords.a.y,
        flyHeight: flyHeight,
    }

    //BULLET SPEED
    this.speed = _speed || 2;

    //BULLET DIRECTION
    this.direction = direction.toUpperCase();
    var directionValues = {
        forwardStraight: new Vector((-canvas.camera.stepForward.x * this.speed) + (-canvas.camera.stepForward.x * canvas.camera.flySpeed), (-canvas.camera.stepForward.y * this.speed) + (-canvas.camera.stepForward.y * canvas.camera.flySpeed)),
        backwardsStraight: new Vector(canvas.camera.stepForward.x * this.speed, canvas.camera.stepForward.y * this.speed),
        backwardsUp: new Vector(-3.8553000000000566 * this.speed, -1.3316499999999962 * this.speed),
        verticalUp: new Vector(0 * this.speed, -1.3316499999999962 * this.speed),
    }

    //APPLYING FORCE
    this.applyForce = function () {
        if (!this.smashed) {
            for (let coord in bullet.wallsCoords) {
                var force;
                switch (this.direction) {
                    case "FORWARDSTRAIGHT": force = directionValues.forwardStraight; break;
                    case "BACKWARDSSTRAIGHT": force = directionValues.backwardsStraight; break;
                    case "BACKWARDSUP": force = directionValues.backwardsUp; break;
                    case "VERTICALUP": force = directionValues.verticalUp; break;
                    case "BACKWARDSSTRAIGHT_AUTO":
                        force = new Vector(plane.planeTip.x - this.position.x, plane.planeTip.y - this.position.y);
                        if (Math.abs(force.x) <= 10 && Math.abs(force.y) <= 10) { this.smashed = true; }
                        force.normalize();
                        force.multiply(6)
                        break;
                }
                bullet.wallsCoords[coord].x += force.x;
                bullet.wallsCoords[coord].y += force.y;
            }
            //UPDATING POSITION
            this.position.x = bullet.wallsCoords.a.x;
            this.position.y = bullet.wallsCoords.a.y;
            //UPDATING FLY HEIGHT
            if (this.direction == "BACKWARDSUP") { this.position.flyHeight += Math.abs(directionValues.backwardsUp.y); };
            if (this.direction == "VERTICALUP") { this.position.flyHeight += Math.abs(directionValues.verticalUp.y); };
            if (this.direction == "BACKWARDSSTRAIGHT_AUTO") { this.position.flyHeight = plane.flyHeight; }
        }
    }

    //DRAW
    this.hide = false;
    this.draw = function () {
        if ((!this.smashed || (this.smashed && this.timeAfterSmashed <= this.maxTimeAferSmashed)) && !this.hide) {
            bullet.draw();
        }
    }

    //CHECKING IF BULLET IS ON CANVAS
    this.isOffTheCanvas = function () {
        if (this.position.x - canvas.vievOffset.x > canvas.width ||
            this.position.x - canvas.vievOffset.x < 0 ||
            this.position.y - canvas.vievOffset.y < -10 ||
            this.position.y - canvas.vievOffset.y > canvas.height) {
            return true;
        }
        else { return false }
    }

    //COLLISION DETECTION WITH OBSTACLES AND OPPONENTS
    this.collisionAccuracy = 15;
    this.hitsSomething = function (arrayOfObjects) {
        for (var i = 0; i < arrayOfObjects.length; i++) {
            //ONLY IF APPRROXIMATE DISTANCE IS LESS THAN 500PX;
            if (distanceBetweenPoints(this.position, arrayOfObjects[i].informations.obstacleBottomLine.pointA) < 500) {
                //IF IT'S AN OBSTACLE OR NOT DEAD OPPONENT
                if ((arrayOfObjects[i].type == "OBSTACLE") || (arrayOfObjects[i].type == "OPPONENT" && !arrayOfObjects[i].dead)) {
                    var pointA = new Point(this.position.x, this.position.y);
                    var pointB = new Point(this.position.x, this.position.y + this.position.flyHeight);

                    var pointC = new Point(pointB.x, pointB.y);
                    var differenceX = -canvas.camera.stepForward.x * 30;
                    var differenceY = -canvas.camera.stepForward.y * 30;
                    pointC.x += differenceX;
                    pointC.y += differenceY;

                    var lineBC = new Line(pointB, pointC);
                    var obstacleBottomLine = arrayOfObjects[i].informations.obstacleBottomLine;

                    var pointD = intersectionPointOfTwoLineSegments(lineBC, obstacleBottomLine)
                    var obstacleFrontWallCoords = arrayOfObjects[i].informations.wallsCoords;

                    if (pointD) {
                        var pointE = new Point(pointD.x, pointD.y - this.position.flyHeight)

                        //TEMPORARY LINES
                        if (pointE.belongsToFigure(obstacleFrontWallCoords) && DEBUGGING.bulletsCollision) {
                            canvas.connectPointsWithLine(pointA, pointB);
                            canvas.connectPointsWithLine(pointB, pointD);
                            canvas.connectPointsWithLine(pointD, pointE);
                        };

                        if (pointE.belongsToFigure(obstacleFrontWallCoords) && distanceBetweenPoints(pointA, pointE) < this.collisionAccuracy) {
                            //IF IT WAS AN OPPONENT HIT BY PLANE -> OPPONENT LIVES--
                            if (arrayOfObjects[i].type == "OPPONENT") {
                                arrayOfObjects[i].lives--;
                                if (arrayOfObjects[i].lives <= 0) { //WHEN OPPONENT HAS NO LIVES -> OPPONENT DIE(in opponent) ->PLANE GETS POINTS
                                    plane.addPoints(arrayOfObjects[i].className);//PLANE ADDS POINTS
                                    //WHEN ZAXXON KILLED
                                    if (arrayOfObjects[i].className == "Zaxxon") { plane.resetZaxxSett(); }
                                }
                            }
                            return true;
                        }
                        else { return false };
                    }
                }
            }
        }
    }

    //COLLISION DETECTION WITH SPACE CRAFTS
    this.hitsSpaceCraft = function () {
        for (var i = 0; i < spaceCraftsArr.length; i++) {
            var craft = spaceCraftsArr[i];
            if (this.position.flyHeight - craft.height/2 <= craft.position.flyHeight && this.position.flyHeight + craft.height/2 >= craft.position.flyHeight) {
                var bPosition = new Point(this.position.x, this.position.y);
                if (bPosition.belongsToFigure(spaceCraftsArr[i].shapes[spaceCraftsArr[i].getCurrentState()].wallsCoords) && !spaceCraftsArr[i].crashed) {
                    spaceCraftsArr[i].crashed = true;
                    return true;
                }
            }
        }
    }

    //SMASHING BULLETS WHEN COLLISION DETECTED
    this.smashed = false;
    this.timeAfterSmashed = 0;
    this.maxTimeAferSmashed = 900;
    var timer;
    this.smash = function () {
        if (!this.smashed && this.direction != "VERTICALUP") {
            bullet.style.backgroundImage(PRELOADED.images.bulletSmashed, wallCoords.a, 0, 8);
            this.smashed = true;
            var bulletObj = this;
            timer = setInterval(function () { bulletObj.timeAfterSmashed += 10; }, 10)
        }
    }

    //COLLISION WHEN PLANE BULLET HIT OPPONENT BULLET
    this.hited = false;
    this.hitAnyOpponentBullet = function () {
        for (var i = 0; i < currentLevelObjs.opponents.length; i++) {
            var opponentBullets = currentLevelObjs.opponents[i].bullets;
            for (var j = 0; j < opponentBullets.length; j++) {
                var opBullet = currentLevelObjs.opponents[i].bullets[j];
                if (opBullet.direction == "VERTICALUP") {
                    if (this.position.flyHeight <= opBullet.position.flyHeight && this.position.flyHeight >= opBullet.position.flyHeight - 16) {
                        var planeBulletCoords = this.wallsCoords;
                        for (let coordName in planeBulletCoords) {
                            if (planeBulletCoords[coordName].belongsToFigure(opBullet.wallsCoords)) {
                                currentLevelObjs.opponents[i].bullets[j].hited = true;
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }
}