class HelicopterController {
    /**
     * Creates Helicopter Cotroler which allows user to control Helicoter object
     * @param {Object} tRange Throttle range
     * @param {Number} tRange.min Throttle min range
     * @param {Number} tRange.max Throttle max range
     * @param {Object} rRange Rudder range
     * @param {Number} rRange.min Rudder min range
     * @param {Number} rRange.max Rudder max range
     * @param {Object} eRange Elevation range
     * @param {Number} eRange.min Elevation min range
     * @param {Number} eRange.max Elevation max range
     */
    constructor(tRange, rRange, eRange) {
        //Ranges
        this.tRange = { min: tRange.min, max: tRange.max, }
        this.rRange = { min: rRange.min, max: rRange.max, }
        this.eRange = { min: eRange.min, max: eRange.max, }



        //Container (global)
        this.container = document.createElement("div");
        this.container.style.display = "none";
        this.container.style.width = "100vw";
        this.container.style.height = "100vh";
        this.container.style.position = "absolute";
        this.container.style.left = "0";
        this.container.style.top = "0";
        this.container.style.fontWeight = "bolder";
        this.container.style.textAlign = "center";
        this.container.style.fontFamily = "'Vibur', cursive";
        document.body.appendChild(this.container);

        //Container (throttle)
        this._throttleCont = document.createElement("div");
        this._throttleCont.style.position = "absolute";
        this._throttleCont.style.left = "0";
        this._throttleCont.style.top = "0";
        this._throttleCont.style.width = "50px";
        this._throttleCont.style.height = "100vh";
        this._throttleCont.style.backgroundColor = "rgba(245,118,123,0.3)";
        this.container.appendChild(this._throttleCont);

        //Container (rudder)
        this._rudderCont = document.createElement("div");
        this._rudderCont.style.position = "absolute";
        this._rudderCont.style.left = "50%";
        this._rudderCont.style.bottom = "0";
        this._rudderCont.style.transform = "translateX(-50%)";
        this._rudderCont.style.width = "calc(100vw - 100px - 20px)";
        this._rudderCont.style.height = "50px";
        this._rudderCont.style.backgroundColor = "rgba(245,118,123,0.3)";
        this.container.appendChild(this._rudderCont);

        //Container (elevation)
        this._elevationCont = document.createElement("div");
        this._elevationCont.style.position = "absolute";
        this._elevationCont.style.right = "0";
        this._elevationCont.style.top = "0";
        this._elevationCont.style.width = "50px";
        this._elevationCont.style.height = "100vh";
        this._elevationCont.style.backgroundColor = "rgba(245,118,123,0.3)";
        this.container.appendChild(this._elevationCont);



        //- suwak po lewej -> THROTTLE(gaz)
        this._throttleToArrive = document.createElement("div");
        this._throttleToArrive.innerHTML = "T";
        this._throttleToArrive.style.fontSize = "57px";
        this._throttleToArrive.style.textAlign = "center";
        this._throttleToArrive.style.width = "50px";
        this._throttleToArrive.style.height = "50px";
        this._throttleToArrive.style.backgroundColor = "rgb(65,199,255)";
        this._throttleToArrive.style.position = "absolute";
        this._throttleToArrive.style.left = "0";
        this._throttleToArrive.style.top = "calc(50% - 25px)";
        this._throttleToArrive.style.zIndex = "999";
        this._throttleToArrive.style.cursor = "pointer";
        this._throttleToArrive.onmousemove = function (e) {
            if (!MOUSEPRESSED) { return; }
            let top = parseInt(this.style.top);
            if (top <= 0 && e.clientY < 25) { return }
            if (top + 55 > window.innerHeight && e.clientY > window.innerHeight - 25) { return }
            this.style.top = e.clientY - 25 + "px";
        }
        this._throttleCont.appendChild(this._throttleToArrive);

        this._throttle = document.createElement("div");
        this._throttle.style.width = "50px";
        this._throttle.style.height = "50px";
        this._throttle.style.backgroundColor = "rgba(65,199,255,0.3)";
        this._throttle.style.position = "absolute";
        this._throttle.style.left = "0";
        this._throttle.style.top = "calc(50% - 25px)";
        this._throttle.style.zIndex = "998";
        this._throttleCont.appendChild(this._throttle);



        //- w środku RUDDER -> (ster poziomy)
        this._rudderToArrive = document.createElement("div");
        this._rudderToArrive.innerHTML = "R";
        this._rudderToArrive.style.fontSize = "57px";
        this._rudderToArrive.style.textAlign = "center";
        this._rudderToArrive.style.width = "50px";
        this._rudderToArrive.style.height = "50px";
        this._rudderToArrive.style.backgroundColor = "rgb(65,199,255)";
        this._rudderToArrive.style.position = "absolute";
        this._rudderToArrive.style.left = (window.outerWidth - 60) / 2 - 55 - 5 + "px";
        this._rudderToArrive.style.bottom = "0";
        this._rudderToArrive.style.zIndex = "999";
        this._rudderToArrive.style.cursor = "pointer";
        let that = this;
        this._rudderToArrive.onmousemove = function (e) {
            if (!MOUSEPRESSED) { return; }
            let left = parseInt(this.style.left);
            if (left < 25 && e.clientX < (60 + 25)) { return }
            if (left + 50 > parseInt(that._rudderCont.offsetWidth) && e.offsetX >= 25) { return }
            this.style.left = e.clientX - 60 -25 + "px";
        }
        this._rudderCont.appendChild(this._rudderToArrive);

        this._rudder = document.createElement("div");
        this._rudder.style.width = "50px";
        this._rudder.style.height = "50px";
        this._rudder.style.backgroundColor = "rgba(65,199,255,0.3)";
        this._rudder.style.position = "absolute";
        this._rudder.style.left = (window.outerWidth - 60) / 2 - 55 - 5 + "px";
        this._rudder.style.bottom = "0";
        this._rudder.style.zIndex = "998";
        this._rudderCont.appendChild(this._rudder); 



        //- po prawej ELEVATION -> (wzniesienie)
        this._elevationToArrive = document.createElement("div");
        this._elevationToArrive.innerHTML = "E";
        this._elevationToArrive.style.fontSize = "57px";
        this._elevationToArrive.style.textAlign = "center";
        this._elevationToArrive.style.width = "50px";
        this._elevationToArrive.style.height = "50px";
        this._elevationToArrive.style.backgroundColor = "rgb(65,199,255)";
        this._elevationToArrive.style.position = "absolute";
        this._elevationToArrive.style.right = "0";
        this._elevationToArrive.style.top = "calc(50% - 25px)";
        this._elevationToArrive.style.zIndex = "999";
        this._elevationToArrive.style.cursor = "pointer";
        this._elevationToArrive.onmousemove = function (e) {
            if (!MOUSEPRESSED) { return; }
            let top = parseInt(this.style.top);
            if (top <= 0 && e.clientY < 25) { return }
            if (top + 55 > window.innerHeight && e.clientY > window.innerHeight - 25) { return }
            this.style.top = e.clientY - 25 + "px";
        }
        this._elevationCont.appendChild(this._elevationToArrive);

        this._elevation = document.createElement("div");
        this._elevation.style.width = "50px";
        this._elevation.style.height = "50px";
        this._elevation.style.backgroundColor = "rgba(65,199,255,0.3)";
        this._elevation.style.position = "absolute";
        this._elevation.style.right = "0";
        this._elevation.style.top = "calc(50% - 25px)";
        this._elevation.style.zIndex = "998";
        this._elevationCont.appendChild(this._elevation);        
    }

