/*========================================================================================================================*/
function select(idOrClassName) {
    switch (idOrClassName[0]) {
        case "#":
            var id = idOrClassName.slice(1, idOrClassName.length);
            var element = document.getElementById(id);
            switch (element) {
                case null:
                case undefined:
                case "":
                    console.error("ERR \"SELECT:\": " + "No element found with ID: " + id);
                    break;
                default:
                    return element;
                    break;
            }
            break;

        case ".":
            var klasa = idOrClassName.slice(1, idOrClassName.length);
            var element = document.getElementsByClassName(klasa);
            switch (element.length) {
                case null:
                case undefined:
                case 0:
                    console.error("ERR \"SELECT:\": " + "No items found with className: " + klasa);
                    break;
                default:
                    return element;
                    break;
            }
            break;

        default:
            console.error("ERR \"SELECT:\": " + "This feature requires ID or className: " + idOrClassName);
            break;
    }
}
/*========================================================================================================================*/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
function selectRandomFromArray(array) {
    var min = 0, max = array.length - 1;
    var randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    return array[randomIndex];
}
/*========================================================================================================================*/
//array[row-1][column-1]
function create2dArray(rows, columns) {
    var array = new Array(rows);
    for (var i = 0; i < rows; i++) {
        array[i] = new Array(columns);
    }
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            array[i][j] = 0;
        }
    }
    return array;
}
/*========================================================================================================================*/
function Point(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}

Point.prototype.copy = function () {
    return new Point(this.x, this.y, this.z);
}

Point.prototype.belongsToFigure = function (wallCoords) {

    var polygon = [];
    for (coordName in wallCoords) {
        polygon.push(wallCoords[coordName]);
    }

    var isInside = false;
    var minX = polygon[0].x, maxX = polygon[0].x;
    var minY = polygon[0].y, maxY = polygon[0].y;
    for (var n = 1; n < polygon.length; n++) {
        var q = polygon[n];
        minX = Math.min(q.x, minX);
        maxX = Math.max(q.x, maxX);
        minY = Math.min(q.y, minY);
        maxY = Math.max(q.y, maxY);
    }

    if (this.x < minX || this.x > maxX || this.y < minY || this.y > maxY) {
        return false;
    }

    var i = 0, j = polygon.length - 1;
    for (i, j; i < polygon.length; j = i++) {
        if ((polygon[i].y > this.y) != (polygon[j].y > this.y) &&
                this.x < (polygon[j].x - polygon[i].x) * (this.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x) {
            isInside = !isInside;
        }
    }
    return isInside;
}

function distanceBetweenPoints(PointA, PointB) {
    return Math.sqrt(Math.pow((PointB.x - PointA.x), 2) + Math.pow((PointB.y - PointA.y), 2));
}
/*========================================================================================================================*/
function Line(PointA, PointB) {
    this.pointA = PointA;
    this.pointB = PointB;
}

function intersectionPointOfTwoLineSegments(LineA, LineB) {
    var p0_x = LineA.pointA.x; var p0_y = LineA.pointA.y;
    var p1_x = LineA.pointB.x; var p1_y = LineA.pointB.y;
    var p2_x = LineB.pointA.x; var p2_y = LineB.pointA.y;
    var p3_x = LineB.pointB.x; var p3_y = LineB.pointB.y;

    var s1_x, s1_y, s2_x, s2_y;
    s1_x = p1_x - p0_x; s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x; s2_y = p3_y - p2_y;

    var s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
    t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
        var Ax = p0_x; var Ay = p0_y;
        var Bx = p1_x; var By = p1_y;
        var Cx = p2_x; var Cy = p2_y;
        var Dx = p3_x; var Dy = p3_y;

        var x = ((Bx - Ax) * (Dx * Cy - Dy * Cx) - (Dx - Cx) * (Bx * Ay - By * Ax)) / ((By - Ay) * (Dx - Cx) - (Dy - Cy) * (Bx - Ax));
        var y = ((Dy - Cy) * (Bx * Ay - By * Ax) - (By - Ay) * (Dx * Cy - Dy * Cx)) / ((Dy - Cy) * (Bx - Ax) - (By - Ay) * (Dx - Cx));
        return new Point(x, y);
    }
    else {
        return false;
    }
}
/*========================================================================================================================*/
function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector.prototype.lenght = function () {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

Vector.prototype.normalize = function () {
    var x = this.x / this.lenght();
    var y = this.y / this.lenght();
    this.x = x;
    this.y = y;
}

Vector.prototype.multiply = function (val) {
    this.x *= val;
    this.y *= val;
}

Vector.prototype.add = function (Vector) {
    return new Vector(this.x + Vector.x, this.y + Vector.y);
}
/*========================================================================================================================*/
function randomRGBColor() {
    var max = 255; var min = 0;
    var r = Math.floor(Math.random() * (max - min + 1)) + min;
    var g = Math.floor(Math.random() * (max - min + 1)) + min;
    var b = Math.floor(Math.random() * (max - min + 1)) + min;
    var color = "rgb(" + r + "," + g + "," + b + ")";
    return color;
}
/*========================================================================================================================*/
var KEYCODES = {
    leftArrow: 37,
    upArrow: 38,
    rightArrow: 39,
    downArrow: 40,
    numPad1: 35,
    numPad2: 40,
    numPad3: 34,
    numPad4: 37,
    numPad5: 12,
    numPad6: 39,
    numPad7: 36,
    numPad8: 38,
    numPad9: 33,
    digit0: 48,
    digit1: 49,
    digit2: 50,
    digit3: 51,
    digit4: 52,
    digit5: 53,
    digit6: 54,
    digit7: 55,
    digit8: 56,
    digit9: 57,
    space: 32,
}
/*========================================================================================================================*/
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
/*========================================================================================================================*/
function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
/*========================================================================================================================*/
function padWithZeroes(number, length) {
    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }
    return my_string;
}
/*========================================================================================================================*/