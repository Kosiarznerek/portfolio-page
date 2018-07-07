class Opponent {
    /**
     * Creates Opponent object
     * @param {Number} direction (1)'BACKWARDS' or (2)'FORWARD'
     */
    constructor(direction) {
        //Class name
        this.className = "OPPONENT";

        //Direction
        this._direction = GAME_MAP.moveVector.clone();
        this.speed = 3;
        if (direction == 1) { this._direction.multiplyScalar(-1); }
        if (direction == 2) { this.speed = 1.5; }

        //Position
        this.position = new Vector2(randomInt(82, 558), randomInt(81, 163));

        //Fly heigth
        this.flyHeigth = Math.floor(mapValue(this.position.y, 81, 252, 177, 0));

        //Animation
        this.currentImage = null;
        this._movementAnimation = {
            array: [],
            couter: 0,
            currentFrame: 0,
        };

        //Shadow
        this._shadow = {
            img: null,
            position: new Vector2(),
        }
        this._shadow.position = this.position.clone();
        this._shadow.position.y += this.flyHeigth;

        //Starts off canvas view
        let vect = this._direction.clone();
        vect.multiplyScalar(-1);
        vect.multiplyScalar(600);
        this.position.add(vect);
        this._shadow.position.add(vect);

        //Set up based od direction
        if (direction == 1) {
            //Image
            this.currentImage = IMAGES.OPPONENT1_PLANE01;

            //Animation
            this._movementAnimation.array.push(IMAGES.OPPONENT1_PLANE01, IMAGES.OPPONENT1_PLANE02);

            //Shadow
            this._shadow.img = IMAGES.OPPONENT1_SHADOW;
        }
        else if (direction == 2) {
            //Image
            this.currentImage = IMAGES.OPPONENT2_PLANE01;

            //Animation
            this._movementAnimation.array.push(IMAGES.OPPONENT2_PLANE01, IMAGES.OPPONENT2_PLANE02);

            //Shadow
            this._shadow.img = IMAGES.OPPONENT2_SHADOW;
        }
        else { console.error("Opponent direction urecognized"); }

        //Bullets
        this._bullets = [];

        //Dead
        this.dead = false;
        this.timeAfterDeath = 0;
    }

    /**
     * Draws Opponent on canvas context
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        //Opponent shadow
        ctx.drawImage(this._shadow.img, this._shadow.position.x, this._shadow.position.y)

        //Opponent shape
        ctx.drawImage(this.currentImage, this.position.x, this.position.y);
    }

    /**
     * Applies movements to Opponent object
     */
    applyMovements() {
        if (this.dead) { return }

        let force = this._direction.clone();
        force.multiplyScalar(this.speed);
        this.position.add(force);
        this._shadow.position.add(force);
    }

    /**
     * Checks if Opponent left canvas view
     */
    leftCanvas() {
        if (this.position.x <= -1000 || this.position.x >= 1672) { return true }
        if (this.position.y <= -1000 || this.position.y >= 1354) { return true }
        return false
    }

    /**
     * Opponent shooting
     */
    shoot() {
        if (this.dead) { return }

        //Checking if Opponent can shoot
        let canShoot = false;
        if (this._bullets.length == 0) { canShoot = true; }
        else if (this._bullets[this._bullets.length - 1].position.distanceTo(this.position) > 300) { canShoot = true; }

        if (!canShoot) { return }

        //Shooting
        let position = this.position.clone();
        let typeOfBullet = null;
        if (this._direction.y < 0) {//forwards
            position.x += 24;
            position.y += 4;
            typeOfBullet = 12;
        }
        else if (this._direction.y > 0) {//backwards
            position.x += 3;
            position.y += 13;
            typeOfBullet = 11;
        }
        let bullet = new Bullet(position, this.flyHeigth, typeOfBullet);
        this._bullets.push(bullet);
    }

    /**
     * Updates states of bullets
     * @param {CanvasRenderingContext2D} ctx
     */
    shootUpdate(ctx) {
        for (let i = 0; i < this._bullets.length; i++) {
            let bullet = this._bullets[i];
            bullet.draw(ctx);
            bullet.applyForce();
        }
    }

    /**
     * Checks if Opponent bullet hit a player
     */
    bulletHitPlayer() {
        for (let i = 0; i < this._bullets.length; i++) {
            let bullet = this._bullets[i];
            if (bullet.hitsPlayer()) { return true }
        }
        return false
    }

    /**
     * Updates Opponents animations
     */
    updateAnimations() {
        //When it's dead
        if (this.dead) {
            if (!this.currentImage.src.includes("images/opponentPlane/dead.png")) {
                this.currentImage = IMAGES.OPPONENT_DEAD;
            }
            this.timeAfterDeath++;
            return
        }

        //Increasing counter
        this._movementAnimation.couter++;
        if (this._movementAnimation.couter + 1 >= Number.MAX_SAFE_INTEGER) {
            this._movementAnimation.couter = 0;
        }

        //Changing frame
        if (this._movementAnimation.couter % 10 === 0) {
            this._movementAnimation.currentFrame++;
        }
        if (this._movementAnimation.currentFrame >= this._movementAnimation.array.length) {
            this._movementAnimation.currentFrame = 0;
        }

        //Image update
        let index = this._movementAnimation.currentFrame;
        this.currentImage = this._movementAnimation.array[index];
    }

    /**
     * Checks if opponents flown into PLANE (player)
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