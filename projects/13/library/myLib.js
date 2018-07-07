/**
 * Preloads all graphics
 * @param {Object} obj Objects of images with paths
 * @param {Function} callback
 */
function loadGraphics(obj, callback) {
    let imagesToLoad = Object.keys(obj).length;
    if (imagesToLoad == 0 && typeof callback == "function") { callback(); }

    let loaded = 0;
    for (let imgSrc in obj) {
        (function (imgSrc) {
            let image = new Image();
            image.onload = function () {
                obj[imgSrc] = image;
                loaded++;
                if (loaded == imagesToLoad && typeof callback == "function") {
                    console.info("Images loaded correctly");
                    callback();
                }
            }
            image.src = obj[imgSrc];
        }(imgSrc))
    }
}

class Vector2 {
    /**
     * Creates Vector object
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    /**
     * Calculates vector's lenght
     * @returns {Number}
     */
    length() {
        return Math.hypot(this.x, this.y);
    }

    /**
     * Let's the length of vector to 1
     */
    normalize() {
        let len = this.length();
        this.x /= len;
        this.y /= len;
    }

    /**
     * Add to Vector other Vector
     * @param {Vector2} vect
     */
    add(vect) {
        this.x += vect.x;
        this.y += vect.y;
    }

    /**
     * Substracts two Vectors
     * @param {Vector2} vect
     */
    substract(vect) {
        this.x -= vect.x;
        this.y -= vect.y;
    }

    /**
     * Multiplies each component of Vector by given value
     * @param {Number} value
     */
    multiplyScalar(value) {
        this.x *= value;
        this.y *= value;
    }

    /**
     * Clones all componets of vector
     * @returns {Vector2}
     */
    clone() {
        return new Vector2(this.x, this.y);
    }

    /**
     * Calculates distance beetwen two Vectors
     * @param {Vector2} vect
     * @returns {Number}
     */
    distanceTo(vect) {
        return Math.sqrt(Math.pow((this.x - vect.x), 2) + Math.pow((this.y - vect.y), 2))
    }

    /**
     * Checks if Vector belongs to polygon
     * @param {Array} poly Array of cords objects
     */
    belongsToPolygon(poly) {
        for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
            ((poly[i].y <= this.y && this.y < poly[j].y) || (poly[j].y <= this.y && this.y < poly[i].y))
                && (this.x < (poly[j].x - poly[i].x) * (this.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
                && (c = !c);
        return c;
    }
}

/**
 * Maps value beetwen range
 * @param {Number} value Value to map
 * @param {Number} in_min Input min value
 * @param {Number} in_max Input max value
 * @param {Number} out_min Output min value
 * @param {Number} out_max Output min value
 * @returns {boolean}
 */
function mapValue(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

/**
 * Pads number with given symbol
 * @param {Number} n Number to pad
 * @param {Number} width Need with of number
 * @param {String} z Symbol to pad with
 * @returns {String} Paded number
 */
function padWith(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

/**
 * Selects random integer
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}