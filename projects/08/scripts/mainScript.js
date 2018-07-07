//Global variables
let START_SCREEN = null;
let LOADING_SCREEN = null;
let HELICOPTER_CONTROLLER = null;
let CAMERA_CONTROLLER = null;
let HELICOPTER_COCKPIT = null;
let HELICOPTER = null;

//Onload
window.onload = function () {
    //MousePressed event
    enableMousePressEvent();

    //Loading screen
    LOADING_SCREEN = new LoadingScreen();

    //Start screen
    START_SCREEN = new StartScreen();
    START_SCREEN.show();
    START_SCREEN.beginOnClick(function () {
        START_SCREEN.hide();
        LOADING_SCREEN.show();
        HELICOPTER = new Helicopter(
            new THREE.Vector3(0, 142, 0),//position
            new THREE.Vector3(10, 10, 10),//scale
            function () {//when helicopter has been loaded
                LOADING_SCREEN.hide();
                main();
            })
    })
};

/**
 * Main function called after the whole page has been loaded
 */
function main() {
    //Scene
    let scene = new THREE.Scene();

    //Renderer
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor("black");
    let width = window.outerWidth;
    let height = window.outerHeight;
    renderer.setSize(width, height);
    document.getElementById("scene").appendChild(renderer.domElement);

    //Camera
    let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100000);
    camera.position.set(-400, 400, -400);
    camera.lookAt(new THREE.Vector3());

    //Camera controller
    CAMERA_CONTROLLER = new CameraController(camera);

    //Axis
    let axis = new THREE.AxisHelper(500);    // 200 - wielkość 
    scene.add(axis);

    //Terrain
    let terrainData = getTerrainData();
    let terrain = new Terrain(
        terrainData.size,
        terrainData.height,
        terrainData.color,
        terrainData.position,
        terrainData.data,
    );
    let terrainMesh = terrain.getTerrain();
    scene.add(terrainMesh);

    //Fog
    scene.fog = new THREE.FogExp2(0xffffff, 0.000127);

    //Sky
    let sky = createSky();
    scene.add(sky);

    //Landing spot
    let landingSpot = createLandingSpot();
    scene.add(landingSpot);

    //Helicopter
    scene.add(HELICOPTER.daeModel);

    //Helicopter controller
    HELICOPTER_CONTROLLER = new HelicopterController(
        { min: 2, max: -2 }, //Throttle range
        { min: 2, max: -2 }, //Rudder range
        { min: 1, max: -1 } //Elevation range
    )
    HELICOPTER_CONTROLLER.show();

    //Helicopter cockpit
    HELICOPTER_COCKPIT = new HelicopterCockpit();
    document.body.onkeydown = function (e) {
        let key = e.key.toUpperCase();
        if (key == "C") {
            HELICOPTER_COCKPIT.enableDisable();
        }
    }

    //Raycaster
    let raycaster = new THREE.Raycaster() // tworzymy go raz

    //Collision point
    let collisionPoint = new THREE.Mesh(
        new THREE.CylinderBufferGeometry(50, 50, 20, 32),
        new THREE.MeshBasicMaterial({ color: 0xffff00 }));
    scene.add(collisionPoint);

    //Fire
    let fire = null;

    //Animate
    function animateScene() {
        //Helicopter controller
        HELICOPTER_CONTROLLER.throttleUpdate();
        HELICOPTER_CONTROLLER.rudderUpdate();
        HELICOPTER_CONTROLLER.elevationUpdate();


        //Camera controller
        CAMERA_CONTROLLER.updateView(HELICOPTER.daeModel);


        //Helicopter cockpit
        HELICOPTER_COCKPIT.throttleCtxUpdate();
        HELICOPTER_COCKPIT.rudderUpdate(camera);
        HELICOPTER_COCKPIT.elevationUpdate();


        //Helicopter
        HELICOPTER.engineUpdate();
        HELICOPTER.throttleUpdate(HELICOPTER_CONTROLLER.throttleValue);
        HELICOPTER.rudderUpdate(HELICOPTER_CONTROLLER.rudderValue);
        HELICOPTER.evelationUpdate(HELICOPTER_CONTROLLER.elevationValue);
        if (HELICOPTER.dead) {
            fire.update();
        }


        //Raycaster
        let ray = new THREE.Ray(HELICOPTER.daeModel.position, HELICOPTER.daeModel.getWorldDirection())
        raycaster.ray = ray
        let intersects = raycaster.intersectObject(terrainMesh);
        if (intersects[0]) {
            //Drawing collision point
            collisionPoint.position.set(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);
            if (intersects[0].distance < 10 && !HELICOPTER.dead) {
                HELICOPTER.explode();
                fire = new Fire(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z, scene);
            }
        }


        //wykonywanie funkcji bez końca ok 60 fps jeśli pozwala na to wydajność maszyny
        requestAnimationFrame(animateScene);
        renderer.render(scene, camera);
    }
    animateScene();
}