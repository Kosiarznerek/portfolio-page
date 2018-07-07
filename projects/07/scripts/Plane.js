function Plane(x, y, _level, _lifes, _flyHeight, _fuelState) {
    //ACCESS FOR PRIVATE FUNCTIONS
    var Plane = this;
    /*-----------------------------------------------------------------------------------------------------------------*/
    //STARTING POSITION
    this.startingPosition = {
        x: -64 + (x || 0),
        y: 0 + (y || 0),
    }

    //MOVEMENT SPEED
    this.movementSpeed = 2;

    //CONTROL RESTRICTIONS
    var controlRestrictions = {
        flyHeight: {
            current: _flyHeight || 160,
            max: 160,
            min: 26,
        },
        leftRight: {
            min: (286-Plane.startingPosition.x-64)-210,
            max: (286-Plane.startingPosition.x-64)+168,
            current: 0,
        }
    }
    //FLY HEIGHT
    this.flyHeight = controlRestrictions.flyHeight.current;

    //CURRENT PLANE STATE
    this.currentState = "normal";

    //LEVEL
    this.level = _level || 1;

    //SOUNDS EFFECTS
    var SOUNDS = {
        lowFuel: new Audio("soundEffects/warning.wav"),
        shoot: new Audio("soundEffects/shoot3.wav"),
        explosion: new Audio("soundEffects/explosion.wav"),
    }
    /*----------------------------------------------- PLANE STATES ----------------------------------------------------*/
    //SHAPES COORDS
    var planeStates = {
        normal: {
            coords: {
                point01: new Point(65.99, 0), point02: new Point(55.83, 0), point03: new Point(55.83, 2.25),
                point04: new Point(52.67, 2.25), point05: new Point(52.67, 4.4), point06: new Point(48.56, 4.4),
                point07: new Point(48.56, 6.46), point08: new Point(44.65, 6.46), point09: new Point(44.65, 8.5),
                point10: new Point(40.59, 8.5), point11: new Point(40.59, 10.04), point12: new Point(36.42, 10.04),
                point13: new Point(36.42, 12.04), point14: new Point(32.42, 12.04), point15: new Point(32.42, 14.71),
                point16: new Point(25.21, 14.71), point17: new Point(25.21, 12.63), point18: new Point(21.17, 12.63),
                point19: new Point(21.17, 10.71), point20: new Point(16.67, 10.71), point21: new Point(16.67, 12.63),
                point22: new Point(12.58, 12.63), point23: new Point(12.58, 17.63), point24: new Point(7.94, 17.63),
                point25: new Point(7.94, 19.63), point26: new Point(0, 19.63), point27: new Point(0, 26.17),
                point28: new Point(7.94, 26.17), point29: new Point(7.94, 28.25), point30: new Point(16.67, 28.25),
                point31: new Point(16.67, 30.25), point32: new Point(23.92, 30.25), point33: new Point(23.92, 32.08),
                point34: new Point(32, 32.08), point35: new Point(32, 34), point36: new Point(39.92, 34),
                point37: new Point(39.92, 36), point38: new Point(50.17, 36), point39: new Point(50.17, 34),
                point40: new Point(53.92, 34), point41: new Point(53.92, 18), point42: new Point(58.17, 18),
                point43: new Point(58.17, 14.08), point44: new Point(62.17, 14.08), point45: new Point(62.17, 10.04),
                point46: new Point(65.99, 10.04),
            },
            backgroundImage: {
                imageObj: PRELOADED.images.planeNormal,
                offsetX: 65.99,
                offsetY: 0,
            },
        },
        up: {
            coords: {
                point01: new Point(65.99, 0), point02: new Point(55.69, 0), point03: new Point(55.69, 3.54),
                point04: new Point(51.92, 3.54), point05: new Point(51.92, 5.38), point06: new Point(47.96, 5.38),
                point07: new Point(47.96, 7.5), point08: new Point(44, 7.5), point09: new Point(44, 9.5),
                point10: new Point(39.88, 9.5), point11: new Point(39.88, 15.42), point12: new Point(36.46, 15.42),
                point13: new Point(36.46, 16.46), point14: new Point(20.75, 16.46), point15: new Point(20.75, 18.56),
                point16: new Point(16.63, 18.56), point17: new Point(16.63, 20.44), point18: new Point(12.69, 20.44),
                point19: new Point(12.69, 25.5), point20: new Point(4.06, 25.5), point21: new Point(4.06, 27.56),
                point22: new Point(0, 27.56), point23: new Point(0, 32.06), point24: new Point(11.63, 32.06),
                point25: new Point(11.63, 33.94), point26: new Point(19.9, 33.94), point27: new Point(19.9, 35.77),
                point28: new Point(31.81, 35.77), point29: new Point(31.81, 37.88), point30: new Point(43.72, 37.88),
                point31: new Point(43.72, 39.99), point32: new Point(54, 39.99), point33: new Point(54, 18.56),
                point34: new Point(58.08, 18.56), point35: new Point(58.08, 14.08), point36: new Point(62.42, 14.08),
                point37: new Point(62.42, 10.33), point38: new Point(65.99, 10.33),
            },
            backgroundImage: {
                imageObj: PRELOADED.images.planeUp,
                offsetX: 65.99,
                offsetY: 0,
            },
        },
        down: {
            coords: {
                point01: new Point(61.99, 0), point02: new Point(51.88, 0), point03: new Point(51.88, 1.54),
                point04: new Point(47.88, 1.54), point05: new Point(47.88, 3.42), point06: new Point(43.79, 3.42),
                point07: new Point(43.79, 5.46), point08: new Point(3.88, 5.46), point09: new Point(3.88, 7.5),
                point10: new Point(0, 7.5), point11: new Point(0, 14.19), point12: new Point(3.88, 14.19),
                point13: new Point(3.88, 16), point14: new Point(7.94, 16), point15: new Point(7.94, 17.88),
                point16: new Point(12, 17.88), point17: new Point(12, 19.88), point18: new Point(16.5, 19.88),
                point19: new Point(16.5, 23.13), point20: new Point(19.98, 23.13), point21: new Point(19.98, 25.69),
                point22: new Point(23.83, 25.69), point23: new Point(23.83, 28), point24: new Point(28, 28),
                point25: new Point(28, 29.75), point26: new Point(31.88, 29.75), point27: new Point(31.88, 32),
                point28: new Point(45.83, 32), point29: new Point(45.83, 28), point30: new Point(50.13, 28),
                point31: new Point(50.13, 14.19), point32: new Point(54.19, 14.19), point33: new Point(54.19, 12.19),
                point34: new Point(58.13, 12.19), point35: new Point(58.13, 8), point36: new Point(61.99, 8),
            },
            backgroundImage: {
                imageObj: PRELOADED.images.planeDown,
                offsetX: 61.99,
                offsetY: 0,
            },
        },
        normal09: {
            coords: {
                point01: new Point(56.00, 0), point02: new Point(56.00, 5.81), point03: new Point(51.88, 5.81),
                point04: new Point(51.88, 9.75), point05: new Point(47.94, 9.75), point06: new Point(47.94, 14),
                point07: new Point(43.63, 14), point08: new Point(43.63, 25.75), point09: new Point(39.69, 25.75),
                point10: new Point(39.69, 28), point11: new Point(32.06, 28), point12: new Point(32.06, 26.13),
                point13: new Point(24.19, 26.13), point14: new Point(24.19, 24), point15: new Point(15.56, 24),
                point16: new Point(15.56, 21.94), point17: new Point(8.13, 21.94), point18: new Point(8.13, 19.88),
                point19: new Point(0, 19.88), point20: new Point(0, 18.06), point21: new Point(4.06, 18.06),
                point22: new Point(4.06, 16.44), point23: new Point(11.44, 16.44), point24: new Point(11.44, 12.13),
                point25: new Point(7.75, 12.13), point26: new Point(7.75, 9.63), point27: new Point(11.84, 9.63),
                point28: new Point(11.84, 7.78), point29: new Point(15.56, 7.78), point30: new Point(15.56, 5.81),
                point31: new Point(19.88, 5.81), point32: new Point(19.88, 7.78), point33: new Point(28, 7.78),
                point34: new Point(28, 9.75), point35: new Point(32.06, 9.75), point36: new Point(32.06, 7.78),
                point37: new Point(35.33, 7.78), point38: new Point(35.33, 5.81), point39: new Point(43.63, 5.81),
                point40: new Point(43.63, 4.08), point41: new Point(45.78, 4.08), point42: new Point(45.78, 1.75),
                point43: new Point(47.94, 1.75), point44: new Point(47.94, 0),
            },
            backgroundImage: {
                imageObj: PRELOADED.images.planeNormal09,
                offsetX: 56,
                offsetY: 0,
            },
        },
        normal08: {
            coords: {
                point01: new Point(48, 0), point02: new Point(48, 3.5), point03: new Point(44.17, 3.5),
                point04: new Point(44.17, 7.58), point05: new Point(40.33, 7.58), point06: new Point(40.33, 12),
                point07: new Point(36.17, 12), point08: new Point(36.17, 21.58), point09: new Point(32, 21.58),
                point10: new Point(32, 24), point11: new Point(27.75, 24), point12: new Point(27.75, 21.58),
                point13: new Point(20, 21.58), point14: new Point(20, 19.58), point15: new Point(16.17, 19.58),
                point16: new Point(16.17, 17.92), point17: new Point(8.33, 17.92), point18: new Point(8.33, 16.17),
                point19: new Point(0, 16.17), point20: new Point(0, 14.25), point21: new Point(4.17, 14.25),
                point22: new Point(4.17, 12.42), point23: new Point(12.25, 12.42), point24: new Point(11.83, 10.17),
                point25: new Point(7.67, 10.17), point26: new Point(7.67, 7.58), point27: new Point(11.83, 7.58),
                point28: new Point(11.83, 5.54), point29: new Point(16.17, 5.54), point30: new Point(16.17, 4.04),
                point31: new Point(19.71, 4.04), point32: new Point(19.71, 6), point33: new Point(23.54, 6),
                point34: new Point(23.54, 8.17), point35: new Point(27.83, 8.17), point36: new Point(27.83, 6.17),
                point37: new Point(31.58, 6.17), point38: new Point(31.58, 4.04), point39: new Point(35.67, 4.04),
                point40: new Point(35.67, 1.75), point41: new Point(39.67, 1.75), point42: new Point(39.67, 0),
            },
            backgroundImage: {
                imageObj: PRELOADED.images.planeNormal08,
                offsetX: 48,
                offsetY: 0,
            },
        },
        normal07: {
            coords: {
                point01: new Point(36, 0), point02: new Point(36, 3.75), point03: new Point(31.94, 3.75),
                point04: new Point(31.94, 7.81), point05: new Point(28, 7.81), point06: new Point(28, 15.88),
                point07: new Point(23.94, 15.88), point08: new Point(23.94, 18), point09: new Point(19.75, 18),
                point10: new Point(19.75, 15.88), point11: new Point(16.06, 15.88), point12: new Point(16.06, 13.88),
                point13: new Point(7.63, 13.88), point14: new Point(7.63, 12.19), point15: new Point(0, 12.19),
                point16: new Point(0, 10), point17: new Point(3.81, 10), point18: new Point(3.81, 5.78),
                point19: new Point(7.63, 5.78), point20: new Point(7.63, 3.75), point21: new Point(16.06, 3.75),
                point22: new Point(16.06, 5.78), point23: new Point(19.75, 5.78), point24: new Point(19.75, 3.75),
                point25: new Point(23.63, 3.75), point26: new Point(23.63, 2.69), point27: new Point(25.97, 2.69),
                point28: new Point(25.97, 1.88), point29: new Point(28.38, 1.88), point30: new Point(28.38, 0),
            },
            backgroundImage: {
                imageObj: PRELOADED.images.planeNormal07,
                offsetX: 36,
                offsetY: 0,
            },
        },
        crashed: {
            coords: {},
            animationSequence: {
                imagesObjectsArr: PRELOADED.animations.explosion01.imagesObjArr,
                infinity: false,
            },
        },
    }
    Object.defineProperty(planeStates.normal.backgroundImage, 'leftTopPoint', {
        get() { return planeStates.normal.coords.point01; }
    })
    Object.defineProperty(planeStates.up.backgroundImage, 'leftTopPoint', {
        get() { return planeStates.up.coords.point01; }
    })
    Object.defineProperty(planeStates.down.backgroundImage, 'leftTopPoint', {
        get() { return planeStates.down.coords.point01; }
    })
    Object.defineProperty(planeStates.normal09.backgroundImage, 'leftTopPoint', {
        get() { return planeStates.normal09.coords.point01; }
    })
    Object.defineProperty(planeStates.normal08.backgroundImage, 'leftTopPoint', {
        get() { return planeStates.normal08.coords.point01; }
    })
    Object.defineProperty(planeStates.normal07.backgroundImage, 'leftTopPoint', {
        get() { return planeStates.normal07.coords.point01; }
    })
    //WHEN CRASHED
    for (let coordName in planeStates[Plane.currentState].coords) {
        Object.defineProperty(planeStates.crashed.coords, coordName, {
            get() { return planeStates[Plane.currentState].coords[coordName]; }
        })
    }
    Object.defineProperty(planeStates.crashed.animationSequence, 'leftTopPoint', {
        get() { return canvas.vievOffset; }
    })

    //OFFSETING PLANE COORDS TO CANVAS POSITION
    for (let state in planeStates) {
        for (let coordName in planeStates[state].coords) {
            planeStates[state].coords[coordName].x += canvas.vievOffset.x || 0;
            planeStates[state].coords[coordName].y += canvas.vievOffset.y || 0;
        }
    }
    //OFFSETING PLANE COORDS TO THE STARTING POSITION
    for (let state in planeStates) {
        for (let coordName in planeStates[state].coords) {
            planeStates[state].coords[coordName].x += this.startingPosition.x;
            planeStates[state].coords[coordName].y += this.startingPosition.y;
        }
    }
    //CREATING SHAPES FOR ALL PLANE STATES
    var stateShapes = {};
    for (state in planeStates) {
        var shape = new CustomShape(planeStates[state].coords);

        //BACKGROUND-IMAGE
        if (planeStates[state].backgroundImage) {
            var bgInf = planeStates[state].backgroundImage;
            shape.style.backgroundImage(bgInf.imageObj, bgInf.leftTopPoint, bgInf.offsetX, bgInf.offsetY);
            //shape.style.backgroundColor(randomRGBColor()); //temp
        }
            //ANIMATION SEQUENCE
        else if(planeStates[state].animationSequence){
            var animInf = planeStates[state].animationSequence;
            shape.style.animation(animInf.imagesObjectsArr, animInf.leftTopPoint, animInf.infinity);
        }

        stateShapes[state] = shape;
    }
    //UPDATING PLANE SHAPES COORDS
    function updatePlaneShapesCoords() {
        for (let state in stateShapes) {
            for (let coordName in stateShapes[state].wallsCoords) {
                var differenceX = canvas.camera.stepForward.x * canvas.camera.flySpeed;
                var differenceY = canvas.camera.stepForward.y * canvas.camera.flySpeed;
                stateShapes[state].wallsCoords[coordName].x -= differenceX;
                stateShapes[state].wallsCoords[coordName].y -= differenceY;
            }
        }
    }
    /*------------------------------------------------ PLANE SHADOW ---------------------------------------------------*/
    //SHAPE COORDS
    var shadowCoords = {
        point01: new Point(65.99, 0), point02: new Point(56.69, 0), point03: new Point(56.69, 2.44),
        point04: new Point(52.66, 2.44), point05: new Point(52.66, 4.5), point06: new Point(48.59, 4.5),
        point07: new Point(48.59, 6.59), point08: new Point(44.63, 6.59), point09: new Point(44.63, 8.44),
        point10: new Point(40.5, 8.44), point11: new Point(40.5, 10.47), point12: new Point(36.63, 10.47),
        point13: new Point(36.63, 12.5), point14: new Point(24.5, 12.5), point15: new Point(24.5, 14.46),
        point16: new Point(8.59, 14.46), point17: new Point(8.59, 16.41), point18: new Point(4.53, 16.41),
        point19: new Point(4.53, 20.41), point20: new Point(0, 20.41), point21: new Point(0, 25.35),
        point22: new Point(8.59, 25.35), point23: new Point(8.59, 27.38), point24: new Point(16.53, 27.38),
        point25: new Point(16.53, 29.36), point26: new Point(24.53, 29.36), point27: new Point(24.53, 31.38),
        point28: new Point(32.44, 31.38), point29: new Point(32.44, 33.34), point30: new Point(40.47, 33.34),
        point31: new Point(40.47, 35.44), point32: new Point(49.33, 35.44), point33: new Point(49.33, 33.46),
        point34: new Point(53.38, 33.46), point35: new Point(53.38, 17.44), point36: new Point(57.31, 17.44),
        point37: new Point(57.31, 13.48), point38: new Point(61.5, 13.48), point39: new Point(61.5, 9.45),
        point40: new Point(65.99, 9.45),
    }
    //OFFSETING SHADOW COORDS TO THE CANVAS
    for (let coordName in shadowCoords) {
        shadowCoords[coordName].x += canvas.vievOffset.x || 0;
        shadowCoords[coordName].y += canvas.vievOffset.y || 0;
    }
    //OFFSETTING SHADOW TO THE PLANE STARTING POSITION
    for (let coordName in shadowCoords) {
        shadowCoords[coordName].x += this.startingPosition.x;
        shadowCoords[coordName].y += this.startingPosition.y;
    }
    //CREATING SHADOW
    var planeShadow = new CustomShape(shadowCoords);
    planeShadow.style.backgroundColor("black");
    for (let coordName in planeShadow.wallsCoords) {
        planeShadow.wallsCoords[coordName].y += controlRestrictions.flyHeight.current;
    }
    //UPDATING SHADOW COORDS
    function updatePlaneShadowCoords() {
        for (let coordName in planeShadow.wallsCoords) {
            var differenceX = canvas.camera.stepForward.x * canvas.camera.flySpeed;
            var differenceY = canvas.camera.stepForward.y * canvas.camera.flySpeed;
            planeShadow.wallsCoords[coordName].x -= differenceX
            planeShadow.wallsCoords[coordName].y -= differenceY
        }
    }
    /*----------------------------------------------------- DRAWING ---------------------------------------------------*/
    //DRAWING PLANE ON CANVAS
    this.drawPlane = function () {
        if (!this.crashed) { planeControl(); }//PLANE CONTROLLING
        if (!this.crashed) { planeShooting(); }//PLANE SHOOTING
        if (!this.crashed) { hitByOpponentsBullet(); }//CHECKING COLLISINS WITH OPPONENTS BULLETS
        if (!this.crashed) { collisionCheck(currentLevelObjs.obstacles); }//CHECKING COLLISINS WITH OBSTACLES
        if (!this.crashed) { collisionCheck(currentLevelObjs.opponents); }//CHECKING COLLISINS WITH OPPONENTS
        if (!this.crashed && outCorrindor) { hitBySpaceCraft(); } //CHECKING COLLISION WITH SPACE CRAFTS
        if (!this.crashed && outCorrindor) { hitBySpaceCraftBullet(); } //CHECKING COLLISION WITH SPACE CRAFTS BULLETS
        if (!this.crashed && this.level % 2 == 0) { zaxxonBehavior(); } //STUFF CONNECTED WITH ZAXXON

        //CHECK IF EXPLOSION ANIMATION ENDED
        if (this.crashed && stateShapes["crashed"].style.animationCurrentState() == "ENDED" && !zaxxSett.planeKilled && this.lifes > 0) {
            stateShapes["up"].hide = true;
            planeGoesBack();
        }

        //UPDATING SHAPE POSIOTION
        updatePlaneShapesCoords();
        //DRAWING SHAPE
        if (!stateShapes[this.currentState].hide) {
            stateShapes[this.currentState].draw();
        }
        

        //SLOWING OR STOPPING CAMERA WHEN ZAXXON DETECTED
        if (!this.crashed && this.level % 2 == 0 && zaxxSett.cameraSlowed) { canvas.camera.flySpeed = 1; }
        if (!this.crashed && this.level % 2 == 0 && zaxxSett.cameraStoped) { canvas.camera.flySpeed = 0; }
    }
    //DRAWING PLANE SHADOW
    this.drawPlaneShadow = function () {
        updatePlaneShadowCoords();
        planeShadow.draw();
    }
    /*----------------------------------------------------- CONTROLING ------------------------------------------------*/
    //MOVEMENT STATES
    this.move = {
        left: false,
        right: false,
        up: false,
        down: false,
    }

    //BLOCKING MOVEMENTS
    this.blockMove = {
        left: false,
        right: false,
        up: false,
        down: false,
    }

    //MOVEMENT VALUES
    var movementValues = {
        left: new Vector(-4 * this.movementSpeed, -1 * this.movementSpeed),
        right: new Vector(4 * this.movementSpeed, 1 * this.movementSpeed),
        up: new Vector(0, -5 * this.movementSpeed),
        down: new Vector(0, 5 * this.movementSpeed),
    }

    //MOVING FUNCTIONS
    function planeIsAbleToMove(direction, moveValue) {
        switch (direction) {
            case "left":
                if (!Plane.blockMove.left) {
                    if (controlRestrictions.leftRight.current + moveValue.x >= controlRestrictions.leftRight.min) {
                        controlRestrictions.leftRight.current += moveValue.x;
                        return true;
                    }
                    else { return false; }
                }
                else { return false; }
                break;
            case "right":
                if (!Plane.blockMove.right) {
                    if (controlRestrictions.leftRight.current + moveValue.x <= controlRestrictions.leftRight.max) {
                        controlRestrictions.leftRight.current += moveValue.x;
                        return true;
                    }
                    else { return false; }
                }
                else { return false; }
                break;
            case "up":
                if (!Plane.blockMove.up) {
                    if (controlRestrictions.flyHeight.current - moveValue.y <= controlRestrictions.flyHeight.max) {
                        controlRestrictions.flyHeight.current -= moveValue.y;
                        Plane.flyHeight = controlRestrictions.flyHeight.current;
                        if (!outCorrindor) { Plane.currentState = "up"; }
                        return true;
                    }
                    else { return false; }
                }
                else { return false; }
                break;
            case "down":
                if (!Plane.blockMove.down) {
                    if (controlRestrictions.flyHeight.current - moveValue.y >= controlRestrictions.flyHeight.min) {
                        controlRestrictions.flyHeight.current -= moveValue.y;
                        Plane.flyHeight = controlRestrictions.flyHeight.current;
                        if (!outCorrindor) { Plane.currentState = "down"; }
                        return true;
                    }
                    else { return false; }
                }
                else { return false; }
                break;
        }
    }
    function planeControl() {
        if (!outCorrindor) { Plane.currentState = "normal"; }
        else {
            var flyVal = controlRestrictions.flyHeight.current.map(controlRestrictions.flyHeight.min, controlRestrictions.flyHeight.max, 0, 4);
            if (flyVal >= 0 && flyVal < 1) { Plane.currentState = "normal07"; }
            if (flyVal >= 1 && flyVal < 2) { Plane.currentState = "normal08"; }
            if (flyVal >= 2 && flyVal < 3) { Plane.currentState = "normal09"; }
            if (flyVal >= 3 && flyVal <= 4) { Plane.currentState = "normal"; }
        }

        var moveValue = {};
        if (Plane.move.left) { moveValue.left = movementValues.left; }
        if (Plane.move.up) { moveValue.up = movementValues.up; }
        if (Plane.move.down) { moveValue.down = movementValues.down; }
        if (Plane.move.right) { moveValue.right = movementValues.right; }

        for (let direction in moveValue) {
            if (planeIsAbleToMove(direction, moveValue[direction])) {
                //MOVING PLANE SHAPE
                for (state in stateShapes) {
                    for (coordName in stateShapes[state].wallsCoords) {
                        stateShapes[state].wallsCoords[coordName].x += moveValue[direction].x;
                        stateShapes[state].wallsCoords[coordName].y += moveValue[direction].y;
                    }
                }
                //MOVING SHADOW SHAPE
                if (direction != "up" && direction != "down") {
                    for (coordName in planeShadow.wallsCoords) {
                        planeShadow.wallsCoords[coordName].x += moveValue[direction].x;
                        if (!Plane.move.topRight && !Plane.move.topLeft && !Plane.move.bottomLeft && !Plane.move.bottomRight) {
                            planeShadow.wallsCoords[coordName].y += moveValue[direction].y;
                        }
                    }
                }
            }
        }
    }
    /*------------------------------------------------------- SHOOTING ------------------------------------------------*/
    this.shooting = false;
    this.bulletsMagazine = 5;
    var bullets = [];
    this.planeTip = planeStates["normal"].coords.point01;
    function planeShooting() {
        if (plane.shooting) {
            var PlaneTipPos = planeStates[Plane.currentState].coords.point01
            //COUNTING NOT SMASHED BULLETS
            var counter = 0;
            for (var i = 0; i < bullets.length; i++) {
                if (!bullets[i].smashed) { counter++; }
            }
            if (counter < plane.bulletsMagazine && (bullets.length == 0 || distanceBetweenPoints(PlaneTipPos, bullets[bullets.length - 1].position) > 60)) {
                var x = PlaneTipPos.x;
                var y = PlaneTipPos.y;
                var flyHeight = controlRestrictions.flyHeight.current;
                var bullet = new Bullet(x, y, flyHeight, "FORWARDSTRAIGHT", 4);
                bullets.push(bullet);
                SOUNDS.shoot.currentTime = 0;
                SOUNDS.shoot.play();
            }
        }

        //COLLISION DETECTION WITH OBSTACLES AND OPPONENTS
        for (var i = 0; i < bullets.length; i++) {
            if (bullets[i].hitsSomething(currentLevelObjs.obstacles)) { bullets[i].smash(); } //BULLET IS SMASHING WHEN HITS OBSTACLE
            if (bullets[i].hitsSomething(currentLevelObjs.opponents)) { bullets.splice(i, 1); i--; } //BULLET DISAPEARS WHEN HITS OPPONENT
        }

        //COLLISION PLANE BULLET - OPPONENT BULLET
        for (var i = 0; i < bullets.length; i++) {
            if (!bullets[i].smashed && bullets[i].hitAnyOpponentBullet()) {
                bullets[i].smash();
            }
        }

        //REMOVING BULLETS WHICH LEAVE CANVAS
        for (var i = 0; i < bullets.length; i++) {
            if (bullets[i].isOffTheCanvas()) { bullets.splice(i, 1); i--;}
        }

        for (var i = 0; i < bullets.length; i++) {
            //COLLISION WITH SPACE CRAFTS
            if (outCorrindor) {
                if (bullets[i].hitsSpaceCraft()) { bullets[i].smash(); Plane.addPoints("SpaceCraft") }
            }
            //APLYING SPEED
            bullets[i].applyForce();
            //DRAWING
            bullets[i].draw();
        }
    }
    /*---------------------------------------------- COLISION DETECTIONS ----------------------------------------------*/
    this.collisionAccuracy = 15;

    var planeSize = {
        normal: {
            planeTip: planeStates.normal.coords.point01,
            leftWing: planeStates.normal.coords.point26,
            rightWing: planeStates.normal.coords.point40,
        },
        up: {
            planeTip: planeStates.up.coords.point01,
            leftWing: planeStates.up.coords.point22,
            rightWing: planeStates.up.coords.point32,
        },
        down: {
            planeTip: planeStates.down.coords.point01,
            leftWing: planeStates.down.coords.point08,
            rightWing: planeStates.down.coords.point30,
        },
        normal07: {
            planeTip: planeStates.down.coords.point01,
            leftWing: planeStates.down.coords.point20,
            rightWing: planeStates.down.coords.point06,
        },
        normal08: {
            planeTip: planeStates.down.coords.point01,
            leftWing: planeStates.down.coords.point28,
            rightWing: planeStates.down.coords.point08,
        },
        normal09: {
            planeTip: planeStates.down.coords.point01,
            leftWing: planeStates.down.coords.point30,
            rightWing: planeStates.down.coords.point08,
        },
        height: 10,
    };

    //CHECKING COLLISION FOR OBSTACLES AND OPPONENTS
    function collisionCheck(arrayOfObjects) {
        var currentSizeCoords = planeSize[Plane.currentState]; //planeTip, leftWing, rightWing
        for (var i = 0; i < arrayOfObjects.length; i++) {
            //CHECK ONLY IF OPPONENT IS NOT DEAD OR IF IT'S A TYPICAL OBSTACLE
            if ((arrayOfObjects[i].type == "OPPONENT" && !arrayOfObjects[i].dead) || arrayOfObjects[i].type == "OBSTACLE") {
                //ONLY IF APPRROXIMATE DISTANCE IS LESS THAN 500PX;
                if (distanceBetweenPoints(currentSizeCoords.planeTip, arrayOfObjects[i].informations.obstacleBottomLine.pointA) < 500) {
                    for (side in currentSizeCoords) {
                        var pointA = new Point(currentSizeCoords[side].x, currentSizeCoords[side].y);
                        var pointB = new Point(currentSizeCoords[side].x, currentSizeCoords[side].y + controlRestrictions.flyHeight.current);
                        var pointC = new Point(pointB.x, pointB.y);
                        var differenceX = -canvas.camera.stepForward.x * 150;
                        var differenceY = -canvas.camera.stepForward.y * 150;
                        pointC.x += differenceX;
                        pointC.y += differenceY;
                        var lineBC = new Line(pointB, pointC);
                        var obstacleBottomLine = arrayOfObjects[i].informations.obstacleBottomLine;
                        var pointD = intersectionPointOfTwoLineSegments(lineBC, obstacleBottomLine)
                        var obstacleFrontWallCoords = arrayOfObjects[i].informations.wallsCoords;

                        if (pointD) {
                            var pointE = new Point(pointD.x, pointD.y - controlRestrictions.flyHeight.current)
                            if (pointE.belongsToFigure(obstacleFrontWallCoords) && distanceBetweenPoints(pointA, pointE) < Plane.collisionAccuracy) {
                                planeCrash();
                            }
                            //TEMPORARY LINES
                            if (pointE.belongsToFigure(obstacleFrontWallCoords) && DEBUGGING.planeCollision) {
                                canvas.connectPointsWithLine(pointA, pointB, "red");
                                canvas.connectPointsWithLine(pointB, pointD, "red");
                                canvas.connectPointsWithLine(pointD, pointE, "red");
                            };
                        }
                    }//END FOR SIDES
                }//END IF
            }
        }//END FOR ARRAY OF OBJECTS
    }

    //CHECKING COLLISION WHEN PLANE WAS HIT BY OPPONENTS BULLET
    function hitByOpponentsBullet() {
        for (var i = 0; i < currentLevelObjs.opponents.length; i++) {
            for (var j = 0; j < currentLevelObjs.opponents[i].bullets.length; j++) {
                var Bullet = currentLevelObjs.opponents[i].bullets[j];
                var bulletPosition = new Point(Bullet.position.x, Bullet.position.y)

                //CHECKING DISTANCE BETWEEN PLANE AND BULLET POSITION
                if (Plane.currentState != "crashed" && distanceBetweenPoints(planeSize[Plane.currentState].planeTip, bulletPosition) < 500) {
                    //CHECKING FLYGHT OF BULLET AND PLANE
                    var planeMin = controlRestrictions.flyHeight.current - planeSize.height;
                    var planeMax = controlRestrictions.flyHeight.current + planeSize.height;
                    
                    if (Bullet.position.flyHeight >= planeMin && Bullet.position.flyHeight <= planeMax) {
                        if (Bullet.direction == "BACKWARDSSTRAIGHT_AUTO" && Bullet.smashed) {
                            Bullet.hide = true;
                            planeKilledByZaxxon();
                        }
                        if (Bullet.direction != "BACKWARDSSTRAIGHT_AUTO" && !Bullet.smashed &&
                            bulletPosition.belongsToFigure(planeStates[Plane.currentState].coords)) {
                            console.info("COLLISION WITH OPPONENT BULLET")
                            planeCrash();
                        }
                    }
                }
            }
        }
    }

    //CHECKING COLLISION WITH SPACE CRAFTS
    function hitBySpaceCraft() {
        for (var i = 0; i < spaceCraftsArr.length; i++) {
            var craft = spaceCraftsArr[i];
            if (Plane.flyHeight - craft.height/2 <= craft.position.flyHeight && Plane.flyHeight + craft.height/2 >= craft.position.flyHeight) {
                var craftTip = new Point(craft.position.x, craft.position.y);
                if (Plane.currentState !="crashed" && craftTip.belongsToFigure(planeStates[Plane.currentState].coords)) {
                    console.info("PLANE HIT BY SPACE CRAFT SHIP")
                    planeCrash()
                }
            }
        }
    }

    //CHECKING COLLISION WITH SPACE CRATS BULLETS
    function hitBySpaceCraftBullet() {
        if (Plane.currentState == "crashed") { return }
        for (var i = 0; i < spaceCraftsArr.length; i++) {
            var bullets = spaceCraftsArr[i].bullets;
            for (var j = 0; j < bullets.length; j++) {
                var x = bullets[j].position.x;
                var y = bullets[j].position.y;
                var bFlyHeight = bullets[j].position.flyHeight;
                var bPosition = new Point(x, y);
                var planeWallsCoords = planeStates[Plane.currentState].coords;
                if (Plane.flyHeight - spaceCraftsArr[i].height / 2 <= bFlyHeight && Plane.flyHeight + spaceCraftsArr[i].height / 2 >= bFlyHeight) {
                    if (bPosition.belongsToFigure(planeWallsCoords)) {
                        planeCrash();
                        console.info("COLLISION WITH SPACE CRAFT BULLET");
                    }
                }
            }
        }
    }
    /*-------------------------------------- PLANE CRASHES WHEN COLLISION DETECTED -------------------------------------*/
    this.crashed = false;
    this.lifes = _lifes || 3;
    function planeCrash() {
        Plane.crashed = true;
        Plane.currentState = "crashed";
        stateShapes["crashed"].style.animationPlay();
        canvas.saveCameraFlySpeed();
        canvas.camera.flySpeed = 0;
        Plane.lifes--;
        updatePlaneLifes();
        checkLifes();
        SOUNDS.explosion.currentTime = 0;
        SOUNDS.explosion.play();
    }
    function checkLifes() {
        if (Plane.lifes == 0) {
            console.info("NO LIFES -> GAME RESTART")
            RESTART();
        }
    }
    function RESTART() {
        showMessage("GAME OVER", 3);
        disableWarningForFuel();
        Plane.FUEL_STATE = 100;
        setTimeout(function () {
            canvas.setDefaultCameraFlySpeed();
            Plane.lifes = 3;
            Plane.flyHeight = 160;
            Plane.FUEL_STATE = 100;
            Plane.level = 1;
            Plane.refreshStats();
            console.error("BACK TO LEVEL: " + Plane.level)
            setCurrentLevelObj(Plane.level, 286, 117);
            spaceInvasionHasBeenEnded = true;
            outCorrindor = false;
            for (let sound in SOUNDS) {
                SOUNDS[sound].currentTime = 0;
                SOUNDS[sound].pause();
            }
            disableWarningForFuel();
        }, 3000)
    }
    /*------------------------------------------- FLIGHT LEVEL INDICATOR ----------------------------------------------*/
    var segmentsArr, barriersArr;
    function setDefaultFLIGUI() {
        var fliCoords = {
            segments: {
                s0: {
                    A: new Point(0, 142.53), B: new Point(0, 142.53), C: new Point(7.59, 142.53),
                    D: new Point(7.59, 144.38), E: new Point(15.75, 144.38), F: new Point(15.75, 146.25),
                    G: new Point(23.79, 146.25), H: new Point(23.79, 147.98), I: new Point(32, 147.98),
                    J: new Point(32, 147.98), K: new Point(23.79, 147.98), L: new Point(23.79, 146.25),
                    M: new Point(15.75, 146.25), N: new Point(15.75, 144.38), O: new Point(7.59, 144.38),
                    P: new Point(7.59, 142.53),
                },
                s1: {
                    A: new Point(0, 133.5), B: new Point(0, 133.5), C: new Point(7.88, 133.5),
                    D: new Point(7.88, 135.81), E: new Point(15.75, 135.81), F: new Point(15.75, 137.81),
                    G: new Point(23.79, 137.81), H: new Point(23.79, 139.94), I: new Point(32, 139.94),
                    J: new Point(32, 139.94), K: new Point(23.79, 139.94), L: new Point(23.79, 137.81),
                    M: new Point(15.75, 137.81), N: new Point(15.75, 135.81), O: new Point(7.88, 135.81),
                    P: new Point(7.88, 133.5),
                },
                s2: {
                    A: new Point(0, 101.5), B: new Point(0, 101.5), C: new Point(7.88, 101.5),
                    D: new Point(7.88, 103.81), E: new Point(15.75, 103.81), F: new Point(15.75, 105.81),
                    G: new Point(23.79, 105.81), H: new Point(23.79, 107.94), I: new Point(32, 107.94),
                    J: new Point(32, 107.94), K: new Point(23.79, 107.94), L: new Point(23.79, 105.81),
                    M: new Point(15.75, 105.81), N: new Point(15.75, 103.81), O: new Point(7.88, 103.81),
                    P: new Point(7.88, 101.5),
                },
                s3: {
                    A: new Point(0, 69.5), B: new Point(0, 69.5), C: new Point(7.88, 69.5),
                    D: new Point(7.88, 71.81), E: new Point(15.75, 71.81), F: new Point(15.75, 73.81),
                    G: new Point(23.79, 73.81), H: new Point(23.79, 75.94), I: new Point(32, 75.94),
                    J: new Point(32, 75.94), K: new Point(23.79, 75.94), L: new Point(23.79, 73.81),
                    M: new Point(15.75, 73.81), N: new Point(15.75, 71.81), O: new Point(7.88, 71.81),
                    P: new Point(7.88, 69.5)
                },
                s4: {
                    A: new Point(0, 37.5), B: new Point(0, 37.5), C: new Point(7.88, 37.5),
                    D: new Point(7.88, 39.81), E: new Point(15.75, 39.81), F: new Point(15.75, 41.81),
                    G: new Point(23.79, 41.81), H: new Point(23.79, 43.94), I: new Point(32, 43.94),
                    J: new Point(32, 43.94), K: new Point(23.79, 43.94), L: new Point(23.79, 41.81),
                    M: new Point(15.75, 41.81), N: new Point(15.75, 39.81), O: new Point(7.88, 39.81),
                    P: new Point(7.88, 37.5)
                },
                s5: {
                    A: new Point(0, 5.5), B: new Point(0, 5.5), C: new Point(7.88, 5.5),
                    D: new Point(7.88, 7.81), E: new Point(15.75, 7.81), F: new Point(15.75, 9.81),
                    G: new Point(23.79, 9.81), H: new Point(23.79, 11.94), I: new Point(32, 11.94),
                    J: new Point(32, 11.94), K: new Point(23.79, 11.94), L: new Point(23.79, 9.81),
                    M: new Point(15.75, 9.81), N: new Point(15.75, 7.81), O: new Point(7.88, 7.81),
                    P: new Point(7.88, 5.5),
                },
            },
            bariers: {
                b0: {
                    A: new Point(0, 135.81), B: new Point(0, 133.5), C: new Point(7.88, 133.5),
                    D: new Point(7.88, 135.81), E: new Point(15.75, 135.81), F: new Point(15.75, 137.81),
                    G: new Point(23.79, 137.81), H: new Point(23.79, 139.94), I: new Point(32, 139.94),
                    J: new Point(32, 141.69), K: new Point(23.79, 141.69), L: new Point(23.79, 139.94),
                    M: new Point(15.75, 139.94), N: new Point(15.75, 137.81), O: new Point(7.88, 137.81),
                    P: new Point(7.88, 135.81),
                },
                b1: {
                    A: new Point(0, 103.81), B: new Point(0, 101.5), C: new Point(7.88, 101.5),
                    D: new Point(7.88, 103.81), E: new Point(15.75, 103.81), F: new Point(15.75, 105.81),
                    G: new Point(23.79, 105.81), H: new Point(23.79, 107.94), I: new Point(32, 107.94),
                    J: new Point(32, 109.69), K: new Point(23.79, 109.69), L: new Point(23.79, 107.94),
                    M: new Point(15.75, 107.94), N: new Point(15.75, 105.81), O: new Point(7.88, 105.81),
                    P: new Point(7.88, 103.81),
                },
                b2: {
                    A: new Point(0, 71.81), B: new Point(0, 69.5), C: new Point(7.88, 69.5),
                    D: new Point(7.88, 71.81), E: new Point(15.75, 71.81), F: new Point(15.75, 73.81),
                    G: new Point(23.79, 73.81), H: new Point(23.79, 75.94), I: new Point(32, 75.94),
                    J: new Point(32, 77.69), K: new Point(23.79, 77.69), L: new Point(23.79, 75.94),
                    M: new Point(15.75, 75.94), N: new Point(15.75, 73.81), O: new Point(7.88, 73.81),
                    P: new Point(7.88, 71.81),
                },
                b3: {
                    A: new Point(0, 39.81), B: new Point(0, 37.5), C: new Point(7.88, 37.5),
                    D: new Point(7.88, 39.81), E: new Point(15.75, 39.81), F: new Point(15.75, 41.81),
                    G: new Point(23.79, 41.81), H: new Point(23.79, 43.94), I: new Point(32, 43.94),
                    J: new Point(32, 45.69), K: new Point(23.79, 45.69), L: new Point(23.79, 43.94),
                    M: new Point(15.75, 43.94), N: new Point(15.75, 41.81), O: new Point(7.88, 41.81),
                    P: new Point(7.88, 39.81),
                },
                b4: {
                    A: new Point(0, 7.81), B: new Point(0, 5.5), C: new Point(7.88, 5.5),
                    D: new Point(7.88, 7.81), E: new Point(15.75, 7.81), F: new Point(15.75, 9.81),
                    G: new Point(23.79, 9.81), H: new Point(23.79, 11.94), I: new Point(32, 11.94),
                    J: new Point(32, 13.69), K: new Point(23.79, 13.69), L: new Point(23.79, 11.94),
                    M: new Point(15.75, 11.94), N: new Point(15.75, 9.81), O: new Point(7.88, 9.81),
                    P: new Point(7.88, 7.81),
                },
            },
        };
        //OFFSETING FLI COORDS TO THE CANVAS
        for (let barrOrSegm in fliCoords) {
            for (let shape in fliCoords[barrOrSegm]) {
                for (let coordName in fliCoords[barrOrSegm][shape]) {
                    fliCoords[barrOrSegm][shape][coordName].x += canvas.vievOffset.x || 0;
                    fliCoords[barrOrSegm][shape][coordName].y += canvas.vievOffset.y || 0;
                }
            }
        }
        //OFFSETING FLI COORDS TO THE CORRECT PLACE
        for (let barrOrSegm in fliCoords) {
            for (let shape in fliCoords[barrOrSegm]) {
                for (let coordName in fliCoords[barrOrSegm][shape]) {
                    fliCoords[barrOrSegm][shape][coordName].x += 20;
                    fliCoords[barrOrSegm][shape][coordName].y += 62;
                }
            }
        }
        //CREATING SEGMENTS AND BARRIES SHAPE
        segmentsArr = [];
        barriersArr = [];
        for (let barrOrSegm in fliCoords) {
            for (let shape in fliCoords[barrOrSegm]) {
                var cShape = new CustomShape(fliCoords[barrOrSegm][shape]);
                if (barrOrSegm == "segments") {
                    cShape.style.backgroundColor("#165f08");
                    segmentsArr.push(cShape);
                }
                else if (barrOrSegm == "bariers") {
                    //cShape.style.backgroundColor("black");
                    barriersArr.push(cShape);
                }
            }
        }
    }
    setDefaultFLIGUI();

    //DRAWING
    this.drawFLI = function () {
        FLI.update();
        //DRAWING SEGMENTS
        for (var i = 0; i < segmentsArr.length; i++) { segmentsArr[i].draw(); }

        //DRAWING BARRIERS
        for (var i = 0; i < barriersArr.length; i++) { barriersArr[i].draw(); }
    }

    var FLI = {
        followCamera: function () {
            //SEGMENTS
            for (var i = 0; i < segmentsArr.length; i++) {
                for (let coordName in segmentsArr[i].wallsCoords) {
                    var differenceX = canvas.camera.stepForward.x * canvas.camera.flySpeed;
                    var differenceY = canvas.camera.stepForward.y * canvas.camera.flySpeed;
                    segmentsArr[i].wallsCoords[coordName].x -= differenceX;
                    segmentsArr[i].wallsCoords[coordName].y -= differenceY;
                }
            }

            //BARRIERS
            for (var i = 0; i < barriersArr.length; i++) {
                for (let coordName in barriersArr[i].wallsCoords) {
                    var differenceX = canvas.camera.stepForward.x * canvas.camera.flySpeed;
                    var differenceY = canvas.camera.stepForward.y * canvas.camera.flySpeed;
                    barriersArr[i].wallsCoords[coordName].x -= differenceX;
                    barriersArr[i].wallsCoords[coordName].y -= differenceY;
                }
            }
        },

        //UPDATING FLIHEIGHT
        update: function () {

            setDefaultFLIGUI();

            var segmentsRageArray = [
                { min: 0, max: 6 }, { min: 6, max: 36 }, { min: 36, max: 66 },
                { min: 66, max: 96 }, { min: 96, max: 126 }, { min: 126, max: 132 },
            ];

            var currentFlyHeight = controlRestrictions.flyHeight.current
            currentFlyHeight = currentFlyHeight.map(28, 160, 8, 132);

            var index = undefined;
            if (currentFlyHeight >= 0 && currentFlyHeight <= 6) { index = 1; }
            if (currentFlyHeight > 6 && currentFlyHeight <= 36) { index = 2; }
            if (currentFlyHeight > 36 && currentFlyHeight <= 66) { index = 3; }
            if (currentFlyHeight > 66 && currentFlyHeight <= 96) { index = 4; }
            if (currentFlyHeight > 96 && currentFlyHeight <= 126) { index = 5; }
            if (currentFlyHeight > 126 && currentFlyHeight <= 132) { index = 6; }

            //SETTING HIGHT OF EACH SEGMENTS
            for (var i = 0; i < index-1; i++) {
                for (let coordName in segmentsArr[i].wallsCoords) {
                    if (coordName == "B" || coordName == "C" || coordName == "D" || coordName == "E" ||
                        coordName == "F" || coordName == "G" || coordName == "H" || coordName == "I") {
                        segmentsArr[i].wallsCoords[coordName].y -= segmentsRageArray[i].max - segmentsRageArray[i].min
                    }
                }
            }
            if (index >= 2) {
                for (let coordName in segmentsArr[index - 1].wallsCoords) {
                    if (coordName == "B" || coordName == "C" || coordName == "D" || coordName == "E" ||
                        coordName == "F" || coordName == "G" || coordName == "H" || coordName == "I") {
                        segmentsArr[index - 1].wallsCoords[coordName].y -= currentFlyHeight - segmentsRageArray[index - 2].max
                    }
                }
            }

            //SETTING COLOR FOR BARRIERS
            for (var i = index-1; i < barriersArr.length; i++) {
                barriersArr[i].style.backgroundColor("#165f08");
            }

        }
    }
    /*----------------------------------------------- POINTS / SCORE --------------------------------------------------*/
    this.SCORE = 0;
    var SCORING = {
        FuelTank: 300,
        BaseMissiles: 150,
        //GunImplacement: selectRandomFromArray([200, 500]),
        RadarTower: 1000,
        SpaceCraft: 100 + 50 * (Plane.level - 1),
        Zaxxon: 1000,
        Saucer: 0,
    }
    this.addPoints = function (classNameOfOpponent) {
        let toAdd = undefined;
        if (classNameOfOpponent != "GunImplacement1" && classNameOfOpponent != "GunImplacement2")
            toAdd = SCORING[classNameOfOpponent];
        else if (classNameOfOpponent == "GunImplacement1" || classNameOfOpponent == "GunImplacement2")
            toAdd = selectRandomFromArray([200, 500]);

        if (toAdd) this.SCORE += toAdd;
        else
            console.error("UNABLE TO ADD POINTS IN PLANE OBJECT. CLASS NAME OF OPPONENT: " + classNameOfOpponent + " UNRECOGNIZED");

        //EP_AMOUNT
        if (classNameOfOpponent == "somthing") {
            this.EP_AMOUNT -= 1;
            updateEpAmount();
        }

        this.FUEL_STATE += 10;
        if (this.FUEL_STATE > 100) { this.FUEL_STATE = 100; }
        updateCurrentShore();
        updateBestScore();

        //AUDIO
        SOUNDS.explosion.currentTime = 0;
        SOUNDS.explosion.play();
    }
    /*------------------------------------------------- Zaxxon behavior -----------------------------------------------*/
    var zaxxSett = {
        obj: undefined,
        cameraSlowed: false,
        cameraStoped: false,
        planeKilled: false,
        zaxxonKilled: false,
        zaxxMovements: false,
    }

    var SAVED_POS = {
        x: undefined,
        y: undefined,
    }
    var savePlaneTipPos = function () {
        SAVED_POS.x = Plane.planeTip.x;
        SAVED_POS.y = Plane.planeTip.y;
    }

    //CALLED WHEN ZAXXON KILLED BY PLANE
    this.resetZaxxSett = function () {
        zaxxSett.zaxxonKilled = true;
        zaxxSett.obj.getCustomShape().style.changeBackgroundImage(PRELOADED.images.zaxxonKilled);
        setTimeout(function () {//WAINING BECAUSE THERE MIGHT BE A SITUATION WHEN ZAXXON FIRED A RACKET
            if (!zaxxSett.planeKilled) {
                console.info("ZAXXON KILLED BY PLANE")
                showMessage("CONGRATULATIONS!!!<br/>YOU GET", 3)
                disableWarningForFuel();
                setTimeout(function () {
                    Plane.flyHeight = 160;
                    Plane.FUEL_STATE = 100;
                    Plane.level++;
                    Plane.EP_AMOUNT = 20;
                    setCurrentLevelObj(Plane.level, 286, 117);
                    //SETTINGS RESET
                    zaxxSett = {
                        obj: undefined, cameraSlowed: false, cameraStoped: false, planeKilled: false,
                        zaxxonKilled: false, 
                    }
                    canvas.restoreCameraFlySpeed();
                    disableWarningForFuel();
                    console.info("RESTORING CAMERA SPEED: " + canvas.camera.flySpeed)
                }, 2000)
            }
        }, 3000)
    }

    //PLANE KILLED BY ZAXXON
    function planeKilledByZaxxon() {
        console.info("PLANE KILLED BY ZAXXON");
        Plane.crashed = true;
        Plane.currentState = "crashed";
        zaxxSett.planeKilled = true;
        let x = 641 / 2;
        let y = 354;
        x -= Math.abs(canvas.vievOffset.x - Plane.planeTip.x);
        y -= Math.abs(canvas.vievOffset.y - Plane.planeTip.y);
        stateShapes["crashed"].style.animationOffset(x, y);
        stateShapes["crashed"].style.animationPlay();
        SOUNDS.explosion.currentTime = 0;
        SOUNDS.explosion.play();
        disableWarningForFuel();

        //ONE MORE TRY
        if (Plane.lifes - 1 > 0) {
            disableWarningForFuel();
            Plane.FUEL_STATE = 100;
            setTimeout(function () {
                canvas.restoreCameraFlySpeed()
                Plane.lifes -= 1;
                Plane.flyHeight = 160;
                Plane.FUEL_STATE = 100;
                Plane.refreshStats();
                createAllLevels();

                setCurrentLevelObj(Plane.level, 286, 117, canvas.vievOffsetSave);
                canvas.restoreVievOffet();

                for (let sound in SOUNDS) {
                    SOUNDS[sound].currentTime = 0;
                    SOUNDS[sound].pause();
                }
                disableWarningForFuel();
            }, 3000)
        }
        //WHOLE GAME RESTART
        else {
            setTimeout(function () { RESTART() }, 2000)
        }
    }
    var tempOnceTime = false;
    function zaxxonBehavior() {
        //LOOKING FOR ZAXXON IN THE ARR
        if(!zaxxSett.obj){
            for (var i = 0; i < currentLevelObjs.opponents.length; i++) {
                if (currentLevelObjs.opponents[i].className == "Zaxxon") {
                    zaxxSett.obj = currentLevelObjs.opponents[i];
                    zaxxSett.obj.enableShooting = false;
                    break;
                }
            }
            if (!zaxxSett.obj) { console.error("ZAXXON OBJECT COUND'T BE FIND IN OPPONENTS ARR") }
        }

        if (zaxxSett.obj && distanceToTheZaxxon()< 1000 && !tempOnceTime) {
            tempOnceTime = true;
            canvas.saveCurrentVievOffset();
            //savePlaneTipPos();
            console.info("SAVING CURRENT VIEV OFFSET")
        }

        //CAMERA SLOW DOWN
        if (!zaxxSett.cameraSlowed) {
            if (distanceToTheZaxxon() < 500) {
                canvas.saveCameraFlySpeed();
                console.info("SAVING CAMERA SPEED: " + canvas.camera.flySpeed)
                zaxxSett.cameraSlowed = true;
            }
        }
        
        //WHEN CAMERA SLOW DOWN -> WAINTING FOR TO BE CLOSE TO THE ZAXXON
        if (zaxxSett.cameraSlowed) {
            if (distanceToTheZaxxon() < 300) {
                zaxxSett.cameraStoped = true;
                zaxxSett.zaxxMovements = true;
                setTimeout(function () {
                    if (zaxxSett.obj) { zaxxSett.obj.enableShooting = true; }
                }, 6000)
            }
        }

        //ZAXXON MOVEMENTS
        if (zaxxSett.zaxxMovements && distanceToTheZaxxon() > 100 && !zaxxSett.zaxxonKilled) {
            zaxxonMovements();//zaxxon started to move
        }
    }

    //CHECKING DISTANCE TO THE ZAXXON
    function distanceToTheZaxxon() {
        var rightVect = new Vector(4 * 300, 1 * 300);
        var pointA = Plane.planeTip.copy();

        var pointB = pointA.copy();
        pointB.y += controlRestrictions.flyHeight.current;
        var pointG = pointB.copy();
        pointG.x += -rightVect.x;
        pointG.y += -rightVect.y;

        var pointC = pointB.copy();
        pointC.x += rightVect.x;
        pointC.y += rightVect.y;

        var lineGC = new Line(pointG, pointC);

        var pointD = zaxxSett.obj.informations.obstacleBottomLine.pointA;
        var pointE = pointD.copy();
        pointE.x += canvas.camera.stepForward.x * 300;
        pointE.y += canvas.camera.stepForward.y * 300;

        var lineDE = new Line(pointD, pointE);
        var pointF = intersectionPointOfTwoLineSegments(lineDE, lineGC);

        if (pointF) {
            var dist = distanceBetweenPoints(pointF, pointD)
            return dist;
        }
        else { return undefined; }
    }

    //ZAXXON MOVEMETS
    function zaxxonMovements() {
        let zaxx = zaxxSett.obj.getCustomShape();//wallsCoords
        //step1 - mid point
        var pointA = new Point(zaxx.wallsCoords.A.x, zaxx.wallsCoords.A.y);
        var pointD = new Point(zaxx.wallsCoords.D.x, zaxx.wallsCoords.D.y);
        var midPoint = new Point((pointA.x + pointD.x) / 2, (pointA.y + pointD.y) / 2);
        //step2
        var vect1 = new Vector(Plane.planeTip.x - midPoint.x, Plane.planeTip.y + Plane.flyHeight - midPoint.y);
        vect1.normalize();

        for (let coord in zaxx.wallsCoords) {
            //shape
            zaxx.wallsCoords[coord].x += vect1.x;
            zaxx.wallsCoords[coord].y += vect1.y;

            //background
            zaxx.style.backgroundImageIncreaseOffset(vect1.x, vect1.y);
        }
    }
    /*------------------------------------------------- FUEL UPDATE ---------------------------------------------------*/
    this.FUEL_STATE = _fuelState || 100; //(0-100);
    //FUEL GOES UP WHEN POINTS ADDED;
    this.updateFuelState = function () {
        if (this.FUEL_STATE > 0 && !zaxxSett.zaxxonKilled && !zaxxSett.planeKilled) { this.FUEL_STATE -= 0.05; }
        if (this.FUEL_STATE <= 0 && !this.crashed) {
            disableWarningForFuel();
            console.info("THE END OF FUEL")
            planeCrash();
        }

        //DISPLAYING SEGMENTS
        for (var i = 0; i < 64; i++) {
            document.getElementById("sgm" + i).style.display = "none";
        }
        var sgmEnd = Math.floor(this.FUEL_STATE.map(0, 100, 0, 64));
        for (var i = 0; i < sgmEnd; i++) {
            try {
                document.getElementById("sgm" + i).style.display = "inline-block";
            } catch (e) { console.error("display segment: "+i) }
        }

        //WARNING BAR
        if (this.FUEL_STATE < 30) {
            var width = Math.floor((100 - this.FUEL_STATE).map(0, 100, 0, 256));
            document.getElementById("fuelWarningBar").style.width = width + "px";
            if (!warningBarEffects.enable) {
                enableWarningForFuel();
            }
        }
        else { disableWarningForFuel(); }
    }

    //WARNING BAR
    let warningBarEffects = {
        audio: SOUNDS.lowFuel,
        interval: undefined,
        enable: false,
        couter: 1,
    }
    function enableWarningForFuel() {
        warningBarEffects.enable = true;
        warningBarEffects.interval = setInterval(function () {
            //FLICKERING BAR
            warningBarEffects.couter++;
            if (warningBarEffects.couter % 2 == 0) {
                document.getElementById("fuelWarningBar").style.display = "none";
            } else {
                document.getElementById("fuelWarningBar").style.display = "inline-block";
                warningBarEffects.audio.play();
            }
        }, 1000)
    }
    function disableWarningForFuel() {
        warningBarEffects.audio.currentTime = 0;
        warningBarEffects.audio.pause();
        warningBarEffects.enable = false;
        warningBarEffects.couter = 1;
        clearInterval(warningBarEffects.interval);
        //warningBarEffects.interval = undefined;
        document.getElementById("fuelWarningBar").style.display = "none";
    }
    this.pernamentFuelWarningKill = function () { disableWarningForFuel(); }
    /*------------------------------------------------ PLANE STATS ----------------------------------------------------*/
    this.enablePlaneStats = function () {
        enableFluelState();
        showPlaneLifes();
        updatePlaneLifes();
        showCurrentShore();
        updateCurrentShore();
        showBestScore();
        updateBestScore();
        showEpAmount()
        updateEpAmount();
    }
    this.refreshStats = function () {
        document.getElementById("fuelState").innerHTML = "";
        document.getElementById("opponents").innerHTML = "";
        document.getElementById("topScore").innerHTML = "";
        document.getElementById("currentScore").innerHTML = "";
        document.getElementById("lifes").innerHTML = "";
        this.enablePlaneStats()
    }

    //CREATING FUEL BARS
    //var fuelSegments = [];
    function enableFluelState() {
        var E = document.createElement("p");
        E.innerHTML = "E";
        document.getElementById("fuelState").appendChild(E);

        var div = document.createElement("div");
        div.id = "fuelSegmentsHolder";
        document.getElementById("fuelState").appendChild(div);

        var div = document.createElement("div");
        div.id = "fuelWarningBar";
        document.getElementById("fuelSegmentsHolder").appendChild(div);

        var F = document.createElement("p");
        F.innerHTML = "F";        
        document.getElementById("fuelState").appendChild(F);

        //SEGMENTS
        var counter = 0;
        var counterID = 0;
        for (var i = 0; i < 16; i++){
            for (var j=1; j <= 4; j++){
                var sgm = document.createElement("div");
                sgm.setAttribute("class", "s0" + j);
                sgm.id = "sgm" + counterID;
                counterID++;
                sgm.style.left = counter + "px";
                counter += 4;
                document.getElementById("fuelSegmentsHolder").appendChild(sgm);
            }
        }
    }
    /*---------------------------------------------------------- PLANE LIFES -------------------------------------------*/
    function showPlaneLifes() {
        //<p class="brown" > P=</p >
        //<p class="yellow" id="lifesAmount"></p>
        var p1 = document.createElement("p");
        p1.className = "brown";
        p1.innerHTML = "P=";
        document.getElementById("lifes").appendChild(p1);

        var p2 = document.createElement("p");
        p2.className = "yellow";
        p2.id = "lifesAmount";
        document.getElementById("lifes").appendChild(p2);
    }

    function updatePlaneLifes() {
        var lifes = Plane.lifes;
        lifes = padWithZeroes(lifes, 2);
        document.getElementById("lifesAmount").innerHTML = lifes;
    }
    /*------------------------------------------------------ CURRENT SCORE ---------------------------------------------*/
    function showCurrentShore() {
        //<p class="brown">1UP</p>
        //<p class="yellow" id="currentScoreAmount"></p>
        var p1 = document.createElement("p");
        p1.className = "brown";
        p1.innerHTML = "1UP";
        document.getElementById("currentScore").appendChild(p1);

        var p2 = document.createElement("p");
        p2.className = "yellow";
        p2.id = "currentScoreAmount";
        document.getElementById("currentScore").appendChild(p2);
    }
    function updateCurrentShore() {
        var scr = Plane.SCORE;
        scr = padWithZeroes(scr, 6);
        document.getElementById("currentScoreAmount").innerHTML = scr;
    }
    /*---------------------------------------------------- BEST SCORES ------------------------------------------------*/
    function showBestScore() {
        //<p class="brown">TOP=</p>
        //<p class="yellow" id="topScoreAmount"></p>
        var p1 = document.createElement("p");
        p1.className = "brown";
        p1.innerHTML = "TOP=";
        document.getElementById("topScore").appendChild(p1);

        var p2 = document.createElement("p");
        p2.className = "yellow";
        p2.id = "topScoreAmount";
        document.getElementById("topScore").appendChild(p2);
    }
    function updateBestScore() {
        var year = new Date().getFullYear() + 20;
        //IF COOKIES ARE EMPTY
        if (document.cookie == "") {//CURRENT SCORE IS THE BEST
            //SAVING TO COOKIE
            document.cookie = Plane.SCORE + "; expires=Thu, 18 Dec " + year + " 12:00:00 UTC";
        } else {//IF COOKIES NOT EMPTY
            var curBestScore = parseInt(document.cookie);
            if (curBestScore < Plane.SCORE) {
                document.cookie = Plane.SCORE + "; expires=Thu, 18 Dec " + year + " 12:00:00 UTC";
            }
        }
        //DISPLAYING
        var scr = padWithZeroes(parseInt(document.cookie), 6);
        document.getElementById("topScoreAmount").innerHTML = scr;
    }
    /*-------------------------------------------------- EP AMOUNT ----------------------------------------------------*/
    this.EP_AMOUNT = 20;
    function showEpAmount() {
        //<p class="brown">EP=</p>
        //<p class="yellow" id="opponentsAmount"></p>
        var p1 = document.createElement("p");
        p1.className = "brown";
        p1.innerHTML = "EP=";
        document.getElementById("opponents").appendChild(p1);

        var p2 = document.createElement("p");
        p2.className = "yellow";
        p2.id = "opponentsAmount";
        document.getElementById("opponents").appendChild(p2);
    }
    function updateEpAmount() {
        var am = Plane.EP_AMOUNT;
        am = padWithZeroes(am, 2);
        document.getElementById("opponentsAmount").innerHTML = am;
    }
    /*------------------------------------ WHEN PLANE CRASH GOES BACK -------------------------------------------------*/
    let once = false;
    function planeGoesBack(val) {
        if (!once) {
            console.info("PLANE CAPUT")
            once = true;
            var goesUp = setInterval(function () {
                if (controlRestrictions.flyHeight.current <= 150) {
                    Plane.move.up = true;
                    Plane.blockMove.down = true;
                    Plane.blockMove.left = true;
                    Plane.blockMove.right = true;
                    planeControl();
                }
                if (controlRestrictions.flyHeight.current > 150) {
                    clearInterval(goesUp);
                    stateShapes["up"].hide = false;
                    Plane.move.up = false;
                    Plane.FUEL_STATE = 100;
                    disableWarningForFuel();
                    if (!val) { val = 200; }
                    var differenceX = canvas.camera.stepForward.x * val;
                    var differenceY = canvas.camera.stepForward.y * val;

                    //CAMERA BACKS
                    canvas.vievOffset.x += differenceX;
                    canvas.vievOffset.y += differenceY;
                    canvas.restoreCameraFlySpeed();

                    //PLANE GOES BACK
                    var x = (Plane.planeTip.x + differenceX - 2) - canvas.vievOffset.x - canvas.camera.stepForward.x * canvas.cameraFlySpeedSave;
                    var y = (Plane.planeTip.y + differenceY) - canvas.vievOffset.y - canvas.camera.stepForward.y * canvas.cameraFlySpeedSave;
                    duplicatePlane(x, y, Plane.level, Plane.lifes, Plane.flyHeight, Plane.FUEL_STATE);
                }
            }, 10)
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------*/
}

function duplicatePlane(x, y, _level, _lifes, _flyHeight, _fuelState) {
    plane = new Plane(x, y, _level, _lifes, _flyHeight, _fuelState);
}