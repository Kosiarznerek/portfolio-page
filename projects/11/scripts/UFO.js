class Ufo {
    /**
     * Creates Ufo object
     */
    constructor() {
        //Image
        this.image = IMAGES.UFO;

        //Random direction
        this.direction = randomInt(0, 1);
        if (this.direction == 0) { this.direction = new Vector2(1, 0); }
        else { this.direction = new Vector2(-1, 0); }

        //Speed
        this.movementSpeed = 5;

        //Random position of screen
        let x = null;
        if (this.direction.x > 0) { x = randomInt(-500, -600); }
        else { x = randomInt(CANVAS_WIDTH + 500, CANVAS_WIDTH + 600) };
        let y = randomInt(10, CANVAS_HEIGHT - 38 - 29);
        this.position = new Vector2(x, y);
    }

    /**
     * Draws Ufo on canvas context
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    /**
     * Adds force to Ufo object
     */
    applyMovements() {
        let vect = new Vector2();
        vect.copy(this.direction);
        vect.multiplyScalar(this.movementSpeed);
        this.position.add(vect);
    }

    /**
     * Udates Ufo object
     */
    update() {
        if (this.direction.x > 0 && this.position.x > CANVAS_WIDTH + 600) {
            this.direction.multiplyScalar(-1);
            this.position.y = randomInt(10, CANVAS_HEIGHT - 38 - 29);
        }
        else if (this.direction.x < 0 && this.position.x < -600) {
            this.direction.multiplyScalar(-1);
            this.position.y = randomInt(10, CANVAS_HEIGHT - 38 - 29);
        }
    }

    /**
     * Checks if Ufo is visible on canvas
     * @returns {boolean}
     */
    isOnCanvas() {
        if (this.position.x + 64 > CANVAS_WIDTH) { return false }
        if (this.position.x < 0) { return false }
        if (this.position.y < 0) { return false }
        if (this.position.y + 29 > CANVAS_HEIGHT) { return false }
        return true
    }

    /**
     * Catching Player when they colide
     */
    catchPlayer() {
        if (!this.isOnCanvas()) { return }
        if (PLAYER._isFallingDown) { return }
        if (PLAYER.isCatched) { return }
        if (PLAYER.colorMode == "red") { return }

        let pPos = PLAYER.position.clone();
        let myPos = this.position.clone();

        let pSquare = [
            new Vector2(pPos.x, pPos.y),
            new Vector2(pPos.x + 56, pPos.y),
            new Vector2(pPos.x + 56, pPos.y + 62),
            new Vector2(pPos.x, pPos.y + 62),
        ]

        let mySquare = [
            new Vector2(myPos.x, myPos.y),
            new Vector2(myPos.x + 64, myPos.y),
            new Vector2(myPos.x + 64, myPos.y + 29),
            new Vector2(myPos.x, myPos.y + 29),
        ]

        for (let i = 0; i < mySquare.length; i++) {
            if (mySquare[i].belongsToPolygon(pSquare)) {
                PLAYER.setRedColorMode(5000);
                PLAYER.lifes--;
            }
        }
    }
}