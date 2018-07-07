class CameraController {
    /**
     * Createas Camera Controller
     * @param {THREE.PerspectiveCamera} camera
     */
    constructor(camera) {
        //Camera object
        this.camera = camera;

        //Views settings
        this.views = {
            back: new THREE.Vector3(0, 0, -50),
            front: new THREE.Vector3(0, 0, 50),
            inside: new THREE.Vector3(0, 0.6, 2.4),
            leftSide: new THREE.Vector3(50, 0, 0),
            rightSide: new THREE.Vector3(-50, 0, 0),
            top: new THREE.Vector3(0, 50, 0),
        }

        //Container
        this.container = document.createElement("div");
        this.container.style.zIndex = "999";
        this.container.style.position = "absolute";
        this.container.style.top = "0";
        this.container.style.left = "50%";
        this.container.style.transform = "translateX(-50%)";
        this.container.style.textAlign = "center";
        this.container.style.fontSize = "0";
        document.body.appendChild(this.container);

        //Creating small UI
        let vievsScreens = {
            back: "images/cameraController/back.png",
            front: "images/cameraController/front.png",
            inside: "images/cameraController/inside.png",
            leftSide: "images/cameraController/leftSide.png",
            rightSide: "images/cameraController/rightSide.png",
            top: "images/cameraController/top.png",
        }
        for (let side in vievsScreens) {
            let div = document.createElement("div");
            div.style.display = "inline-block";
            div.style.width = "50px";
            div.style.height = "50px";
            div.style.backgroundPosition = "center";
            div.style.backgroundRepeat = "no-repeat";
            div.style.backgroundSize = "contain";
            div.style.backgroundImage = "url(\"" + vievsScreens[side] + "\")";
            div.style.opacity = "0.6";
            div.style.borderRadius = "50px";
            div.style.border = "3px dotted orange";
            div.style.backgroundColor = "rgba(255,255,255,0.5)";
            div.setAttribute("viewName", side);
            div.setAttribute("selected", "0");
            div.onmouseenter = function () {//:hover
                if (this.getAttribute("selected") == "1") { return }
                this.style.opacity = "1";
            }
            div.onmouseleave = function () {//:hover
                if (this.getAttribute("selected") == "1") { return }
                this.style.opacity = "0.6";
            }
            let that = this;
            div.onclick = function () {
                //Unselecting all
                for (let i = 0; i < that.container.children.length; i++) {
                    let item = that.container.children[i];
                    item.setAttribute("selected", "0");
                    item.style.opacity = "0.6";
                }
                //Selecting current
                this.style.opacity = "1";
                this.setAttribute("selected", "1");
            }
            this.container.appendChild(div);
        }
        //Seleting first one
        this.container.children[0].style.opacity = "1";
        this.container.children[0].setAttribute("selected", "1");
    }

    /**
     * Checks which view is currently selected
     * @returns {String} Viev key name
     */
    get currentSelectedView() {
        for (let i = 0; i < this.container.children.length; i++){
            let div = this.container.children[i];
            if (div.getAttribute("selected") == "1") {
                let keyName = div.getAttribute("viewName");
                return keyName;
            }
        }
    }

    /**
     * Updates camera position
     * @param {THREE.Mesh} objectToFollow
     */
    updateView(objectToFollow) {
        let camVect = this.views[this.currentSelectedView].clone();
        let camPos = camVect.applyMatrix4(objectToFollow.matrixWorld);
        this.camera.position.x = camPos.x;
        this.camera.position.y = camPos.y;
        this.camera.position.z = camPos.z;
        if (this.currentSelectedView == "top") {
            this.camera.rotation.y = objectToFollow.rotation.y;
            this.camera.lookAt(objectToFollow.position);
            this.camera.rotateZ(Math.PI / 2)
            return;
        }
        let lookAt = objectToFollow.position.clone();
        let vect = objectToFollow.getWorldDirection().clone();
        vect.normalize();
        vect.multiplyScalar(300);
        lookAt.add(vect)
        this.camera.lookAt(lookAt);
        if (this.currentSelectedView != "front") {
            this.camera.rotation.z = -HELICOPTER.daeModel.rotation.z;
            this.camera.rotateZ(Math.PI);
        } else {
            this.camera.rotation.z = HELICOPTER.daeModel.rotation.z;
        }
        if (vect.z <= 0 && (this.currentSelectedView == "front" || this.currentSelectedView == "back" || this.currentSelectedView == "inside")) {
            this.camera.rotateZ(Math.PI);
        }
        if (this.currentSelectedView == "leftSide" || this.currentSelectedView == "rightSide" || this.currentSelectedView == "top") {
            this.camera.lookAt(objectToFollow.position);
        }
    }
}