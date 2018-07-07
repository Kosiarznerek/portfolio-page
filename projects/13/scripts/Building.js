class Building {
    /**
     * Creates Building object
     * @param {Vector2} position
     */
    constructor(position) {
        this.position = position.clone();
        this.exploded = false;
    }

    /**
     * Draws building on canvas
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        if (this.exploded) {
            ctx.drawImage(IMAGES.BUILDING_EXPLODED, this.position.x, this.position.y);
        } else {
            ctx.drawImage(IMAGES.BUILDING_NORMAL, this.position.x, this.position.y);
        }
    }

    /**
     * Updates Bulting position based od how fast GAME_MAP moves
     */
    updatePosition() {
        let vect = GAME_MAP.moveVector.clone();
        vect.multiplyScalar(GAME_MAP.speed);
        this.position.substract(vect);
    }
}