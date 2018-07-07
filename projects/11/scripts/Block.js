class Block {
    /**
     * Creates block object
     * @param {Vector2} position
     * @param {String} colorTop
     * @param {String} colorLeft
     * @param {String} colorRight
     */
    constructor(position, colorTop, colorLeft, colorRight) {
        //Position
        this.position = position;

        //Colors
        this.colors = {
            left: colorLeft,
            right: colorRight,
            top: colorTop,
        }

        //Shape (when position is 0,0)
        this.walls = {
            top: {
                A: new Vector2(0, 16),
                B: new Vector2(32, 0),
                C: new Vector2(64, 16),
                D: new Vector2(32, 32),
            },
            left: {
                A: new Vector2(0, 16),
                B: new Vector2(32, 32),
                C: new Vector2(32, 64),
                D: new Vector2(0, 49),
            },
            right: {
                A: new Vector2(64, 16),
                B: new Vector2(64, 49),
                C: new Vector2(32, 64),
                D: new Vector2(32, 32),
            },
        }
        //offsetting walls
        for (let side in this.walls) {
            for (let coordName in this.walls[side]) {
                this.walls[side][coordName].x += this.position.x;
                this.walls[side][coordName].y += this.position.y;
            }
        }

        //Seleting
        this.isSelected = false;

        //Bonus points
        this.hasBonus = false;
    }

    /**
     * Draws block on canvas context
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        //Checked
        if (this.isSelected && this.colors.top != "#3b53ff") { this.colors.top = "#3b53ff"; }

        //Drawing shape
        for (let side in this.walls) {
            ctx.beginPath();

            let coordNames = Object.keys(this.walls[side]);
            coordNames.push(coordNames[0]);
            ctx.moveTo(this.walls[side][coordNames[0]].x, this.walls[side][coordNames[0]].y);

            for (let i = 1; i < coordNames.length; i++){
                let position = this.walls[side][coordNames[i]];
                ctx.lineTo(position.x, position.y);
            }

            ctx.fillStyle = this.colors[side];
            ctx.fill();

            ctx.closePath();
        }

        //Bonus
        if (this.hasBonus) {
            if (this.isSelected) {
                ctx.drawImage(IMAGES.BONUS_POINTS_BLUE, this.walls.left.A.x, this.walls.left.A.y);
            } else {
                ctx.drawImage(IMAGES.BONUS_POINTS_NORMAL, this.walls.left.A.x, this.walls.left.A.y);
            }
        }
    }

    /**
     * Selecting block if it possible
     */
    select() {
        if (this.colors.top != "#000000" && !this.isSelected) {
            this.isSelected = true;
            this.colors.top = "#3b53ff";
        }
    }
}