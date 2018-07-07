/**
 * Function creates Landing spot
 * @returns {THREE.Mesh}
 */
function createLandingSpot() {
    var geometry = new THREE.CubeGeometry(250, 250, 250);

    var materialArray = [];
    for (var i = 0; i < Materials.landingSpot.length; i++)
        materialArray.push(new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(Materials.landingSpot[i]),
            side: THREE.DoubleSide
        }));
    var material = new THREE.MeshFaceMaterial(materialArray);
    var landingMesh = new THREE.Mesh(geometry, material);
    return landingMesh;
}