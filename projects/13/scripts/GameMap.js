class GameMap{
    /**
     * Creates Game map object
     */
    constructor() {
        this.beginImage = IMAGES.MAP01;
        this.loopImage = IMAGES.MAP02;
        this.currentImage = {
            img: this.beginImage,
            pos: new Vector2(-45, -4419 + 354),
        }
        this.nextImage = {
            img: undefined,
            pos: new Vector2(-45, - 1859),
        }

        //Sliding map
        this.moveVector = new Vector2();
        let A = new Vector2(1886, 0);
        let B = new Vector2(0, 1859);
        A.substract(B);
        A.normalize();
        this.moveVector = A.clone();
        this.speed = 0;

        //Creating bultings
        BUILDINGS = [];
        BUILDINGS.push(new Building(new Vector2(2022 - 45, 2652 - 4419 + 354)));
        BUILDINGS.push(new Building(new Vector2(4012 - 45, 799 - 4419 + 354)));
    }

    /**
     * Draws current map on canvas context
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        let x = this.moveVector.x * this.speed;
        let y = this.moveVector.y * this.speed;
        this.currentImage.pos.x -= x;
        this.currentImage.pos.y -= y;
        ctx.drawImage(this.currentImage.img, this.currentImage.pos.x, this.currentImage.pos.y);
        if (this.nextImage.img) {
            this.nextImage.pos.x -= x;
            this.nextImage.pos.y -= y;
            ctx.drawImage(this.nextImage.img, this.nextImage.pos.x, this.nextImage.pos.y);
        }
    }

    /**
     * Updates current map image
     */
    update() {
        if (this.currentImage.pos.y >= -5 && this.nextImage.img == undefined) {
            this.nextImage.img = this.loopImage;
            BUILDINGS = [];
            BUILDINGS.push(new Building(new Vector2(1724 -45, 799 -1859)));
        }
        if (this.currentImage.pos.y >= 354) {
            this.currentImage.img = this.nextImage.img;
            this.currentImage.pos = this.nextImage.pos.clone();
            this.nextImage.img = undefined;
            this.nextImage.pos = new Vector2(0, - 1859);
        }
    }
}