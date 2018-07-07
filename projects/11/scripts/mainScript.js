//Onload
window.onload = function () {
    enableKeyPressEvent();
    loadImages(IMAGES, setup);
}

//Global variables
const CANVAS_WIDTH = 672;
const CANVAS_HEIGHT = 384;
let BLOCKS = [];
let CURRENT_LEVEL = 1;
let PLAYER = null;
let BONUS = null;
let MAGNET = null;
let UFO = null;
let USER_INTERFACE = null;
let COOKIES = new CookiesHelper();

/**
 * Setup function called alfter whole needed data has been loaded
 */
function setup() {
    //Creating canvas
    let canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    let ctx = canvas.getContext('2d');
    document.getElementById("gameCanvas").appendChild(canvas);

    //Creating blocks
    BLOCKS = CreateNewBlocks(CURRENT_LEVEL);

    //Bonus points
    BONUS = new Bonus();

    //Magnet
    MAGNET = new Magnet();

    //Ufo
    UFO = new Ufo();

    //Creating Player
    PLAYER = new Player(GetPlayerPosition());

    //GUI
    USER_INTERFACE = new UserInterface();
    USER_INTERFACE.updateData();

    //Starting loop
    setInterval(function () { draw(ctx); }, 1000 / 30);
}

/**
 * Animation loop 30 frames per seconds
 * @param {CanvasRenderingContext2D} ctx
 */
function draw(ctx) {
    //GUI
    USER_INTERFACE.updateData();

    //Background color
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


    //Blocks
    let allSelected = true;
    for (let i = 0; i < BLOCKS.length; i++){
        let block = BLOCKS[i];
        block.draw(ctx);
        if (!block.isSelected && block.colors.top != "#000000") { allSelected = false; }
    }
    if (allSelected && PLAYER._currentDirection.x == 0 && PLAYER._currentDirection.y == 0) {//Next level
        CURRENT_LEVEL++;
        if (CURRENT_LEVEL > 2) { CURRENT_LEVEL = 2; }
        BLOCKS = CreateNewBlocks(CURRENT_LEVEL);
        PLAYER.position = GetPlayerPosition();
        return;
    }


    //Bonus
    BONUS.update();


    //Magnet
    MAGNET.update();
    MAGNET.catchPlayer();
    MAGNET.applyMovements();
    MAGNET.draw(ctx);


    //Ufo
    UFO.update();
    UFO.catchPlayer();
    UFO.applyMovements();
    UFO.draw(ctx);


    //Player movements
    if (KEYPRESSED["S"] && KEYPRESSED["A"]) { PLAYER.move.leftDown = true; }
    else { PLAYER.move.leftDown = false; }
    if (KEYPRESSED["S"] && KEYPRESSED["D"]) { PLAYER.move.rightDown = true; }
    else { PLAYER.move.rightDown = false; }
    if (KEYPRESSED["W"] && KEYPRESSED["A"]) { PLAYER.move.leftUp = true; }
    else { PLAYER.move.leftUp = false; }
    if (KEYPRESSED["W"] && KEYPRESSED["D"]) { PLAYER.move.rightUp = true; }
    else { PLAYER.move.rightUp = false; }
    PLAYER.updateMovements();

    //Player animations
    PLAYER.updateAnimations();

    //Cheking if Player stands on any block
    PLAYER.standsOnAnyBlock();
    if (PLAYER._isFallingDown) {
        PLAYER.checkCollisionWithGround();
    }

    //Player checking blocks
    PLAYER.checkSelectedBlocks();

    //No lifes -> game restart
    if (PLAYER.lifes <= 0 && PLAYER._currentDirection.x == 0 && PLAYER._currentDirection.y == 0) {
        CURRENT_LEVEL = 1;
        BLOCKS = CreateNewBlocks(CURRENT_LEVEL);
        BONUS = new Bonus();
        MAGNET = new Magnet();
        UFO = new Ufo();
        USER_INTERFACE.updateTopScores();
        PLAYER = new Player(GetPlayerPosition());
        USER_INTERFACE.updateData();
    }

    //Player draw
    PLAYER.draw(ctx);
}