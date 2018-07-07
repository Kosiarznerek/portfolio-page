class Plane {
    /**
     * Creates Plane object
     * @param {Vector2} position
     */
    constructor(position) {
        //Class name
        this.className = "PLANE";

        //Image
        this._currentImage = IMAGES.PLANE_NORMAL01;
        this._shadowImage = IMAGES.PLANE_SHADOW;

        //Position
        this.position = position.clone();
        this._shadowPosition = position.clone();
        this._shadowPosition.y += 10;

        //Movements
        this.move = {
            left: false,
            right: false,
            up: false,
            down: false,
        };
        this._movementVectors = {
            left: new Vector2(-1, 0),
            right: new Vector2(1, 0),
            up: new Vector2(0, -1),
            down: new Vector2(0, 1),
        }
        this._movementSpeed = 3;
        this._movementsAnimations = {
            left: {
                array: [IMAGES.PLANE_LEFT01, IMAGES.PLANE_LEFT02],
                counter: 0,
                currentFrame: 0,
            },
            right: {
                array: [IMAGES.PLANE_RIGHT01, IMAGES.PLANE_RIGHT02],
                counter: 0,
                currentFrame: 0,
            },
            normal: { // (not moving) (moving up) (moving down)
                array: [IMAGES.PLANE_NORMAL01, IMAGES.PLANE_NORMAL02],
                counter: 0,
                currentFrame: 0,
            },
        };

        //Bullets
        this._bullets = [];

        //Bombs
        this._bombs = [];

        //Dead
        this.isDead = false;

        //Stats
        this._fuelState = 300;
        this._bombsAmount = 30;
        this._speed = null;
        this._flyHeigth = null;
        this._scores = 0;
    }

    /**
     * Draws plane on canvas context
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        //Plane shadow
        ctx.drawImage(this._shadowImage, this._shadowPosition.x, this._shadowPosition.y);

        //Plane shape
        ctx.drawImage(this._currentImage, this.position.x, this.position.y);
    }

    /**
     * Updates plane movements based on booleans in move object 
     */
    updateMovements() {
        //Applying force
        for (let direction in this.move) {
            if (this.move[direction] && this._isAbleToMoveInDirection(direction)) {
                let force = this._movementVectors[direction].clone();
                force.multiplyScalar(this._movementSpeed);
                this.position.add(force);
                if (direction == "left" || direction == "right") {
                    this._shadowPosition.add(force);
                }
                break; //avoid moving diagonally
            }
        }
    }

    /**
     * Checks if plane is able to move in direction
     * @param {String} direction
     * @returns {boolean}
     */
    _isAbleToMoveInDirection(direction) {
        if (this.isDead) { return }

        //Calculating new position
        let force = this._movementVectors[direction].clone();
        force.multiplyScalar(this._movementSpeed);
        let newPosition = this.position.clone();
        newPosition.add(force);

        //Checking edges
        if (newPosition.x <= 64 || newPosition.x >= 560) { return false }
        if (newPosition.y <= 80 || newPosition.y >= 254) { return false }

        //Moving up with not enought speed
        if (direction == "up" && this._speed <= 98) { return false }

        return true;
    }

    /**
     * Updates plane animations
     */
    updateAnimations() {
        if (this.isDead) { return }

        //Updating current frames each 10 frames
        for (let animation in this._movementsAnimations) {
            this._movementsAnimations[animation].counter++;
            if (this._movementsAnimations[animation].counter % 10 === 0) {//need to change animation
                this._movementsAnimations[animation].currentFrame++;
                if (this._movementsAnimations[animation].currentFrame >= this._movementsAnimations[animation].array.length) {//Looping animation
                    this._movementsAnimations[animation].currentFrame = 0;
                }
            }
            if (this._movementsAnimations[animation].counter + 1 >= Number.MAX_SAFE_INTEGER) { //Too big counter
                this._movementsAnimations[animation].counter = 0;
            }
        }

        //Changing image
        if (this.move.left) {
            let index = this._movementsAnimations.left.currentFrame;
            this._currentImage = this._movementsAnimations.left.array[index];
        }
        else if (this.move.right) {
            let index = this._movementsAnimations.right.currentFrame;
            this._currentImage = this._movementsAnimations.right.array[index];
        }
        else {
            let index = this._movementsAnimations.normal.currentFrame;
            this._currentImage = this._movementsAnimations.normal.array[index];
        }
    }

    /**
     * Plane shoots
     */
    shoot() {
        if (this.isDead) { return }

        //Checking if Plane can shoot
        let canShoot = false;
        if (this._bullets.length == 0) { canShoot = true; }
        else if (this._bullets[this._bullets.length - 1].position.distanceTo(this.position) > 100) { canShoot = true; }

        if (!canShoot) { return }

        //Shooting
        let position = this.position.clone();
        position.x += 24;
        position.y += 4;
        let bullet = new Bullet(position, this._flyHeigth, 0);
        this._bullets.push(bullet);
    }

    /**
     * Updates Plane Bullets objects
     * @param {CanvasRenderingContext2D} ctx
     */
    updateBullets(ctx) {
        for (let i = 0; i < this._bullets.length; i++){
            let bullet = this._bullets[i];
            bullet.draw(ctx);
            bullet.applyForce();

            //Hit opponent
            let hittedOpponent = bullet.hitsAnyOpponent();
            if (hittedOpponent) { this._hitsOpponent(hittedOpponent) }

            if (bullet.leftCanvas()) {
                this._bullets.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * What happend when plane hits opponent using bullet (called in 'updateBulelts')
     * @param {Opponent} opponent
     */
    _hitsOpponent(opponent) {
        //If it was allready hited
        if (opponent.dead) { return }

        //Else
        opponent.dead = true;
        this._scores += 100;
    }

    /**
     * Drops the bomb
     */
    dropBomb() {
        //Checking if Plane can drop the Bomb
        if (this._bombsAmount <= 0) { return }
        let canDrop = false;
        if (this._bombs.length == 0) { canDrop = true; }
        else if (this._bombs[this._bombs.length - 1].position.distanceTo(this.position) > 100) { canDrop = true; }

        if (!canDrop) { return };

        //Creating bomb object and adding to array
        this._bombsAmount -= 1;
        let position = this.position.clone();
        position.x += 24;
        position.y += 4;
        let bomb = new Bomb(position, this._flyHeigth);
        this._bombs.push(bomb);
    }

    /**
     * Updates Plane bombs
     * @param {CanvasRenderingContext2D} ctx
     */
    updateBombs(ctx) {
        for (let i = 0; i < this._bombs.length; i++){
            let bomb = this._bombs[i];
            bomb.dropUpdate();
            bomb.updateDropDownAnimation();
            bomb.draw(ctx);

            //When bomb hit building
            let building = bomb.hitsBuilding();
            if (building && !building.exploded) {
                building.exploded = true;
                this._scores += 300;
            }

            if (bomb.leftCanvas() && bomb.flyHeigth <= 0) {
                this._bombs.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * Killing Player
     */
    dead() {
        if (this.isDead) { return }

        //Game reset
        this._currentImage = IMAGES.PLANE_DEAD;
        this.isDead = true;
        GAME_MAP.speed = 0;
        setTimeout(function () {
            GAME_MAP = new GameMap();
            PLANE = new Plane(new Vector2(279, 252));
            OPPONENTS = [];
        }, 2000)
    }

    /**
     * Updates plane current stats
     */
    updateStats() {
        this._fuelState -= mapValue(GAME_MAP.speed, 0, 2.5, 0.001, 0.01);
        this._speed = Math.floor(mapValue(GAME_MAP.speed, 0, 2, 0, 200));
        this._flyHeigth = Math.floor(mapValue(this.position.y, 81, 252, 177, 0));
    }

    /**
     * Shows current plane stats in HTML DOM Elements with id="gameStats"
     */
    showStats() {
        //Getting divs
        let fuelStateDiv = document.getElementById("fuelState");
        let bombsAmountDiv = document.getElementById("bombsAmount");
        let planeSpeedDiv = document.getElementById("planeSpeed");
        let planeFlyHeigthDiv = document.getElementById("planeFlyHeigth");
        let scoresDiv = document.getElementById("scores");

        //Clearing
        fuelStateDiv.innerHTML = "";
        bombsAmountDiv.innerHTML = "";
        planeSpeedDiv.innerHTML = "";
        planeFlyHeigthDiv.innerHTML = "";
        scoresDiv.innerHTML = "";

        //Inserting new data
        var span = document.createElement("span");
        span.innerHTML = "F: ";
        fuelStateDiv.appendChild(span);
        fuelStateDiv.innerHTML += Math.floor(this._fuelState);

        var span = document.createElement("span");
        span.innerHTML = "B: ";
        bombsAmountDiv.appendChild(span);
        bombsAmountDiv.innerHTML += padWith(this._bombsAmount, 2, "0");

        var span = document.createElement("span");
        span.innerHTML = "SPD: ";
        planeSpeedDiv.appendChild(span);
        planeSpeedDiv.innerHTML += padWith(this._speed, 3, "0");

        var span = document.createElement("span");
        span.innerHTML = "ALT: ";
        planeFlyHeigthDiv.appendChild(span);
        planeFlyHeigthDiv.innerHTML += padWith(this._flyHeigth, 3, "0");;

        var span = document.createElement("span");
        span.innerHTML = "SCORE: ";
        scoresDiv.appendChild(span);
        scoresDiv.innerHTML += padWith(this._scores, 4, "0");;
    }
}