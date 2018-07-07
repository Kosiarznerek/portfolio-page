function SpaceCraft(x, y, flyHeight, ableToShoot, ableToChangeFlyHeight) {
    //POSITION
    this.position = {
        x: x || canvas.vievOffset.x,
        y: y || canvas.vievOffset.y,
        flyHeight: flyHeight,
    }

    //HEIGHT
    this.height = (160 - 26) / 2;
    this.ableToChangeFlyHeight = ableToChangeFlyHeight;

    //PRIVATE COORDS
    var spaceCoords = {
        w01: {//the biggets
            point01: new Point(0, 0), point02: new Point(0, -7.5), point03: new Point(4.88, -7.5),
            point04: new Point(4.88, -12.25), point05: new Point(10.5, -12.25), point06: new Point(10.5, -15.25),
            point07: new Point(15.75, -15.25), point08: new Point(15.75, -25.75), point09: new Point(21.75, -25.75),
            point10: new Point(21.75, -23), point11: new Point(33, -23), point12: new Point(33, -25.75),
            point13: new Point(38.75, -25.75), point14: new Point(38.75, -29), point15: new Point(44.5, -29),
            point16: new Point(44.5, -18.25), point17: new Point(49.63, -18.25), point18: new Point(49.63, -15.25),
            point19: new Point(54.25, -15.25), point20: new Point(54.25, -12.25), point21: new Point(60.38, -12.25),
            point22: new Point(60.38, -9.88), point23: new Point(66, -9.88), point24: new Point(66, -7.5),
            point25: new Point(28, -7.5), point26: new Point(28, -3.75), point27: new Point(17.25, -3.75),
            point28: new Point(17.25, -1.75), point29: new Point(10.5, -1.75), point30: new Point(10.5, 0),
        },
        w02: {
            point01: new Point(0, 0), point02: new Point(0, -6.13), point03: new Point(5.88, -6.13),
            point04: new Point(5.88, -11), point05: new Point(10.63, -11), point06: new Point(10.63, -14),
            point07: new Point(15.88, -14), point08: new Point(15.88, -23.13), point09: new Point(23.25, -23.13),
            point10: new Point(23.25, -20.25), point11: new Point(26.38, -20.25), point12: new Point(26.38, -23.13),
            point13: new Point(32.63, -23.13), point14: new Point(32.63, -25), point15: new Point(39.38, -25),
            point16: new Point(39.38, -14), point17: new Point(45.13, -14), point18: new Point(45.13, -11),
            point19: new Point(50.25, -11), point20: new Point(50.25, -8.56), point21: new Point(56, -8.56),
            point22: new Point(56, -4.75), point23: new Point(16.63, -4.75), point24: new Point(16.63, -3.06),
            point25: new Point(11.38, -3.06), point26: new Point(11.38, 0),
        },
        w03: {
            point01: new Point(0, 0), point02: new Point(0, -5.25), point03: new Point(4.42, -5.25),
            point04: new Point(4.42, -9.17), point05: new Point(10.75, -9.17), point06: new Point(10.75, -11.08),
            point07: new Point(13.92, -11.08), point08: new Point(13.92, -18.75), point09: new Point(20, -18.75),
            point10: new Point(20, -16.25), point11: new Point(22.58, -16.25), point12: new Point(22.58, -18.75),
            point13: new Point(28, -18.75), point14: new Point(28, -21), point15: new Point(33.33, -21),
            point16: new Point(33.33, -11.42), point17: new Point(38.33, -11.42), point18: new Point(38.33, -9.17),
            point19: new Point(42.08, -9.17), point20: new Point(42.08, -6.5), point21: new Point(48, -6.5),
            point22: new Point(48, -3.67), point23: new Point(14.33, -3.67), point24: new Point(14.33, -1.58),
            point25: new Point(10.75, -1.58), point26: new Point(10.75, 0),
        },
        w04: {//the smallest
            point01: new Point(0, 0), point02: new Point(0, -5.42), point03: new Point(2.33, -5.42),
            point04: new Point(2.33, -7.33), point05: new Point(4.67, -7.33), point06: new Point(4.67, -12.25),
            point07: new Point(10, -12.25), point08: new Point(10, -10.08), point09: new Point(14.92, -10.08),
            point10: new Point(14.92, -12.25), point11: new Point(20.92, -12.25), point12: new Point(20.92, -15),
            point13: new Point(26.67, -15), point14: new Point(26.67, -7.5), point15: new Point(30.58, -7.5),
            point16: new Point(30.58, -4.17), point17: new Point(36, -4.17), point18: new Point(36, -1.92),
            point19: new Point(10, -1.92), point20: new Point(10, 0),
        }
    }

    //OFFSETTING COORDS TO THE POSITION
    for (let shape in spaceCoords) {
        for (let point in spaceCoords[shape]) {
            spaceCoords[shape][point].x += this.position.x;
            spaceCoords[shape][point].y += this.position.y;
        }
    }

    //CREATING SHAPES
    this.shapes = {
        s01: new CustomShape(spaceCoords.w01),
        s02: new CustomShape(spaceCoords.w02),
        s03: new CustomShape(spaceCoords.w03),
        s04: new CustomShape(spaceCoords.w04),
    }

    //SETTING STYLE
    this.shapes.s01.style.backgroundImage(PRELOADED.images.spaceCraft01, spaceCoords.w01.point01, 0, 29);
    this.shapes.s02.style.backgroundImage(PRELOADED.images.spaceCraft02, spaceCoords.w02.point01, 0, 25);
    this.shapes.s03.style.backgroundImage(PRELOADED.images.spaceCraft03, spaceCoords.w03.point01, 0, 21);
    this.shapes.s04.style.backgroundImage(PRELOADED.images.spaceCraft03, spaceCoords.w04.point01, 0, 15);
    //this.shapes.s01.style.backgroundColor(randomRGBColor()); //temp
    //this.shapes.s02.style.backgroundColor(randomRGBColor()); //temp
    //this.shapes.s03.style.backgroundColor(randomRGBColor()); //temp
    //this.shapes.s04.style.backgroundColor(randomRGBColor()); //temp

    //CURRENT STATE
    var currentState = undefined;
    this.getCurrentState = function () { return currentState; }

    //DRAW
    this.crashed = false;
    this.draw = function () {
        if (!this.crashed) {
            this.shapes[currentState].draw();
        }
    }

    //UPDATING
    this.update = function () {
        var flyVal = this.position.flyHeight.map(26, 160, 0, 4);
        if (flyVal >= 0 && flyVal < 1) { currentState = "s04"; }
        if (flyVal >= 1 && flyVal < 2) { currentState = "s03"; }
        if (flyVal >= 2 && flyVal < 3) { currentState = "s02"; }
        if (flyVal >= 3 && flyVal <= 4) { currentState = "s01"; }
    }

    //FLY HEIGHT UPDATE
    let changeFlyHeight = {
        value: 2, // HOW FAST IT'S CHANGE THE FLY HEIGHT AND UP OR DOWN
    }
    this.updateFlyHeight = function () {
        if (!this.ableToChangeFlyHeight) { return }

        //CHECKING IF IT CAN STILL GO IN DIRECTION
        if (this.position.flyHeight + changeFlyHeight.value <= 26 || this.position.flyHeight + changeFlyHeight.value >= 160) {
            changeFlyHeight.value *= -1;
        }

        //APPLYING FLY HEIGHT TO SHAPE
        for (let shape in spaceCoords) {
            for (let point in spaceCoords[shape]) {
                spaceCoords[shape][point].y += changeFlyHeight.value;
            }
        }

        //UPDATING FLY HEIGHT
        this.position.flyHeight += changeFlyHeight.value;
    }

    //CHECKING IF SPACECRAFT IN ON CANVAS
    this.leftCanvas = function () {
        var tip = this.shapes[currentState].wallsCoords.point01;
        if (tip.x - canvas.vievOffset.x < -48 ||
            tip.y - canvas.vievOffset.y > canvas.height + 28) {
            return true;
        }
        else { return false }
    }
    this.isOnCanvas = function () {
        if (this.position.x - canvas.vievOffset.x < (canvas.width - 48) &&
                        this.position.x - canvas.vievOffset.x > 0 &&
                        this.position.y - canvas.vievOffset.y > 28 &&
                        this.position.y - canvas.vievOffset.y < canvas.height) {
            return true;
        }
        else { return false }
    }

    //SHOOTING
    this.bullets = [];
    this.canShoot = ableToShoot;
    this.shoot = function () {
        if (this.canShoot && this.bullets.length < 1 && !this.crashed) {
            var bullet = new Bullet(this.position.x, this.position.y, this.position.flyHeight, "BACKWARDSSTRAIGHT");
            this.bullets.push(bullet);
        }

        //REMOVING BULLETS WHICH LEAVE CANVAS
        for (var i = 0; i < this.bullets.length ; i++) {
            if (this.bullets[i].isOffTheCanvas()) { this.bullets.splice(i, 1); i--; }
        }

        for (var i = 0; i < this.bullets.length; i++) {
            //APLYING SPEED
            this.bullets[i].applyForce();
            //DRAWING
            this.bullets[i].draw();
        }
    }
}