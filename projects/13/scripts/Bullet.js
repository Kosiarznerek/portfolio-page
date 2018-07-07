class Bullet {
    /**
     * Creates bullet object
     * @param {Vector2} position Starting position
     * @param {Number} flyHeigth Bullet fly heigth
     * @param {Number} type Type of bullet '0'(Plane) or '11'(Opponent1) or '12'(Opponent2)
     */
    constructor(position, flyHeigth, type) {
        //Class name
        this.className = "BULLET";

        //Parameters
        this.speed = 3;
        this.flyHeigth = flyHeigth;
        this.position = position.clone();

        //Calculating direction
        this.direction = new Vector2();
        let A = new Vector2(1886, 0);
        let B = new Vector2(0, 1859);
        A.substract(B);
        A.normalize();
        this.direction = A.clone();
        if (type === 11) { this.direction.multiplyScalar(-1); this.speed = 5; }

        //Image
        this.image = null;
        switch (type) {
            case 0: this.image = IMAGES.PLANE_BULLET; break;
            case 11:
            case 12: this.image = IMAGES.OPPONENT_BULLET; break;
            default: console.error("Bullet type unrecognized"); break;
        }
    }

    /**
     * Draw bullet on canvas context
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    /**
     * Applies force to Bullet object
     */
    applyForce() {
        let force = this.direction.clone();
        force.multiplyScalar(this.speed);
        this.position.add(force);
    }

    /**
     * Checks if bullet is not visible on canvas
     * @returns {boolean}
     */
    leftCanvas() {
        if (this.position.x <= -10 || this.position.x >= 682) { return true }
        if (this.position.y <= -10 || this.position.y >= 364) { return true }
        return false;
    }

    /**
     * Checks if bullet hit any opponent
     * @returns {Opponent} Hitted one
     */
    hitsAnyOpponent() {
        for (let i = 0; i < OPPONENTS.length; i++){
            let opPosition = OPPONENTS[i].position.clone();
            let opFlyHeigth = OPPONENTS[i].flyHeigth;

            let opponentCoors = [
                new Vector2(opPosition.x, opPosition.y),
                new Vector2(opPosition.x + 32, opPosition.y),
                new Vector2(opPosition.x + 32, opPosition.y + 20),
                new Vector2(opPosition.x, opPosition.y + 20),
            ];

            //Checking collision
            if (this.position.belongsToPolygon(opponentCoors) &&
                this.flyHeigth - 40 <= opFlyHeigth &&
                this.flyHeigth + 40 >= opFlyHeigth) {
                return OPPONENTS[i];
            }
        }
    }

    /**
     * Checking collision with Player
     * @returns {boolean}
     */
    hitsPlayer() {
        let pPos = PLANE.position.clone();
        let pFlyHeigth = PLANE._flyHeigth;

        let pCoords = [
            new Vector2(pPos.x, pPos.y),
            new Vector2(pPos.x + 32, pPos.y),
            new Vector2(pPos.x + 32, pPos.y + 20),
            new Vector2(pPos.x, pPos.y + 20),
        ];

        //Checking collision
        if (this.position.belongsToPolygon(pCoords) &&
            this.flyHeigth - 20 <= pFlyHeigth &&
            this.flyHeigth + 20 >= pFlyHeigth) {
            return true;
        }
    }
}