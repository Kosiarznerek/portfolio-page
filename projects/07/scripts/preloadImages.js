var PRELOADED = {
    images: {
        /*PLANE*/
        planeNormal: "graphics/global/plane/normal.png",
        planeNormal09: "graphics/global/plane/normal09.png",
        planeNormal08: "graphics/global/plane/normal08.png",
        planeNormal07: "graphics/global/plane/normal07.png",
        planeUp: "graphics/global/plane/up.png",
        planeDown: "graphics/global/plane/down.png",
        /*BULLETS*/
        bulletStraight: "graphics/global/bullets/01.png",
        bulletSkew: "graphics/global/bullets/02.png",
        bulletSmashed: "graphics/global/bullets/03.png",
        bulletVerticalUp: "graphics/global/bullets/04.png",
        /*ZAXXON RACKET*/
        racket: "graphics/global/bomb/01.png",
        /*SPACECRAFT*/
        spaceCraft01: "graphics/global/spaceCraft/01.png",
        spaceCraft02: "graphics/global/spaceCraft/02.png",
        spaceCraft03: "graphics/global/spaceCraft/03.png",
        spaceCraft04: "graphics/global/spaceCraft/04.png",
        /*OPPONENTS*/
        BaseMissiles: "graphics/global/opponents/BaseMissiles.png",
        FuelTank: "graphics/global/opponents/FuelTank.png",
        GunImplacement1: "graphics/global/opponents/GunImplacement1.png",
        GunImplacement2: "graphics/global/opponents/GunImplacement2.png",
        RadarTower: "graphics/global/opponents/RadarTower.png",
        Saucer: "graphics/global/opponents/Saucer.png",
        opponentDestroyed: "graphics/global/opponents/destroyed.png",
        zaxxon: "graphics/global/opponents/Zaxxon.png",
        zaxxonKilled: "graphics/global/opponents/ZaxxonKilled.png",
        /*DECORATIONS*/
        mirrors: "graphics/global/decorations/mirrors.png",
        image: "graphics/global/decorations/image.png",
        beginPattern: "graphics/global/decorations/beginPattern.png",
        endPattern: "graphics/global/decorations/endPattern.png",
        /*OBSTACLES LEVEL 01*/
        obstacle11: "graphics/levels/01/obs01.png",
        obstacle12: "graphics/levels/01/obs02.png",
        obstacle13: "graphics/levels/01/obs03.png",
        obstacle15: "graphics/levels/01/obs05.png",
        /*OBSTACLES LEVEL 02*/
        obstacle21: "graphics/levels/02/obs01.png",
    },
    animations: {
        /*EXPLOSION*/
        explosion01: {
            path: "graphics/global/explosions/01",
            framesAmount: 10,
            imagesObjArr: [],
        },
        /*ANIMATED OBSTACLES LEVEL 01*/
        obstacle14: {
            path: "graphics/levels/01/obs04",
            framesAmount: 18,
            imagesObjArr: [],
        },
        /*ANIMATED OBSTACLES LEVEL 02*/
        obstacle22: {
            path: "graphics/levels/02/obs02",
            framesAmount: 18,
            imagesObjArr: [],
        },
        obstacle23: {
            path: "graphics/levels/02/obs03",
            framesAmount: 18,
            imagesObjArr: [],
        },
        obstacle24: {
            path: "graphics/levels/02/obs04",
            framesAmount: 18,
            imagesObjArr: [],
        },
    },
}

function preloadAllImages() {
    //SHOWING GAME LOGO
    document.getElementById("gameLogo").style.display = "block";

    //COUTING AMOUNT IMAGES TO LOAD;
    var imagesToLoad = 0, currentlyLoaded = 0;
    //COUNTING IMAGES
    imagesToLoad += Object.keys(PRELOADED.images).length;
    //COUNTIG ALL FRAMES IN ANIMATINS SEQUENCE
    for (let animation in PRELOADED.animations) {
        imagesToLoad += PRELOADED.animations[animation].framesAmount;
    }
    //IF ALL IMAGES ARE PRE-LOADED
    function whenImagesAreReady() {
        currentlyLoaded++;
        canvas.bacgroundColor("white");
        canvas.write("IMAGES LOADING STATUS: " + currentlyLoaded + "/" + imagesToLoad);
        if (imagesToLoad == currentlyLoaded) {
            document.getElementById("gameLogo").style.display = "none";
            main();
        }
    }

    //PRE-LOADING ALL IMAGES
    for (let image in PRELOADED.images) {
        var imgSrc = PRELOADED.images[image];
        (function (image) {
            var imageObj = new Image();
            imageObj.onload = function () {
                PRELOADED.images[image] = imageObj;
                whenImagesAreReady();
            }
            imageObj.src = imgSrc;
        }(image));
    }

    //PRE-LOADING ALL FRAMES FROM ANIMATIONS
    for (let animation in PRELOADED.animations) {
        var imagesSrc = PRELOADED.animations[animation].path
        var framesAmount = PRELOADED.animations[animation].framesAmount
        for (let i = 0; i < framesAmount; i++) {
            (function (i, animation) {
                var frame = new Image();
                frame.onload = function () {
                    PRELOADED.animations[animation].imagesObjArr[i]=frame;
                    whenImagesAreReady();
                }
                frame.src = imagesSrc + "/" + i + ".png";
            }(i, animation));
        }
    }
}