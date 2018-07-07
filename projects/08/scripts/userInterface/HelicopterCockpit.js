class HelicopterCockpit {
    /**
     * Creates helicoter cockipit
     */
    constructor() {
        //ON-OFF
        this.enable = false;

        //Container
        this.container = document.createElement("div");
        this.container.style.position = "absolute";
        this.container.style.left = "50%";
        this.container.style.top = "50%";
        this.container.style.transform = "translate(-50%, -50%)";
        this.container.style.zIndex = "999";
        this.container.style.display = "none";
        this.container.style.border = "1px solid black";
        this.container.style.padding = "0";
        this.container.style.fontSize = "0";
        this.container.style.boxSizing = "border-box";
        document.body.appendChild(this.container);

        //Throttle
        this.throttleCanvas = document.createElement("canvas");
        this.throttleCanvas.width = 150;
        this.throttleCanvas.height = 300;
        this.throttleCtx = this.throttleCanvas.getContext('2d');
        this.container.appendChild(this.throttleCanvas);

        //Rudder
        this.rudderCanvas = document.createElement("canvas");
        this.rudderCanvas.width = 300;
        this.rudderCanvas.height = 300;
        this.rudderCanvas.style.borderLeft = "1px solid black";
        this.rudderCanvas.style.borderRight = "1px solid black";
        this.rudderCanvas.style.padding = "0";
        this.rudderCanvas.style.fontSize = "0";
        this.rudderCanvas.style.boxSizing = "border-box";
        this.rudderCtx = this.rudderCanvas.getContext('2d');
        this.container.appendChild(this.rudderCanvas);

        //Elevation
        this.elevationCanvas = document.createElement("canvas");
        this.elevationCanvas.width = 150;
        this.elevationCanvas.height = 300;
        this.elevationCtx = this.elevationCanvas.getContext('2d');
        this.container.appendChild(this.elevationCanvas);
    }

    /**
     * Shows and hides global container
     */
    enableDisable() {
        this.enable = !this.enable;

        if (this.enable) {
            this.container.style.display = "block";
        }
        else {
            this.container.style.display = "none";
        }
    }

    /**
     * Updates throttle canvas
     */
    throttleCtxUpdate() {
        let currentThrottle = HELICOPTER_CONTROLLER.throttleValue;
        currentThrottle = mapValue(currentThrottle, HELICOPTER_CONTROLLER.tRange.min, HELICOPTER_CONTROLLER.tRange.max, 99, -99);
        currentThrottle = Math.abs(currentThrottle);

        if (HELICOPTER.dead) { currentThrottle = 0; }

        //Clear
        this.throttleCtx.clearRect(0, 0, 150, 300);

        //Border for current
        this.throttleCtx.beginPath();
        this.throttleCtx.fillStyle = "rgba(255, 255, 255, 0.5)";
        this.throttleCtx.fillRect(150 - 50, 150 - 15 / 2, 50, 15);
        this.throttleCtx.closePath();

        //Displaing current value
        this.throttleCtx.font = "15px 'Vibur'";
        this.throttleCtx.fillStyle = "rgba(0, 0, 0, 1)";
        this.throttleCtx.textAlign = "center";
        this.throttleCtx.fillText(parseInt(currentThrottle)+"km/h", 150 - 25, 155);

        //Scale
        for (let i = -50; i <= 140; i += 10){
            this.throttleCtx.font = "15px 'Vibur'";
            this.throttleCtx.fillStyle = "rgba(0, 0, 0, 1)";
            this.throttleCtx.textAlign = "center";
            this.throttleCtx.fillText(i, 50, (i * 5 + 157.5) - currentThrottle*5);
        }
    }

    /**
     * Updates rudder canvas
     */
    rudderUpdate() {
        //Getting values
        let horizontal = mapValue(HELICOPTER.daeModel.rotation.z, -Math.PI / 180 * 45, Math.PI / 180 * 45, -45, 45);
        let vect = HELICOPTER.daeModel.getWorldDirection().clone();
        let vertical = null;
        if (vect.z >= 0) {
            vertical = mapValue(HELICOPTER.daeModel.rotation.x, Math.PI / 180 * 15, -Math.PI / 180 * 15, 15, -15);
        } else {
            vertical = mapValue(HELICOPTER.daeModel.rotation.x, -Math.PI / 180 * 15, Math.PI / 180 * 15, 15, -15);
        }
        vertical *= -1;

        //Drawing horicontal
        //Clear
        this.rudderCtx.clearRect(0, 0, 300, 300);

        //Border for current
        this.rudderCtx.beginPath();
        this.rudderCtx.fillStyle = "rgba(255, 255, 255, 0.5)";
        this.rudderCtx.fillRect(150 - 25, 0, 50, 15);
        this.rudderCtx.closePath();

        //Displaing current value
        this.rudderCtx.font = "15px 'Vibur'";
        this.rudderCtx.fillStyle = "rgba(0, 0, 0, 1)";
        this.rudderCtx.textAlign = "center";
        this.rudderCtx.fillText(parseInt(horizontal) + "°", 300 / 2, 15);

        //Scale
        for (let i = -80; i <= 80; i += 10) {
            this.rudderCtx.font = "15px 'Vibur'";
            this.rudderCtx.fillStyle = "rgba(0, 0, 0, 1)";
            this.rudderCtx.textAlign = "center";
            this.rudderCtx.fillText(i, (i * 5 + 150) - horizontal * 5, 50);
        }

        //Vertical
        //Border for current
        this.rudderCtx.beginPath();
        this.rudderCtx.fillStyle = "rgba(255, 255, 255, 0.5)";
        this.rudderCtx.fillRect(150 - 50-50, 150 - 15 / 2, 50, 15);
        this.rudderCtx.closePath();

        //Displaing current value
        this.rudderCtx.font = "15px 'Vibur'";
        this.rudderCtx.fillStyle = "rgba(0, 0, 0, 1)";
        this.rudderCtx.textAlign = "center";
        this.rudderCtx.fillText(parseInt(vertical) + "°", 150 - 25-50, 155);

        //Scale
        for (let i = -50; i <= 50; i += 10) {
            this.rudderCtx.font = "15px 'Vibur'";
            this.rudderCtx.fillStyle = "rgba(0, 0, 0, 1)";
            this.rudderCtx.textAlign = "center";
            this.rudderCtx.fillText(i, 20, (i * 5 + 157.5) - vertical * 5);
        }

        this.rudderCtx.clearRect(0, 0, 50, 50);
    }

    /**
     * Updates elevation canvas
     */
    elevationUpdate() {
        let currentElevation = HELICOPTER.daeModel.position.y;

        //Clear
        this.elevationCtx.clearRect(0, 0, 150, 300);

        //Border for current
        this.elevationCtx.beginPath();
        this.elevationCtx.fillStyle = "rgba(255, 255, 255, 0.5)";
        this.elevationCtx.fillRect(150 - 50, 150 - 15 / 2, 50, 15);
        this.elevationCtx.closePath();

        //Displaing current value
        this.elevationCtx.font = "15px 'Vibur'";
        this.elevationCtx.fillStyle = "rgba(0, 0, 0, 1)";
        this.elevationCtx.textAlign = "center";
        this.elevationCtx.fillText(parseInt(currentElevation) + "m", 150 - 25, 155);

        //Scale
        for (let i = -500; i <= 1000; i += 10) {
            this.elevationCtx.font = "15px 'Vibur'";
            this.elevationCtx.fillStyle = "rgba(0, 0, 0, 1)";
            this.elevationCtx.textAlign = "center";
            this.elevationCtx.fillText(i, 50, (i * 5 + 157.5) - currentElevation * 5);
        }
    }
}