class Magnet {

    /**
     * Creates magnet object
     */
    constructor() {
        //Image
        this.image = IMAGES.MAGNET;

        //Random direction
        this.direction = randomInt(0, 1);
        if (this.direction == 0) { this.direction = new Vector2(1, 0); }
        else { this.direction = new Vector2(-1, 0); }

        //Speed
        this.movementSpeed = 3;

        //Random position of screen
        let x = null;
        if (this.direction.x > 0) { x = randomInt(-200, -300); }
        else { x = randomInt(CANVAS_WIDTH + 200, CANVAS_WIDTH + 300) };
        let y = randomInt(10, CANVAS_HEIGHT - 38 - 52);
        this.position = new Vector2(x, y);
    }

    /**
     * Draws magnet on canvas context
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    /**
     * Adds force to Magnet object
     */
    applyMovements() {
        let vect = new Vector2();
        vect.copy(this.direction);
        vect.multiplyScalar(this.movementSpeed);
        this.position.add(vect);
    }

    /**
     * Udates Magnet object
     */
    update() {
        if (this.direction.x > 0 && this.position.x > CANVAS_WIDTH + 400) {
            this.direction.multiplyScalar(-1);
            this.position.y = randomInt(10, CANVAS_HEIGHT - 38 - 52);
        }
        else if (this.direction.x < 0 && this.position.x < -400) {
            this.direction.multiplyScalar(-1);
            this.position.y = randomInt(10, CANVAS_HEIGHT - 38 - 52);
        }
    }

    /**
     * Checks if Magnet is visible on canvas
     * @returns {boolean}
     */
    isOnCanvas() {
        if (this.position.x + 32 > CANVAS_WIDTH) { return false }
        if (this.position.x < 0) { return false }
        if (this.position.y < 0) { return false }
        if (this.position.y + 38 > CANVAS_HEIGHT) { return false }
        return true
    }

    /**
     * Catching Player when they colide
     */
    catchPlayer() {
        if (!this.isOnCanvas()) { return }
        if (PLAYER._isFallingDown) { return }
        if (PLAYER.isCatched) { return }

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
            new Vector2(myPos.x + 32, myPos.y),
            new Vector2(myPos.x + 32, myPos.y + 38),
            new Vector2(myPos.x, myPos.y + 38),
        ]

        for (let i = 0; i < mySquare.length; i++){
            if (mySquare[i].belongsToPolygon(pSquare)) {
                PLAYER.isCatched = true;
            }
        }
    }
}