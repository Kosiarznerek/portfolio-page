//OnLoad
window.onload = function () {
    loadGraphics(IMAGES, function () {
        setup();
    })
};

//Global variables
let GAME_MAP = null;
let PLANE = null;
let OPPONENTS = [];
let BUILDINGS = [];
let KEYPRESSED = {};

/**
 * Setup function 
 */
function setup() {
    //Creating canvas
    let canvas = document.createElement("canvas");
    canvas.width = 672;
    canvas.height = 354;
    let ctx = canvas.getContext('2d');
    document.getElementById("gameCanvas").appendChild(canvas);

    //Game components
    GAME_MAP = new GameMap();
    PLANE = new Plane(new Vector2(279, 252));

    //Creating opponents
    setInterval(function () {
        if (GAME_MAP.speed <= 0.98) { return }
        if (PLANE.isDead) { return }

        let randomDirection = randomInt(1, 2);
        let opponent = new Opponent(randomDirection);
        OPPONENTS.push(opponent);

    }, 5 * 1000)

    //Key events
    document.body.onkeydown = function (e) {
        let key = e.key.toUpperCase();
        if (key == " ") { key = "SPACE"; }
        KEYPRESSED[key] = true;
    }
    document.body.onkeyup = function (e) {
        let key = e.key.toUpperCase();
        if (key == " ") { key = "SPACE"; }
        KEYPRESSED[key] = false;
    }

    //Animation loop
    setInterval(function () { draw(ctx); }, 1000 / 60);
}

/**
 * Animation loop 60 frames per second
 * @param {CanvasRenderingContext2D} ctx
 */
function draw(ctx) {
    //Backgrund
    ctx.fillRect(0, 0, 600, 300);
    ctx.fillStyle = "black";

    //Map
    GAME_MAP.draw(ctx);
    GAME_MAP.update();

    //Buildings
    for (let i = 0; i < BUILDINGS.length; i++){
        let building = BUILDINGS[i];
        building.updatePosition();
        building.draw(ctx);
    }

    //Plane speed
    if (KEYPRESSED["1"] && GAME_MAP.speed <= 2.5 && !PLANE.isDead) { GAME_MAP.speed += 0.01; }
    if (KEYPRESSED["2"] && GAME_MAP.speed >= 1 && !PLANE.isDead) { GAME_MAP.speed -= 0.01; }

    //Plane movements
    if (KEYPRESSED["ARROWLEFT"]) { PLANE.move.left = true; } else { PLANE.move.left = false; }
    if (KEYPRESSED["ARROWRIGHT"]) { PLANE.move.right = true; } else { PLANE.move.right = false; }
    if (KEYPRESSED["ARROWDOWN"]) { PLANE.move.up = true; } else { PLANE.move.up = false; }
    if (KEYPRESSED["ARROWUP"]) { PLANE.move.down = true; } else { PLANE.move.down = false; }

    //Plane drop bomb
    if (KEYPRESSED["Z"]) { PLANE.dropBomb(); }

    //Plane shooting
    if (KEYPRESSED["SPACE"]) { PLANE.shoot(); }

    //Plane ends of fuel
    if (PLANE._fuelState <= 0) { PLANE.dead(); }

    //Plane fly to close ground
    if (GAME_MAP.speed >= 0.99 && PLANE._flyHeigth <= 35 && PLANE._fuelState<=296) { PLANE.dead(); }

    //Plane update
    PLANE.updateMovements();
    PLANE.updateAnimations();
    PLANE.updateBullets(ctx);
    PLANE.updateBombs(ctx);
    PLANE.updateStats();
    PLANE.showStats();
    PLANE.draw(ctx);

    //Opponents
    for (let i = 0; i < OPPONENTS.length; i++){
        let opponent = OPPONENTS[i];

        opponent.applyMovements();
        opponent.shoot();
        opponent.shootUpdate(ctx);
        opponent.updateAnimations();
        opponent.draw(ctx);

        //When player (PLANE) gets hitted by OPPONENT BULLET
        if (opponent.bulletHitPlayer()) { PLANE.dead(); }

        //When player (PLANE) flown into opponent
        if (opponent.hitsPlayer()) {
            opponent.dead = true;
            PLANE.dead();
        }

        if (opponent.leftCanvas() || (opponent.dead && opponent.timeAfterDeath >= 120)) {
            OPPONENTS.splice(i, 1);
            i--;
        }

    }
}