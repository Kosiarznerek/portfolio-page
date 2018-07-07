/**
 * Function keeps block deafault position on canvas
 * @returns {Array} Array of Vectors
 */
function GetBlocksPosition() {
    let firstRowStart = new Vector2(48, 32);
    let secondRowStart = new Vector2(16, 80);

    let positions = [];
    //1, 3, 5 row
    for (let j = 0; j < 3; j++){
        for (let i = 0; i < 9; i++) {
            let position = firstRowStart.clone();
            position.y += j * 96;
            position.x += i * 64;
            positions.push(position);
        }
    }

    //2, 4, 6 row
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 10; i++) {
            let position = secondRowStart.clone();
            position.y += j * 96;
            position.x += i * 64;
            positions.push(position);
        }
    }

    return positions

}

/**
 * Function keeps set of color for each side of block for all levels
 * @param {Number} level
 * @returns {Object} With keys 'topColor', 'leftColor', 'rightColor'
 */
function GetSetOfCollorsForBlock(level) {
    let color = {
        topColor: null,
        leftColor: null,
        rightColor: null,
    }

    //Detecting color based on given level
    switch (level) {
        case 1:
            color.topColor = "#e0e0e0";
            color.leftColor = "#808080";
            color.rightColor = "#404040";
            break;
        case 2:
            color.topColor = "#8fbf26";
            color.leftColor = "#b88000";
            color.rightColor = "#202020";
            break;
        default: console.error("Level unrecognized"); break;
    }

    //Return
    return color
}

/**
 * Creates Blocks for given level
 * @param {Number} level
 * @returns {Array}
 */
function CreateNewBlocks(level) {
    let arrayOfBlocks = [];
    let blocksData = GetBlocksPosition();
    let colors = GetSetOfCollorsForBlock(level);
    for (let i = 0; i < blocksData.length; i++) {
        let position = blocksData[i];
        let topColor = colors.topColor;
        if (i == 11 || i == 15 || i == 22) {
            topColor = "#000000";
        }

        let block = new Block(position, topColor, colors.leftColor, colors.rightColor);
        arrayOfBlocks.push(block);
    }
    return arrayOfBlocks;
}

/**
 * Function keeps Player default position
 * @returns {Vector2}
 */
function GetPlayerPosition() {
    return new Vector2(52, 8);
}

/**
 * Images for game
 */
const IMAGES = {
    //Player normal
    PLAYER_YELLOW: "graphics/player/normal.png",
    PLAYER_RED: "graphics/player/red.png",

    //Player left (colorMode="yellow")
    PLAYER_LEFT_02: "graphics/player/left/02.png",
    PLAYER_LEFT_03: "graphics/player/left/03.png",
    PLAYER_LEFT_04: "graphics/player/left/04.png",
    PLAYER_LEFT_05: "graphics/player/left/05.png",
    PLAYER_LEFT_06: "graphics/player/left/06.png",
    PLAYER_LEFT_07: "graphics/player/left/07.png",
    PLAYER_LEFT_08: "graphics/player/left/08.png",
    PLAYER_LEFT_09: "graphics/player/left/09.png",
    PLAYER_LEFT_10: "graphics/player/left/10.png",
    PLAYER_LEFT_11: "graphics/player/left/11.png",
    PLAYER_LEFT_12: "graphics/player/left/12.png",
    PLAYER_LEFT_13: "graphics/player/left/13.png",
    PLAYER_LEFT_14: "graphics/player/left/14.png",

    //Player right (colorMode="yellow")
    PLAYER_RIGHT_02: "graphics/player/right/02.png",
    PLAYER_RIGHT_03: "graphics/player/right/03.png",
    PLAYER_RIGHT_04: "graphics/player/right/04.png",
    PLAYER_RIGHT_05: "graphics/player/right/05.png",
    PLAYER_RIGHT_06: "graphics/player/right/06.png",
    PLAYER_RIGHT_07: "graphics/player/right/07.png",
    PLAYER_RIGHT_08: "graphics/player/right/08.png",
    PLAYER_RIGHT_09: "graphics/player/right/09.png",
    PLAYER_RIGHT_10: "graphics/player/right/10.png",
    PLAYER_RIGHT_11: "graphics/player/right/11.png",
    PLAYER_RIGHT_12: "graphics/player/right/12.png",
    PLAYER_RIGHT_13: "graphics/player/right/13.png",
    PLAYER_RIGHT_14: "graphics/player/right/14.png",

    //Player left (colorMode="red")
    PLAYER_LEFT_02b: "graphics/player/leftB/02.png",
    PLAYER_LEFT_03b: "graphics/player/leftB/03.png",
    PLAYER_LEFT_04b: "graphics/player/leftB/04.png",
    PLAYER_LEFT_05b: "graphics/player/leftB/05.png",
    PLAYER_LEFT_06b: "graphics/player/leftB/06.png",
    PLAYER_LEFT_07b: "graphics/player/leftB/07.png",
    PLAYER_LEFT_08b: "graphics/player/leftB/08.png",
    PLAYER_LEFT_09b: "graphics/player/leftB/09.png",
    PLAYER_LEFT_10b: "graphics/player/leftB/10.png",
    PLAYER_LEFT_11b: "graphics/player/leftB/11.png",
    PLAYER_LEFT_12b: "graphics/player/leftB/12.png",
    PLAYER_LEFT_13b: "graphics/player/leftB/13.png",
    PLAYER_LEFT_14b: "graphics/player/leftB/14.png",

    //Player right (colorMode="red")
    PLAYER_RIGHT_02b: "graphics/player/rightB/02.png",
    PLAYER_RIGHT_03b: "graphics/player/rightB/03.png",
    PLAYER_RIGHT_04b: "graphics/player/rightB/04.png",
    PLAYER_RIGHT_05b: "graphics/player/rightB/05.png",
    PLAYER_RIGHT_06b: "graphics/player/rightB/06.png",
    PLAYER_RIGHT_07b: "graphics/player/rightB/07.png",
    PLAYER_RIGHT_08b: "graphics/player/rightB/08.png",
    PLAYER_RIGHT_09b: "graphics/player/rightB/09.png",
    PLAYER_RIGHT_10b: "graphics/player/rightB/10.png",
    PLAYER_RIGHT_11b: "graphics/player/rightB/11.png",
    PLAYER_RIGHT_12b: "graphics/player/rightB/12.png",
    PLAYER_RIGHT_13b: "graphics/player/rightB/13.png",
    PLAYER_RIGHT_14b: "graphics/player/rightB/14.png",

    //Bonus
    BONUS_POINTS_NORMAL: "graphics/bonusPoints/01.png",
    BONUS_POINTS_BLUE: "graphics/bonusPoints/02.png",

    //Opponents
    MAGNET: "graphics/opponents/magnet.png",
    UFO: "graphics/opponents/ufo.png",
}