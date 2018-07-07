class Bomb {
    /**
     * Creates Bomb object
     * @param {Vector2} position
     * @param {Number} flyHeigth
     */
    constructor(position, flyHeigth) {
        //Class name
        this.className = "BOMB";

        this.flyHeigth = flyHeigth;
        this.position = position.clone();

        //Drop down animation
        this._dropDownAnimation = {
            array: [IMAGES.BOMB_01, IMAGES.BOMB_02],
            counter: 0,
            currentFrame: 0.
        };
        this.image = IMAGES.BOMB_01;
    }

    /**
     * Draws Bomb object on canvas context
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    /**
     * Causes than bomb is falling down
     */
    dropUpdate() {
        //Dropped exactly in that place
        let mapForce = GAME_MAP.moveVector.clone();
        mapForce.multiplyScalar(-1);
        mapForce.multiplyScalar(GAME_MAP.speed);
        this.position.add(mapForce);

        //Skip rest when bomb hits the ground
        if (this.flyHeigth <= 0) { return }

        //Drop down
        let gravity = new Vector2(0, 1);
        gravity.multiplyScalar(3);
        this.position.add(gravity);
        this.flyHeigth -= gravity.y;
    }

    /**
     * Updates drop down animation
     */
    updateDropDownAnimation() {
        //When it hit the ground updating drop down animation is not necessary
        if (this.flyHeigth <= 0) {
            if (!this.image.src.includes("images/bomb/smashed.png")) {//changing graphic only once
                this.image = IMAGES.BOMB_SMASHED;
            }
            return
        }

        //Incresing counter
        this._dropDownAnimation.counter++;
        if (this._dropDownAnimation.counter + 1 >= Number.MAX_SAFE_INTEGER) {
            this._dropDownAnimation.counter = 0;
        }

        //Next frame
        if (this._dropDownAnimation.counter % 10 === 0) {
            this._dropDownAnimation.currentFrame++;
            if (this._dropDownAnimation.currentFrame >= this._dropDownAnimation.array.length) {//looping animation
                this._dropDownAnimation.currentFrame = 0;
            }
        }

        //Updating image
        let frame = this._dropDownAnimation.currentFrame;
        this.image = this._dropDownAnimation.array[frame];
    }

    /**
     * Checks if Bomb object left canvas
     * @returns {boolean}
     */
    leftCanvas() {
        if (this.position.x <= -80 || this.position.x >= 702) { return true }
        if (this.position.y <= -80 || this.position.y >= 394) { return true }
        return false
    }

    /**
     * Checks if bomb hit Building object
     * @returns {Building}
     */
    hitsBuilding() {
        if (this.flyHeigth > 0) { return }

        for (let i = 0; i < BUILDINGS.length; i++) {
            let bPosition = BUILDINGS[i].position.clone();

            let buildingCoors = [
                new Vector2(bPosition.x, bPosition.y),
                new Vector2(bPosition.x + 96, bPosition.y),
                new Vector2(bPosition.x + 96, bPosition.y + 48),
                new Vector2(bPosition.x, bPosition.y + 48),
            ];

            //Checking collision
            if (this.position.belongsToPolygon(buildingCoors)) {
                return BUILDINGS[i];
            }
        }
    }
}