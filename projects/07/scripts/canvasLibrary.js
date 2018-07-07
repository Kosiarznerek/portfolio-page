function Canvas(width, height, _id , _appendElement) {
    var canvas = document.createElement("canvas");
    canvas.width = width || 200;
    canvas.height = height || 200;
    canvas.id = _id || "canvas";
    if (_appendElement) { _appendElement.appendChild(canvas) }
    else { document.body.appendChild(canvas); }
    var context = canvas.getContext("2d");

    this.context = context;
    this.width = canvas.width;
    this.height = canvas.height;

    this.vievOffset = {
        x: 168,     //1790.5500000000243,
        y: 1679,   //863.375,
    }

    this.camera = {
        flySpeed: 3,
        stepForward: {
            //Cx = Ax * (1 - valueMove) + valueMove * Bx;
            //Cy = Ay * (1 - valueMove) + valueMove * By;
            //differenceX = Ax - Cx;
            //differenceY = Ay - Cy;
            //if (this.camera.flySpeed == undefined) { this.camera.flySpeed = 1; }
            x: - 2.327750000000151,
            y: 1.1635000000001128,
        }
    }
    this.cameraFlySpeedSave = undefined;
    this.vievOffsetSave = undefined;
};

//VIEW OFFSET SAVE
Canvas.prototype.saveCurrentVievOffset = function () {
    this.vievOffsetSave = { x: 0, y: 0, };
    this.vievOffsetSave.x = this.vievOffset.x;
    this.vievOffsetSave.y = this.vievOffset.y;
}

//VIEW OFFET RESTORE
Canvas.prototype.restoreVievOffet = function () {
    this.vievOffset.x = this.vievOffsetSave.x;
    this.vievOffset.y = this.vievOffsetSave.y;
}

//DEFAULT CAMERA FLY SPEED
Canvas.prototype.setDefaultCameraFlySpeed = function () {
    this.camera.flySpeed = 3;
}

//SAVING CAMERA FLYSPEED
Canvas.prototype.saveCameraFlySpeed = function () {
    this.cameraFlySpeedSave = this.camera.flySpeed;
}

//RESTORING CAMERA FLYSPEED
Canvas.prototype.restoreCameraFlySpeed = function () {
    this.camera.flySpeed = this.cameraFlySpeedSave;
}

//ANIMATE FUNCTION
Canvas.prototype.animate = function (functionToAnimate, framesPerSecond) {
    setInterval(function () {
        try { functionToAnimate(); }
        catch (ex) { console.log(ex) };
    }, 1000 / framesPerSecond)
};

//BACKGROUND COLOR
Canvas.prototype.bacgroundColor = function (color) {
    this.context.beginPath();
    this.context.fillStyle = color || "#2fe7b4";
    this.context.fillRect(0, 0, this.width, this.height);
}

//CAMERA FLY
Canvas.prototype.cameraFly = function () {
    var differenceX = this.camera.stepForward.x * this.camera.flySpeed;
    var differenceY = this.camera.stepForward.y * this.camera.flySpeed;
    this.vievOffset.x -= differenceX;
    this.vievOffset.y -= differenceY;
}

//LINE
Canvas.prototype.connectPointsWithLine = function (pointA, pointB, _color) {
    this.context.beginPath();
    this.context.moveTo(pointA.x-this.vievOffset.x, pointA.y-this.vievOffset.y);
    this.context.lineTo(pointB.x-this.vievOffset.x, pointB.y-this.vievOffset.y);
    this.context.strokeStyle = _color || "black";
    this.context.stroke();
}

//LINE
Canvas.prototype.drawLine = function (line, _color) {
    this.context.beginPath();
    this.context.moveTo(line.pointA.x - this.vievOffset.x, line.pointA.y - this.vievOffset.y);
    this.context.lineTo(line.pointB.x - this.vievOffset.x, line.pointB.y - this.vievOffset.y);
    this.context.strokeStyle = _color || "black";
    this.context.stroke();
}

//TEXT
Canvas.prototype.write = function (text, _fontSize, _textAlign, _color, _fontFamily) {
    text = text || "Lorem Ipsum";
    _fontSize = _fontSize || 20;
    _textAlign = _textAlign || "center";
    _color = _color || "black";
    _fontFamily = _fontFamily || "Arial";
    this.context.beginPath();
    this.context.font = _fontSize+"px " + _fontFamily;
    this.context.fillStyle = _color;
    this.context.textAlign = _textAlign;
    this.context.fillText(text, canvas.width / 2, canvas.height / 2);
}