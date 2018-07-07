class StartScreen {
    /**
     * Creates Start Screen
     */
    constructor() {
        //Selected helicoter
        this.selectedHelicopter = undefined;

        //Container
        this.container = document.createElement("div");
        this.container.style.width = "100vw";
        this.container.style.height = "100vh";
        this.container.style.position = "absolute";
        this.container.style.left = "0";
        this.container.style.top = "0";
        this.container.style.backgroundColor = "rgba(157,216,72,0.7)";
        this.container.style.display = "none";

        //TitleTop (StartScreen)
        let titleTop = document.createElement("h1");
        titleTop.innerHTML = "Start Screen";
        titleTop.style.fontSize = "50px";
        titleTop.style.fontWeight = "bolder";
        titleTop.style.textAlign = "center";
        titleTop.style.fontFamily = "'Vibur', cursive";
        titleTop.style.width = "100vw";
        titleTop.style.paddingTop = "10px";
        titleTop.style.paddingBottom = "10px";
        titleTop.style.backgroundColor = "rgba(255,255,255,0.7)";
        this.container.appendChild(titleTop);

        //Helicopter
        let helicopterImage = document.createElement("div");
        helicopterImage.style.backgroundImage = "url(\"images/helicopterScreen.png\")";
        helicopterImage.style.backgroundRepeat = "no-repeat";
        helicopterImage.style.backgroundSize = "contain";
        helicopterImage.style.width = "280px";
        helicopterImage.style.height = "100px";
        helicopterImage.style.position = "absolute";
        helicopterImage.style.left = "50%";
        helicopterImage.style.top = "50%";
        helicopterImage.style.transform = "translate(-50%,-50%)";
        helicopterImage.style.cursor = "pointer";
        helicopterImage.style.opacity = "0.6";
        helicopterImage.style.borderRadius = "10px";
        helicopterImage.style.backgroundColor = "rgba(255,255,255,0.7)";
        let that = this;
        helicopterImage.onmouseenter = function () {
            if (that.selectedHelicopter) { return }
            this.style.opacity = "1";
        }
        helicopterImage.onmouseleave = function () {
            if (that.selectedHelicopter) { return }
            this.style.opacity = "0.6";
        }
        helicopterImage.onclick = function () {
            if (that.selectedHelicopter) {
                that.selectedHelicopter = false;
                this.style.opacity = "0.6";
            } else {
                that.selectedHelicopter = true;
                this.style.opacity = "1";
            }
        }
        this.container.appendChild(helicopterImage);

        //Begin button
        this.beginButton = document.createElement("div");
        this.beginButton.innerHTML = "Begin";
        this.beginButton.style.fontSize = "50px";
        this.beginButton.style.fontWeight = "bolder";
        this.beginButton.style.textAlign = "center";
        this.beginButton.style.fontFamily = "'Vibur', cursive";
        this.beginButton.style.position = "absolute";
        this.beginButton.style.bottom = "10px";
        this.beginButton.style.left = "50%";
        this.beginButton.style.transform = "translateX(-50%)";
        this.beginButton.style.padding = "20px";
        this.beginButton.style.width = "200px";
        this.beginButton.style.borderRadius = "10px";
        this.beginButton.style.cursor = "pointer";
        this.beginButton.onmouseenter = function () {
            this.style.backgroundColor = "rgba(255,255,255,0.7)";
        }
        this.beginButton.onmouseleave = function () {
            this.style.background = "none";
        }
        this.container.appendChild(this.beginButton);

        //Append on body element
        document.body.appendChild(this.container);
    }

    /**
     * Shows Start Screen
     */
    show() {
        this.container.style.display = "block";
    }

    /**
     * Hides Start Screen
     */
    hide() {
        this.container.style.display = "none";
    }

    /**
     * Adds on click to the begin button
     * @param {function} startOnClick
     */
    beginOnClick(startOnClick) {
        let that = this;
        this.beginButton.onclick = function () {
            if (that.selectedHelicopter) {
                startOnClick();
            }
        }
    }
}