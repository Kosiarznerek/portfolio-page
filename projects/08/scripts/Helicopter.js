class Helicopter {
    /**
     * Creates Helicopter object
     * @param {THREE.Vector3} position
     * @param {THREE.Vector3} scale
     * @param {function} callback
     */
    constructor(position, scale, callback) {
        //Dead
        this.dead = false;

        //Components;
        this.daeModel = null;
        this.rotorTop = null;
        this.rotorRight = null;

        //Loading model
        let that = this;
        let loader = new THREE.ColladaLoader();
        loader.load("models/H1.xml", function (collada) {
            //Getting components
            that.daeModel = collada.scene;
            that.rotorTop = that.daeModel.getObjectByName("main_rotor", true);
            that.rotorRight = that.daeModel.getObjectByName("rear_rotor", true);
            
            //Setting scale
            that.daeModel.scale.set(scale.x, scale.y, scale.z);

            //Setting position
            that.daeModel.position.set(position.x, position.y, position.z);

            //Material
            that.daeModel.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.MeshBasicMaterial({
                        map: THREE.ImageUtils.loadTexture("images/planeModel.jpg"),
                        morphTargets: true // odpowiada za animację materiału modelu
                    })
                }
            });

            //Callback
            if (callback && typeof callback == "function") {
                callback();
            }
        })
    }

    /**
     * Couses that rotons are spinning
     */
    engineUpdate() {
        if (this.dead) { return }
        this.rotorTop.rotation.z += 1;
        this.rotorRight.rotation.x += 1;
    }

    /**
     * Updates helicopter throttle
     * @param {Number} value
     */
    throttleUpdate(value) {
        if (this.dead) { return }
        let vect = this.daeModel.getWorldDirection().clone();
        if (vect.z >= 0) {
            this.daeModel.translateZ(value);
            this.daeModel.rotation.x = mapValue(value, HELICOPTER_CONTROLLER.tRange.min, HELICOPTER_CONTROLLER.tRange.max, Math.PI / 180 * 15, -Math.PI / 180 * 15);
        }
        else {
            this.daeModel.translateZ(value);
            this.daeModel.rotation.x = mapValue(value, HELICOPTER_CONTROLLER.tRange.min, HELICOPTER_CONTROLLER.tRange.max, -Math.PI / 180 * 15, Math.PI / 180 * 15);
        }
    }

    /**
     * Updates helicopter rudder
     * @param {Number} value
     */
    rudderUpdate(value) {
        if (this.dead) { return }
        this.daeModel.rotation.y += mapValue(value, HELICOPTER_CONTROLLER.rRange.min, HELICOPTER_CONTROLLER.rRange.max, Math.PI / 180 * 0.1, -Math.PI / 180 * 0.1);
        this.daeModel.rotation.z = mapValue(value, HELICOPTER_CONTROLLER.rRange.min, HELICOPTER_CONTROLLER.rRange.max, -Math.PI / 180 * 45, Math.PI / 180 * 45);
    }

    /**
     * Updates helicopter elevation
     * @param {Number} value
     */
    evelationUpdate(value) {
        if (this.dead) { return }
        if (this.daeModel.position.y + value > 1000) { return }
        if (this.daeModel.position.y + value < -500) { return }
        this.daeModel.position.y += value;
    }

    /**
     * Explodes helicopter
     */
    explode() {
        if (this.dead) { return }
        this.dead = true;
    }
}