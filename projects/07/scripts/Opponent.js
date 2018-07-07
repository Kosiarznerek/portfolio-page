function Opponent(className, leftTopPoint) {

    //CREATING INFORMATION STUFF
    function createInfomationPacket(className, leftTopPoint) {
        let infPacket = undefined;
        switch (className) {
            case "Saucer":
                infPacket = {
                    className: "Saucer",
                    lives: 1,
                    wallsCoords: {
                        A: new Point(leftTopPoint.x, leftTopPoint.y + 16.42),
                        B: new Point(leftTopPoint.x, leftTopPoint.y),
                        C: new Point(leftTopPoint.x + 49.14, leftTopPoint.y + 12.56),
                        D: new Point(leftTopPoint.x + 49.14, leftTopPoint.y + 29.11),
                    },
                    backgroundImage: {
                        imageObj: PRELOADED.images.Saucer,
                        leftTopPoint: new Point(leftTopPoint.x, leftTopPoint.y + 3.88),
                    },
                    obstacleBottomLine: new Line(new Point(leftTopPoint.x, leftTopPoint.y + 16.42), new Point(leftTopPoint.x + 49.14, leftTopPoint.y + 29.11)),
                    _shooting: {
                        startingPosition: new Point(leftTopPoint.x + 26.33, leftTopPoint.y + 6.28),
                        direction: "VERTICALUP",
                        flyHeight: 28,
                    }
                }
                break;

            case "RadarTower":
                infPacket = {
                    className: "RadarTower",
                    lives: 1,
                    wallsCoords: {
                        A: new Point(leftTopPoint.x, leftTopPoint.y + 51.18),
                        B: new Point(leftTopPoint.x, leftTopPoint.y),
                        C: new Point(leftTopPoint.x + 42.69, leftTopPoint.y + 10.88),
                        D: new Point(leftTopPoint.x + 42.69, leftTopPoint.y + 62.06),
                    },
                    backgroundImage: {
                        imageObj: PRELOADED.images.RadarTower,
                        leftTopPoint: new Point(leftTopPoint.x + 10.25, leftTopPoint.y + 11.63),
                    },
                    obstacleBottomLine: new Line(new Point(leftTopPoint.x, leftTopPoint.y + 51.18), new Point(leftTopPoint.x + 42.69, leftTopPoint.y + 62.06)),
                    _deadBackgroundImage: {
                        leftTopPoint: new Point(leftTopPoint.x + 12.71, leftTopPoint.y + 37.96),
                    },
                }
                break;

            case "GunImplacement1":
                infPacket = {
                    className: "GunImplacement1",
                    lives: 1,
                    wallsCoords: {
                        A: new Point(leftTopPoint.x, leftTopPoint.y + 31.96),
                        B: new Point(leftTopPoint.x, leftTopPoint.y),
                        C: new Point(leftTopPoint.x + 62.66, leftTopPoint.y + 16.1),
                        D: new Point(leftTopPoint.x + 62.66, leftTopPoint.y + 47.96),
                    },
                    backgroundImage: {
                        imageObj: PRELOADED.images.GunImplacement1,
                        leftTopPoint: new Point(leftTopPoint.x + 14.83, leftTopPoint.y + 12.83),
                    },
                    obstacleBottomLine: new Line(new Point(leftTopPoint.x, leftTopPoint.y + 31.96), new Point(leftTopPoint.x + 62.66, leftTopPoint.y + 47.96)),
                    _deadBackgroundImage: {
                        leftTopPoint: new Point(leftTopPoint.x + 29.51, leftTopPoint.y + 12.84),
                    },
                    _shooting: {
                        startingPosition: new Point(leftTopPoint.x + 14.83, leftTopPoint.y + 34.06),
                        direction: "BACKWARDSSTRAIGHT",
                        flyHeight: 28,
                    }
                }
                break;

            case "GunImplacement2":
                infPacket = {
                    className: "GunImplacement2",
                    lives: 1,
                    wallsCoords: {
                        A: new Point(leftTopPoint.x, leftTopPoint.y + 40.01),
                        B: new Point(leftTopPoint.x, leftTopPoint.y),
                        C: new Point(leftTopPoint.x + 72.35, leftTopPoint.y + 18.49),
                        D: new Point(leftTopPoint.x + 72.35, leftTopPoint.y + 58.5),
                    },
                    backgroundImage: {
                        imageObj: PRELOADED.images.GunImplacement2,
                        leftTopPoint: new Point(leftTopPoint.x + 8.48, leftTopPoint.y + 36.29),
                    },
                    obstacleBottomLine: new Line(new Point(leftTopPoint.x, leftTopPoint.y + 40.01), new Point(leftTopPoint.x + 72.35, leftTopPoint.y + 58.5)),
                    _deadBackgroundImage: {
                        leftTopPoint: new Point(leftTopPoint.x + 34.45, leftTopPoint.y + 35.62),
                    },
                    _shooting: {
                        startingPosition: new Point(leftTopPoint.x + 8.48, leftTopPoint.y + 37.5),
                        direction: "BACKWARDSUP",
                        flyHeight: 28,
                    }
                }
                break;

            case "FuelTank":
                infPacket = {
                    className: "FuelTank",
                    lives: 1,
                    wallsCoords: {
                        A: new Point(leftTopPoint.x, leftTopPoint.y + 40.29),
                        B: new Point(leftTopPoint.x, leftTopPoint.y),
                        C: new Point(leftTopPoint.x + 48.16, leftTopPoint.y + 12.31),
                        D: new Point(leftTopPoint.x + 48.16, leftTopPoint.y + 52.59),
                    },
                    backgroundImage: {
                        imageObj: PRELOADED.images.FuelTank,
                        leftTopPoint: new Point(leftTopPoint.x + 0.33, leftTopPoint.y + 10.27),
                    },
                    obstacleBottomLine: new Line(new Point(leftTopPoint.x, leftTopPoint.y + 40.29), new Point(leftTopPoint.x + 48.16, leftTopPoint.y + 52.59)),
                    _deadBackgroundImage: {
                        leftTopPoint: new Point(leftTopPoint.x + 7, leftTopPoint.y + 16.98),
                    },
                }
                break;

            case "BaseMissiles":
                infPacket = {
                    className: "BaseMissiles",
                    lives: 1,
                    wallsCoords: {
                        A: new Point(leftTopPoint.x, leftTopPoint.y+35.29),
                        B: new Point(leftTopPoint.x, leftTopPoint.y),
                        C: new Point(leftTopPoint.x + 74.37, leftTopPoint.y + 19),
                        D: new Point(leftTopPoint.x + 74.37, leftTopPoint.y + 54.38),
                    },
                    backgroundImage: {
                        imageObj: PRELOADED.images.BaseMissiles,
                        leftTopPoint: new Point(leftTopPoint.x + 18.62, leftTopPoint.y + 15.19),
                    },
                    obstacleBottomLine: new Line(new Point(leftTopPoint.x, leftTopPoint.y + 35.29), new Point(leftTopPoint.x + 74.37, leftTopPoint.y + 54.38)),
                    _deadBackgroundImage: {
                        leftTopPoint: new Point(leftTopPoint.x + 31.12, leftTopPoint.y + 17.66),
                    },
                    _shooting: {
                        startingPosition: new Point(leftTopPoint.x + 22.29, leftTopPoint.y + 36.69),
                        direction: "BACKWARDSSTRAIGHT",
                        flyHeight: 28,
                    }
                }
                break;

            case "Zaxxon":
                infPacket = {
                    className: "Zaxxon",
                    lives: 10,
                    wallsCoords: {
                        A: new Point(leftTopPoint.x, leftTopPoint.y + 100.4 ),
                        B: new Point(leftTopPoint.x, leftTopPoint.y),
                        C: new Point(leftTopPoint.x + 80, leftTopPoint.y + 38.02),
                        D: new Point(leftTopPoint.x + 80, leftTopPoint.y + 138.42),
                    },
                    backgroundImage: {
                        imageObj: PRELOADED.images.zaxxon,
                        leftTopPoint: new Point(leftTopPoint.x, leftTopPoint.y + 23.76),
                    },
                    //obstacleBottomLine -> new Line(wallsCoords.A, wallsCoords.D)
                    _deadExplosion: {},
                    _shooting: {
                        //startingPosition -> wallsCoords.B
                        _offsetX: -41.93,
                        _offsetY: -82.59,
                        direction: "BACKWARDSSTRAIGHT_AUTO",
                        flyHeight: 28,
                    }
                };
                Object.defineProperty(infPacket._shooting, "startingPosition", {
                    get() { return infPacket.wallsCoords.B; }
                })
                Object.defineProperty(infPacket, "obstacleBottomLine", {
                    get() {
                        return new Line(
                            new Point(infPacket.wallsCoords.A.x, infPacket.wallsCoords.A.y),
                            new Point(infPacket.wallsCoords.D.x, infPacket.wallsCoords.D.y)
                        );
                    }
                })
                break;
        }
        if (infPacket) return infPacket
        else console.error("Opponent className unrecognised")
    }

    //ACCESS FOR PRIVATE FUNCTIONS
    var Opponent = this;

    //OBJECT TYPE
    this.type = "OPPONENT";

    //INFORMATIONS
    this.informations = createInfomationPacket(className, leftTopPoint);

    //CLASS NAME
    this.className = this.informations.className;

    //SHAPE
    var wallsCoords = this.informations.wallsCoords;
    var opponent = new CustomShape(wallsCoords);
    this.getCustomShape = function () { return opponent }

    //BACKGROUND IMAGE
    if (this.informations.backgroundImage) {
        var imageObj = this.informations.backgroundImage.imageObj; var leftTopPoint = this.informations.backgroundImage.leftTopPoint;
        var _offsetX = this.informations.backgroundImage._offsetX; var _offsetY = this.informations.backgroundImage._offsetY;
        var _width = this.informations.backgroundImage._width; var _height = this.informations.backgroundImage._height;
        opponent.style.backgroundImage(imageObj, leftTopPoint, _offsetX, _offsetY, _width, _height);
    }
    //ANIMATION SEQUENCE
    if (this.informations.animationSequence) {
        var imagesObjsArr = this.informations.animationSequence.imagesObjsArr; var framesAmount = this.informations.animationSequence.framesAmount;
        var leftTopPoint = this.informations.animationSequence.leftTopPoint; var _infinityBool = this.informations.animationSequence._infinity;
        var _offsetX = this.informations.animationSequence._offsetX; var _offsetY = this.informations.animationSequence._offsetY;
        var _width = this.informations.animationSequence._width; var _height = this.informations.animationSequence._height;
        opponent.style.animation(imagesObjsArr, framesAmount, leftTopPoint, _infinityBool, _offsetX, _offsetY, _width, _height);
    }
    //opponent.style.backgroundColor("rgb(213,113,0)");//TEMP

    //DRAW
    this.enableShooting = true;
    this.draw = function () {
        this.checkLives();
        opponent.draw();
        if (explosion) {
            explosion.style.animationPlay();
            explosion.draw();
        }
        if (this.enableShooting) { shoot(); }
    }

    //LIVES
    this.lives = this.informations.lives;
    this.checkLives = function () {
        if (this.lives <= 0 && !this.dead) { this.die() };
    }

    //DIE
    var explosion = undefined;
    this.dead = false;
    this.die = function () {
        if (this.informations._deadBackgroundImage) {
            //LOADING DESTROYD IMAGE
            var leftTopPoint = this.informations._deadBackgroundImage.leftTopPoint;
            var _offsetX = this.informations._deadBackgroundImage._offsetX;
            var _offsetY = this.informations._deadBackgroundImage._offsetY;
            var _width = this.informations._deadBackgroundImage._width;
            var _height = this.informations._deadBackgroundImage._height;
            opponent.style.backgroundImage(PRELOADED.images.opponentDestroyed, leftTopPoint, _offsetX, _offsetY, _width, _height);
        }
        if (this.informations._deadExplosion) {
            explosion = new CustomShape({ A: new Point(), B: new Point(), C: new Point(), D: new Point() })
            explosion.style.animation(PRELOADED.animations.explosion01.imagesObjArr, canvas.vievOffset, false, null, null, null, null, null)
        }
        this.dead = true;
        this.shooting = false;
    }

    //SHOOTING
    if (this.informations._shooting) { this.shooting = true; }
    else { this.shooting = false; }
    this.bullets = [];
    function shoot() {
        if (Opponent.shooting&&Opponent.bullets.length<1) {
            var startingPosition = Opponent.informations._shooting.startingPosition;
            var offsetX = Opponent.informations._shooting._offsetX || 0;
            var offsetY = Opponent.informations._shooting._offsetY || 0;
            var direction = Opponent.informations._shooting.direction;
            var flyHeight = Opponent.informations._shooting.flyHeight;
            var bullet = new Bullet(startingPosition.x - offsetX, startingPosition.y - offsetY, flyHeight, direction);
            Opponent.bullets.push(bullet);
        }

        //REMOVING BULLETS WHICH LEAVE CANVAS
        for (var i = 0; i < Opponent.bullets.length; i++) {
            if (Opponent.bullets[i].isOffTheCanvas()) { Opponent.bullets.splice(i, 1); i--; }
        }

        //REMOVING HITTED BULLETS BY PLANE BULLET
        for (var i = 0; i < Opponent.bullets.length; i++) {
            if (Opponent.bullets[i].hited) { Opponent.bullets.splice(i, 1); i--; }
        }

        //REMOVING BULLETS WHERE FLYHEIGHT>160
        for (var i = 0; i < Opponent.bullets.length; i++) {
            if (Opponent.bullets[i].position.flyHeight>160 && Opponent.bullets[i].direction=="VERTICALUP") { Opponent.bullets.splice(i, 1); i--; }
        }

        //APLYING SPEED
        for (var i = 0; i < Opponent.bullets.length; i++) { Opponent.bullets[i].applyForce(); }

        //DRAWING
        for (var i = 0; i < Opponent.bullets.length; i++) { Opponent.bullets[i].draw(); }
    }

}
/*==============================================================================================================*/