//NUMBER MAPPING
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

//RANDOM NUMBER
const getRandomInt = function (min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const getRandomFloat = function (min,max) {
    return (Math.random() * (max - min + 1) + min);
}

//FIRE PLACE
function Fire(x, y, z, scene) {
    //SCENE
    this.scene = scene;

    //INFORMATIONS
    this.PARTICLES_AMOUNT = 50;
    this.FIRE_HEIGHT = 300;
    this.FIRE_WIDTH = 200;
    this.FIRE_POSITION = {
        x: x,
        y: y,
        z: z,
    }

    //FIRE PARTICLES
    this.particles = [];

    //CREATING PARTICLES
    for (var i = 0; i < this.PARTICLES_AMOUNT; i++) {
        this.createOneParticle(x, y, z);
    }
}

//CREATING ONE PARTICLE
Fire.prototype.createOneParticle = function (x, y, z) {
    //POSITION
    var pos={
        x: x + getRandomInt(-this.FIRE_WIDTH / 2, this.FIRE_WIDTH / 2),
        y: getRandomInt(-10, this.FIRE_HEIGHT),
        z: z + getRandomInt(-this.FIRE_WIDTH / 2, this.FIRE_WIDTH / 2),
    }

    //GEOMETRY
    var geometry = new THREE.DodecahedronBufferGeometry(20,0);
    geometry.morphTargets = true;

    //MATERIAL
    var material = new THREE.MeshBasicMaterial({
        color: 0xff6600,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });

    //MESH
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(pos.x, pos.y, pos.z);
    mesh.userData = {
        particleSpeed: getRandomFloat(0.1, 0.2),
    }
    this.particles.push(mesh);
    this.scene.add(mesh);
}

//UPDATING PARTICLES POSITION (each frame)
Fire.prototype.update = function () {
    //OPACITY
    for (var i = 0; i < this.particles.length; i++) {
        //HEIGHT
        this.particles[i].position.y += this.particles[i].userData.particleSpeed;
        if (this.particles[i].position.y > this.FIRE_HEIGHT) {
            this.particles[i].position.y = -10;
        }

        //OPACITY
        this.particles[i].material.opacity = this.particles[i].position.y.map(0, this.FIRE_HEIGHT, 1, 0);

        //WIDTH
        var scale = this.particles[i].position.y.map(0, this.FIRE_HEIGHT, 2, 0.5);
        this.particles[i].scale.set(scale, scale, scale);
    }
}