    /**
     * Shows helicoter controler
     */
    show() {
        this.container.style.display = "block";
    }

    /**
     * Hides helicoter controler
     */
    hide() {
        this.container.style.display = "block";
    }

    /**
     * Updates throttle position
     */
    throttleUpdate() {
        let topDestitation = parseInt(this._throttleToArrive.style.top);
        let currentTop = parseInt(this._throttle.style.top);
        if (isNaN(currentTop) || isNaN(topDestitation)) {
            topDestitation = window.innerHeight / 2 - 25;
            currentTop = window.innerHeight / 2 - 25;
        }
        let direction = new THREE.Vector2(0, topDestitation - currentTop);
        direction.normalize();
        currentTop += direction.y;
        this._throttle.style.top = currentTop + "px";
    }

    /**
     * Gets throttle value
     */
    get throttleValue() {
        let currentTop = parseInt(this._throttle.style.top);
        let tValue = mapValue(currentTop, 0, window.innerHeight - 50, this.tRange.min, this.tRange.max);
        return tValue;
    }

    /**
     * Updates rudder position
     */
    rudderUpdate() {
        let leftDestitation = parseInt(this._rudderToArrive.style.left);
        let currentLeft = parseInt(this._rudder.style.left);
        let direction = new THREE.Vector2(leftDestitation - currentLeft, 0);
        direction.normalize();
        currentLeft += direction.x;
        this._rudder.style.left = currentLeft + "px";
    }

    /**
     * Gets rudder value
     */
    get rudderValue() {
        let currentLeft = parseInt(this._rudder.style.left);
        let rValue = mapValue(currentLeft, 0, window.outerWidth - 170, this.rRange.min, this.rRange.max);
        return rValue
    }

    /**
     * Updates elevation position
     */
    elevationUpdate() {
        let topDestitation = parseInt(this._elevationToArrive.style.top);
        let currentTop = parseInt(this._elevation.style.top);
        if (isNaN(currentTop) || isNaN(topDestitation)) {
            topDestitation = window.innerHeight / 2 - 25;
            currentTop = window.innerHeight / 2 - 25;
        }
        let direction = new THREE.Vector2(0, topDestitation - currentTop);
        direction.normalize();
        currentTop += direction.y;
        this._elevation.style.top = currentTop + "px";
    }

    /**
     * Gets elevation value
     */
    get elevationValue() {
        let currentTop = parseInt(this._elevation.style.top);
        let eValue = mapValue(currentTop, 0, window.innerHeight - 50, this.eRange.min, this.eRange.max);
        return eValue;
    }
}