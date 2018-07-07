class Player {
    /**
     * Creates Player object
     * @param {Vector2} position
     */
    constructor(position) {
        //Position
        this.position = position;

        //Color mode
        this.colorMode = "yellow";

        //Animations
        this._animations = {
            //colorMode="yellow"
            yellow: {
                left: {
                    images: [
                        IMAGES.PLAYER_LEFT_02, IMAGES.PLAYER_LEFT_03, IMAGES.PLAYER_LEFT_04,
                        IMAGES.PLAYER_LEFT_05, IMAGES.PLAYER_LEFT_06, IMAGES.PLAYER_LEFT_07,
                        IMAGES.PLAYER_LEFT_08, IMAGES.PLAYER_LEFT_09, IMAGES.PLAYER_LEFT_10,
                        IMAGES.PLAYER_LEFT_11, IMAGES.PLAYER_LEFT_12, IMAGES.PLAYER_LEFT_12,
                        IMAGES.PLAYER_LEFT_13, IMAGES.PLAYER_LEFT_13, IMAGES.PLAYER_LEFT_14,
                    ],
                    currentFrame: 0,
                },
                right: {
                    images: [
                        IMAGES.PLAYER_RIGHT_02, IMAGES.PLAYER_RIGHT_03, IMAGES.PLAYER_RIGHT_04,
                        IMAGES.PLAYER_RIGHT_04, IMAGES.PLAYER_RIGHT_05, IMAGES.PLAYER_RIGHT_05,
                        IMAGES.PLAYER_RIGHT_06, IMAGES.PLAYER_RIGHT_07, IMAGES.PLAYER_RIGHT_08,
                        IMAGES.PLAYER_RIGHT_09, IMAGES.PLAYER_RIGHT_10, IMAGES.PLAYER_RIGHT_11,
                        IMAGES.PLAYER_RIGHT_12, IMAGES.PLAYER_RIGHT_13, IMAGES.PLAYER_RIGHT_14,
                    ],
                    currentFrame: 0,
                },
            },

            //colorMode="red"
            red: {
                left: {
                    images: [
                        IMAGES.PLAYER_LEFT_02b, IMAGES.PLAYER_LEFT_03b, IMAGES.PLAYER_LEFT_04b,
                        IMAGES.PLAYER_LEFT_05b, IMAGES.PLAYER_LEFT_06b, IMAGES.PLAYER_LEFT_07b,
                        IMAGES.PLAYER_LEFT_08b, IMAGES.PLAYER_LEFT_09b, IMAGES.PLAYER_LEFT_10b,
                        IMAGES.PLAYER_LEFT_11b, IMAGES.PLAYER_LEFT_12b, IMAGES.PLAYER_LEFT_12b,
                        IMAGES.PLAYER_LEFT_13b, IMAGES.PLAYER_LEFT_13b, IMAGES.PLAYER_LEFT_14b,
                    ],
                    currentFrame: 0,
                },
                right: {
                    images: [
                        IMAGES.PLAYER_RIGHT_02b, IMAGES.PLAYER_RIGHT_03b, IMAGES.PLAYER_RIGHT_04b,
                        IMAGES.PLAYER_RIGHT_04b, IMAGES.PLAYER_RIGHT_05b, IMAGES.PLAYER_RIGHT_05b,
                        IMAGES.PLAYER_RIGHT_06b, IMAGES.PLAYER_RIGHT_07b, IMAGES.PLAYER_RIGHT_08b,
                        IMAGES.PLAYER_RIGHT_09b, IMAGES.PLAYER_RIGHT_10b, IMAGES.PLAYER_RIGHT_11b,
                        IMAGES.PLAYER_RIGHT_12b, IMAGES.PLAYER_RIGHT_13b, IMAGES.PLAYER_RIGHT_14b,
                    ],
                    currentFrame: 0,
                },
            }
        }
        this.currentImage = IMAGES.PLAYER_YELLOW;

        //Movements
        this.move = {
            leftDown: false,
            rightDown: false,
            leftUp: false,
            rightUp: false,
        }
        this._divideMovementValue = 16;
        this._currentDirection = new Vector2();
        this._currentSteps = new Vector2();

        //Scores
        this.scores = 25000;

        //Falling down
        this._isFallingDown = false;

        //Catching by magnet
        this.isCatched = false;

        //Lifes
        this.lifes = 5;
    }

    /**
     * Draws player on canvas context
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        ctx.drawImage(this.currentImage, this.position.x, this.position.y);
    }

    /**
     * Changes player's color mode for some time
     * @param {Number} time In miliseconds
     */
    setRedColorMode(time) {
        this.colorMode = "red";
        let that = this;
        setTimeout(function () {
            that.colorMode = "yellow";
        }, time)
    }

    /**
     * Updates player movemets
     */
    updateMovements() {

        //Catched by Magnet object 
        if (this.isCatched) {
            this.position.x = MAGNET.position.x - 12;
            this.position.y = MAGNET.position.y + 20;
            if (!this.isOnCanvas()) { //Following magnet position until hit canvas edge
                this.isCatched = false;
                this._isFallingDown = true;
            }
            return
        }

        //Calculating new _currentDirection
        let force = null;
        if (this._currentDirection.x == 0 && this._currentDirection.y == 0 && !this._isFallingDown) {
            if (this.move.leftDown) {
                force = new Vector2(-32, 48);
            }
            else if (this.move.rightUp) {
                force = new Vector2(32, -48);
            }
            else if (this.move.rightDown) {
                force = new Vector2(32, 48);
            }
            else if (this.move.leftUp) {
                force = new Vector2(-32, -48);
            }
            if (force) {
                force.divideScalar(this._divideMovementValue);
                this._currentDirection.copy(force);
            }
        }

        //When player is falling down
        if (this._isFallingDown) {
            this._currentDirection.x = 0;
            this._currentDirection.y = 4;
        }

        //Calculating moving vector
        let vect = this._currentDirection.clone();

        //Don't calculate current steps when player is falling down
        if (!this._isFallingDown) { this._currentSteps.add(vect); }
        else { this._currentSteps.multiplyScalar(0); }

        //Stop moving
        if (Math.abs(this._currentSteps.x) >= 32 || Math.abs(this._currentSteps.y) >= 48) {
            this._currentSteps.multiplyScalar(0);
            this._currentDirection.multiplyScalar(0);
            this.scores -= 100;
        }

        //Adding
        this.position.add(vect);
    }

    /**
     * Updates player animations
     */
    updateAnimations() {
        //Detecting movement's direction
        let direction = null;
        if (this._currentDirection.x > 0) { //Moving right
            direction = "right";
        }
        else if (this._currentDirection.x < 0) { //Moving left
            direction = "left";
        }
        else if (this._currentDirection.x == 0 && this._currentDirection.y == 0) { //Not moving
            this.currentImage = IMAGES["PLAYER_" + this.colorMode.toUpperCase()];
            for (let direction in this._animations[this.colorMode]) {
                this._animations[this.colorMode][direction].currentFrame = 0;
            }
            return
        }

        //When it's falling down
        if (this._isFallingDown) {
            this.currentImage = IMAGES["PLAYER_" + this.colorMode.toUpperCase()];
            return
        }

        //Update animation image
        let index = this._animations[this.colorMode][direction].currentFrame;
        this.currentImage = this._animations[this.colorMode][direction].images[index];

        //Update animations
        this._animations[this.colorMode][direction].currentFrame += 1;
        if (this._animations[this.colorMode][direction].currentFrame >= this._animations[this.colorMode][direction].images.length) {
            this._animations[this.colorMode][direction].currentFrame = this._animations[this.colorMode][direction].images.length - 1;
        }
    }

    /**
     * Function checks selected blocks based on global BLOCKS array
     */
    checkSelectedBlocks() {
        //When it's not falling down
        if (this._isFallingDown) { return }

        //When it's not cached
        if (this.isCatched) { return }

        //My position
        let myPosition = this.position.clone();
        myPosition.x += 27;
        myPosition.y += 40;

        //Checking all blocks
        for (let i = 0; i < BLOCKS.length; i++){
            let block = BLOCKS[i];

            let blockTop = [
                block.walls.top.A,
                block.walls.top.B,
                block.walls.top.C,
                block.walls.top.D,
            ]
            if (myPosition.belongsToPolygon(blockTop)) {
                //Bonus points on block
                if (block.hasBonus) {
                    this.scores += 8000;
                    block.hasBonus = false;
                }

                //When player is on black block
                if (block.colors.top == "#000000" && this._currentDirection.x == 0 && this._currentDirection.y == 0) {
                    this.position = GetPlayerPosition();
                } else {//selecting block
                    block.select();
                }
            }
        }
    }

    /**
     * Checks if player is on any block otherwise player must fall down
     */
    standsOnAnyBlock() {
        //Don't check when player is moving
        if (this._currentDirection.x != 0 && this._currentDirection.y != 0) { return }

        //My position
        let myPosition = this.position.clone();
        myPosition.x += 27;
        myPosition.y += 40;

        //Checking all blocks
        let standsOnSomething = false;
        for (let i = 0; i < BLOCKS.length; i++) {
            let block = BLOCKS[i];

            let blockTop = [
                block.walls.top.A,
                block.walls.top.B,
                block.walls.top.C,
                block.walls.top.D,
            ]
            if (myPosition.belongsToPolygon(blockTop)) {
                standsOnSomething = true;
                break;
            }
        }

        //When players isn't standing on any block
        if (!standsOnSomething) { this._isFallingDown = true; }
    }

    /**
     * When player hits the ground he was probably falling down -> position restart
     */
    checkCollisionWithGround() {
        if (!this._isFallingDown) { return }

        if (this.position.y > CANVAS_HEIGHT) {//Ground hited
            this.position = GetPlayerPosition();
            this._isFallingDown = false;
            this.isCatched = false;
            this._currentDirection.multiplyScalar(0);
            this.lifes--;
        }
    }

    /**
     * Checks if player is still on canvas
     * @returns {boolean}
     */
    isOnCanvas() {
        if (this.position.x + 56 > CANVAS_WIDTH) { return false }
        if (this.position.x < 0) { return false }
        if (this.position.y < 0) { return false }
        if (this.position.y + 62 > CANVAS_HEIGHT) { return false }
        return true
    }
}