/**
 * Creates sky
 * @returns {THREE.Mesh}
 */
function createSky() {
    var skyGeometry = new THREE.CubeGeometry(10000, 10000, 10000);

    var materialArray = [];
    for (var i = 0; i < Materials.sky.length; i++)
        materialArray.push(new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(Materials.sky[i]),
            side: THREE.BackSide
        }));
    var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    return skyBox;
}