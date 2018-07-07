function CustomShape(wallsCoords) {

    //ACCESS FOR PRIVATE FUNCTIONS
    var CustomShape = this;
    
    this.wallsCoords = wallsCoords;
    this.hide = false;

    //STYLE PRIVATE VERIABLE
    var styleSettings = {
        backgroundImage: {
            imageObj: undefined,
            point: undefined,
            offsetX: undefined,
            offsetY: undefined,
            width: undefined,
            height: undefined,
        },
        backgroundColor: undefined,
        animationSequence: {
            imagesObjs: [],
            framesAmount: undefined,
            infinity: undefined,
            point: undefined,
            width: undefined,
            height: undefined,
            offsetX: undefined,
            offsetY: undefined,
            currentFrame: undefined,
            currentState: undefined, //PLAYING/ENDED, INFINITY, NOTDEFINED -> FOR(ONE-TIME ANIMATION, INFINITY, NO ANIMATION)
            callBackFunction: undefined,
            play: false
        },
    }
    //SETTING STYLE TO OBJECT
    this.style = {
        backgroundColor: function (color) { styleSettings.backgroundColor = color; },
        backgroundImage: function (imageObj, leftTopPoint, _offsetX, _offsetY, _width, _height) {
            styleSettings.backgroundImage.imageObj = imageObj;
            styleSettings.backgroundImage.point = leftTopPoint;
            styleSettings.backgroundImage.offsetX = _offsetX || 0;
            styleSettings.backgroundImage.offsetY = _offsetY || 0;
            styleSettings.backgroundImage.width = _width || styleSettings.backgroundImage.imageObj.width;
            styleSettings.backgroundImage.height = _height || styleSettings.backgroundImage.imageObj.height;
        },
        changeBackgroundImage: function (newImg) {
            styleSettings.backgroundImage.imageObj = newImg;
        },
        backgroundImageIncreaseOffset: function (xoff, yoff) {
            styleSettings.backgroundImage.point.x += xoff / Object.keys(CustomShape.wallsCoords).length;
            styleSettings.backgroundImage.point.y += yoff / Object.keys(CustomShape.wallsCoords).length;
        },
        animation: function (imagesObjsArr, leftTopPoint, _infinityBool, _offsetX, _offsetY, _width, _height, _callBackFunction) {
            styleSettings.animationSequence.imagesObjs = imagesObjsArr;
            styleSettings.animationSequence.framesAmount = imagesObjsArr.length;
            styleSettings.animationSequence.point = leftTopPoint;
            if (_infinityBool == undefined) { _infinityBool = true; }
            styleSettings.animationSequence.infinity = _infinityBool;
            if (_infinityBool) { styleSettings.animationSequence.play = true }
            styleSettings.animationSequence.offsetX = _offsetX || 0;
            styleSettings.animationSequence.offsetY = _offsetY || 0;
            styleSettings.animationSequence.width = _width;
            styleSettings.animationSequence.height = _height;
            styleSettings.animationSequence.currentFrame = 0;
            if (isFunction(_callBackFunction)) { styleSettings.animationSequence.callBackFunction = _callBackFunction; }
        },
        animationOffset: function (xoff, yoff) {
            styleSettings.animationSequence.offsetX = xoff;
            styleSettings.animationSequence.offsetY = yoff;
        },
        animationPlay: function () { styleSettings.animationSequence.play = true; },
        animationCurrentState: function () {  
            //IF ANIMATION IS NOT DEFINED
            if (styleSettings.animationSequence.imagesObjs.length == 0) {
                styleSettings.animationSequence.currentState = "NOTDEFINED";
            }
            //FOR INFINITY ANIMATION
            else if (styleSettings.animationSequence.infinity) {
                styleSettings.animationSequence.currentState = "INFINITY";
            }
            //FOR ONE-TIME ANIMATION
            else if(!styleSettings.animationSequence.infinity){
                if (styleSettings.animationSequence.currentFrame < styleSettings.animationSequence.framesAmount &&
                    styleSettings.animationSequence.play
                )
                {
                    styleSettings.animationSequence.currentState = "PLAYING";
                }
                else { styleSettings.animationSequence.currentState = "ENDED";}
                if (!styleSettings.animationSequence.play) { styleSettings.animationSequence.currentState="WAITING_FOR_PLAY" }
            }
            return styleSettings.animationSequence.currentState;
        }
    };
    //APPLYING BACKGROUND-COLOR
    function applyBackgroundColor() {
        if (styleSettings.backgroundColor) {
            canvas.context.fillStyle = styleSettings.backgroundColor;
            canvas.context.fill();
        }
    }
    //APPLYING BACKGROUND-IMAGE
    function applyBackgroundImage() {
        if (styleSettings.backgroundImage.imageObj && styleSettings.backgroundImage.point) {
            var imageObj = styleSettings.backgroundImage.imageObj;
            var x = styleSettings.backgroundImage.point.x;
            var y = styleSettings.backgroundImage.point.y;
            x -= canvas.vievOffset.x;
            y -= canvas.vievOffset.y;
            x -= styleSettings.backgroundImage.offsetX;
            y -= styleSettings.backgroundImage.offsetY;
            var imageWidth = styleSettings.backgroundImage.width;
            var imageHeight = styleSettings.backgroundImage.height;
            canvas.context.drawImage(imageObj, x, y, imageWidth, imageHeight);
        }
    }
    //APPLYING ANIMATION SQUENCE
    function applyAnimationSequence() {
        //UPDATING CURRENT STATE;
        CustomShape.style.animationCurrentState();

        if (styleSettings.animationSequence.play) {
            
            if (styleSettings.animationSequence.currentState != "NOTDEFINED" && styleSettings.animationSequence.currentState != "ENDED") {
                var currentFrame = styleSettings.animationSequence.currentFrame;
                var imageObj = styleSettings.animationSequence.imagesObjs[currentFrame];
                var x = styleSettings.animationSequence.point.x;
                var y = styleSettings.animationSequence.point.y;
                x -= canvas.vievOffset.x;
                y -= canvas.vievOffset.y;
                x -= styleSettings.animationSequence.offsetX;
                y -= styleSettings.animationSequence.offsetY;
                var imageWidth = styleSettings.animationSequence.width || styleSettings.animationSequence.imagesObjs[currentFrame].width;
                var imageHeight = styleSettings.animationSequence.height || styleSettings.animationSequence.imagesObjs[currentFrame].height;
                canvas.context.drawImage(imageObj, x, y, imageWidth, imageHeight);

                styleSettings.animationSequence.currentFrame++;

                //INFINITY ANIMATION NEEDS TO RELOAD CURRENT FRAME TO THE BEGINING
                if (styleSettings.animationSequence.currentState == "INFINITY" &&
                    styleSettings.animationSequence.currentFrame >= styleSettings.animationSequence.framesAmount) {
                    styleSettings.animationSequence.currentFrame = 0;
                }
            }

            //CALL BACK FUNCTION
            if (styleSettings.animationSequence.currentState == "ENDED" && styleSettings.animationSequence.callBackFunction) {
                styleSettings.animationSequence.callBackFunction();
                styleSettings.animationSequence.callBackFunction = undefined;
                styleSettings.animationSequence.currentFrame = 0;
            }
        }
    }

    //DRAWING WALL
    function drawWall(wallsCoords) {
        canvas.context.beginPath();
        for (point in wallsCoords) {
            var x = wallsCoords[point].x;
            var y = wallsCoords[point].y;
            x -= canvas.vievOffset.x;
            y -= canvas.vievOffset.y;
            canvas.context.lineTo(x, y);
        }
        canvas.context.closePath();
    }
    //DRAWING WHOLE SHAPE
    this.draw = function () {
        if (!this.hide) { drawWall(this.wallsCoords); }
        applyAnimationSequence();
        if (!this.hide) {
            applyBackgroundColor();
            applyBackgroundImage();
        }
    }
};