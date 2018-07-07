function Obstacle(obstacleInformations) {
    //OBJECT TYPE
    this.type = "OBSTACLE";

    //INFORMATIONS
    this.informations = obstacleInformations;

    //SHAPE
    var wallsCoords = this.informations.wallsCoords;
    var obstacleWall = new CustomShape(wallsCoords);

    //BACKGROUND IMAGE
    if (this.informations.backgroundImage) {
        var imageObj = this.informations.backgroundImage.imageObj;
        var leftTopPoint = this.informations.backgroundImage.leftTopPoint;
        var _offsetX = this.informations.backgroundImage._offsetX;
        var _offsetY = this.informations.backgroundImage._offsetY;
        var _width = this.informations.backgroundImage._width;
        var _height = this.informations.backgroundImage._height;
        obstacleWall.style.backgroundImage(imageObj, leftTopPoint, _offsetX, _offsetY, _width, _height);
    }
    //ANIMATION SEQUENCE
    if (this.informations.animationSequence) {
        var imagesObjsArr = this.informations.animationSequence.imagesObjsArr;
        var leftTopPoint = this.informations.animationSequence.leftTopPoint;
        var _infinityBool = this.informations.animationSequence._infinity;
        var _offsetX = this.informations.animationSequence._offsetX;
        var _offsetY = this.informations.animationSequence._offsetY;
        var _width = this.informations.animationSequence._width;
        var _height = this.informations.animationSequence._height;
        obstacleWall.style.animation(imagesObjsArr, leftTopPoint, _infinityBool, _offsetX, _offsetY, _width, _height);
    }
    //obstacleWall.style.backgroundColor("rgb(223,123,0)"); //TEMP

    //DRAW
    this.draw = function () { obstacleWall.draw(); }
}