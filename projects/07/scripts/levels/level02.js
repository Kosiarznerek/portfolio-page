var level02;
function createLevel02() {
    level02 = {
        /*================================================== OPPONENTS =================================================*/
        opponents: {
            opp01: {
                className: "Zaxxon",
                leftTopPoint: new Point(8859.32, 499.5),
            },

            opp02: {
                className: "FuelTank",
                leftTopPoint: new Point(1822.46, 4093.57),
            },
            opp03: {
                className: "FuelTank",
                leftTopPoint: new Point(1982.47, 4013.63),
            },
            opp04: {
                className: "FuelTank",
                leftTopPoint: new Point(2526.72, 3740.93),
            },
            opp05: {
                className: "FuelTank",
                leftTopPoint: new Point(2654.4, 3677),
            },
            opp06: {
                className: "FuelTank",
                leftTopPoint: new Point(2718.42, 3644.74),
            },
            opp07: {
                className: "FuelTank",
                leftTopPoint: new Point(3262.68, 3356.88),
            },
            opp08: {
                className: "FuelTank",
                leftTopPoint: new Point(3325.88, 3356.55),
            },
            opp09: {
                className: "FuelTank",
                leftTopPoint: new Point(3454.36, 3325),
            },
            opp10: {
                className: "FuelTank",
                leftTopPoint: new Point(4078.36, 2908.73),
            },
            opp11: {
                className: "FuelTank",
                leftTopPoint: new Point(4158.36, 2877),
            },
            opp12: {
                className: "FuelTank",
                leftTopPoint: new Point(4735.36, 2588.93),
            },
            opp13: {
                className: "FuelTank",
                leftTopPoint: new Point(5054.49, 2476.38),
            },
            opp14: {
                className: "FuelTank",
                leftTopPoint: new Point(5183.36, 2492.67),
            },
            opp15: {
                className: "FuelTank",
                leftTopPoint: new Point(5726.49, 2093.38),
            },
            opp16: {
                className: "FuelTank",
                leftTopPoint: new Point(6270.49, 1821.2),
            },
            opp17: {
                className: "FuelTank",
                leftTopPoint: new Point(6334.64, 1789.11),
            },
            opp18: {
                className: "FuelTank",
                leftTopPoint: new Point(6495.25, 1709.9),
            },
            opp19: {
                className: "FuelTank",
                leftTopPoint: new Point(7038.42, 1437.22),
            },
            opp20: {
                className: "FuelTank",
                leftTopPoint: new Point(7102.51, 1452.67),
            },
            opp21: {
                className: "FuelTank",
                leftTopPoint: new Point(7102.34, 1405.62),
            },

            opp22: {
                className: "GunImplacement1",
                leftTopPoint: new Point(1839.75, 3978.09),
            },
            opp23: {
                className: "GunImplacement1",
                leftTopPoint: new Point(2672.75, 3610.18),
            },
            opp24: {
                className: "GunImplacement1",
                leftTopPoint: new Point(2848.11, 3625.69),
            },
            opp25: {
                className: "GunImplacement1",
                leftTopPoint: new Point(4848.94, 2473.84),
            },
            opp26: {
                className: "GunImplacement1",
                leftTopPoint: new Point(5776.22, 2106.3),
            },

            opp27: {
                className: "GunImplacement2",
                leftTopPoint: new Point(3670.11, 3251.16),
            },
            opp28: {
                className: "GunImplacement2",
                leftTopPoint: new Point(4277.6, 2931.31),
            },
            opp29: {
                className: "GunImplacement2",
                leftTopPoint: new Point(4405.39, 2866.98),
            },
            opp30: {
                className: "GunImplacement2",
                leftTopPoint: new Point(6614.54, 1779.48),
            },
        },
        /*==============================================================================================================*/

        /*================================================== OBSTACLES =================================================*/
        obstacles: {
            obs01: {
                wallsCoords: {
                    A: new Point(1118.18, 4319.87), B: new Point(1118.18, 4140),
                    C: new Point(1279.5, 4182.64), D: new Point(1279.5, 4249),
                    E: new Point(1567.67, 4319.87), F: new Point(1567.67, 4253.51),
                    G: new Point(1833.75, 4318.9), H: new Point(1833.75, 4497.61),
                },
                backgroundImage: {
                    imageObj: PRELOADED.images.obstacle21,
                    leftTopPoint: new Point(1118.18, 4179.5),
                },
                obstacleBottomLine: new Line(new Point(1118.18, 4319.87), new Point(1833.75, 4497.61)),
            },
            obs02: {
                wallsCoords: {
                    A: new Point(1887, 3935.84), B: new Point(1887, 3727.53),
                    C: new Point(2741, 3960.93), D: new Point(2741, 4150.62),
                    E: new Point(1887, 3935.84), F: new Point(2048.33, 3928),
                    G: new Point(2337.67, 3999), H: new Point(2337.67, 3959),
                    I: new Point(2048.33, 3885), J: new Point(2048.33, 3928),
                },
                animationSequence: {
                    imagesObjsArr: PRELOADED.animations.obstacle22.imagesObjArr,
                    leftTopPoint: new Point(1887, 3795),
                    _infinity: true,
                },
                obstacleBottomLine: new Line(new Point(1887, 3935.84), new Point(2741, 4150.62)),
            },
            obs03: {
                wallsCoords: {
                    A: new Point(2654, 3552.46), B: new Point(2654, 3336.51),
                    C: new Point(3530.16, 3564.94), D: new Point(3530.16, 3771.26),
                    E: new Point(2654, 3552.46), F: new Point(2816.33, 3513.67),
                    G: new Point(3103, 3582.5), H: new Point(3103, 3544.83),
                    I: new Point(2816.33, 3476), J: new Point(2816.33, 3513.67),
                },
                animationSequence: {
                    imagesObjsArr: PRELOADED.animations.obstacle23.imagesObjArr,
                    leftTopPoint: new Point(2654, 3411),
                    _infinity: true,
                },
                obstacleBottomLine: new Line(new Point(2654, 3552.46), new Point(3530.16, 3771.26)),
            },
            obs04: {
                wallsCoords: {
                    A: new Point(3423, 3168.08), B: new Point(3423, 2952.33),
                    C: new Point(4213, 3149.54), D: new Point(4214, 3364),
                    E: new Point(3423, 3168.08), F: new Point(3585, 3193),
                    G: new Point(3872.33, 3263.43), H: new Point(3872.33, 3209.62),
                    I: new Point(3585.14, 3139.29), J: new Point(3585, 3193),
                },
                animationSequence: {
                    imagesObjsArr: PRELOADED.animations.obstacle24.imagesObjArr,
                    leftTopPoint: new Point(3423, 3027.33),
                    _infinity: true,
                },
                obstacleBottomLine: new Line(new Point(3423, 3168.08), new Point(4214, 3364)),
            },
            obs05: {
                wallsCoords: {
                    A: new Point(1887 + 2303, 3935.84 + (-1152)), B: new Point(1887 + 2303, 3727.53 + (-1152)),
                    C: new Point(2741 + 2303, 3960.93 + (-1152)), D: new Point(2741 + 2303, 4150.62 + (-1152)),
                    E: new Point(1887 + 2303, 3935.84 + (-1152)), F: new Point(2048.33 + 2303, 3928 + (-1152)),
                    G: new Point(2337.67 + 2303, 3999 + (-1152)), H: new Point(2337.67 + 2303, 3959 + (-1152)),
                    I: new Point(2048.33 + 2303, 3885 + (-1152)), J: new Point(2048.33 + 2303, 3928 + (-1152)),
                },
                animationSequence: {
                    imagesObjsArr: PRELOADED.animations.obstacle22.imagesObjArr,
                    leftTopPoint: new Point(1887 + 2303, 3795 + (-1152)),
                    _infinity: true,
                },
                obstacleBottomLine: new Line(new Point(1887 + 2303, 3935.84 + (-1152)), new Point(2741 + 2303, 4150.62 + (-1152))),
            },
            obs06: {
                wallsCoords: {
                    A: new Point(2654 + 2305, 3552.46 + (-1152)), B: new Point(2654 + 2305, 3336.51 + (-1152)),
                    C: new Point(3530.16 + 2305, 3564.94 + (-1152)), D: new Point(3530.16 + 2305, 3771.26 + (-1152)),
                    E: new Point(2654 + 2305, 3552.46 + (-1152)), F: new Point(2816.33 + 2305, 3513.67 + (-1152)),
                    G: new Point(3103 + 2305, 3582.5 + (-1152)), H: new Point(3103 + 2305, 3544.83 + (-1152)),
                    I: new Point(2816.33 + 2305, 3476 + (-1152)), J: new Point(2816.33 + 2305, 3513.67 + (-1152)),
                },
                animationSequence: {
                    imagesObjsArr: PRELOADED.animations.obstacle23.imagesObjArr,
                    leftTopPoint: new Point(2654 + 2305, 3411 + (-1152)),
                    _infinity: true,
                },
                obstacleBottomLine: new Line(new Point(2654 + 2305, 3552.46 + (-1152)), new Point(3530.16 + 2305, 3771.26 + (-1152))),
            },
            obs07: {
                wallsCoords: {
                    A: new Point(3423 + 2304, 3168.08 + (-1152)), B: new Point(3423 + 2304, 2952.33 + (-1152)),
                    C: new Point(4213 + 2304, 3149.54 + (-1152)), D: new Point(4214 + 2304, 3364 + (-1152)),
                    E: new Point(3423 + 2304, 3168.08 + (-1152)), F: new Point(3585 + 2304, 3193 + (-1152)),
                    G: new Point(3872.33 + 2304, 3263.43 + (-1152)), H: new Point(3872.33 + 2304, 3209.62 + (-1152)),
                    I: new Point(3585.14 + 2304, 3139.29 + (-1152)), J: new Point(3585 + 2304, 3193 + (-1152)),
                },
                animationSequence: {
                    imagesObjsArr: PRELOADED.animations.obstacle24.imagesObjArr,
                    leftTopPoint: new Point(3423 + 2304, 3027.33 + (-1152)),
                    _infinity: true,
                },
                obstacleBottomLine: new Line(new Point(3423 + 2304, 3168.08 + (-1152)), new Point(4214 + 2304, 3364 + (-1152))),
            },
            obs08: {
                wallsCoords: {
                    A: new Point(1887 + 4607, 3935.84 + (-2304)), B: new Point(1887 + 4607, 3727.53 + (-2304)),
                    C: new Point(2741 + 4607, 3960.93 + (-2304)), D: new Point(2741 + 4607, 4150.62 + (-2304)),
                    E: new Point(1887 + 4607, 3935.84 + (-2304)), F: new Point(2048.33 + 4607, 3928 + (-2304)),
                    G: new Point(2337.67 + 4607, 3999 + (-2304)), H: new Point(2337.67 + 4607, 3959 + (-2304)),
                    I: new Point(2048.33 + 4607, 3885 + (-2304)), J: new Point(2048.33 + 4607, 3928 + (-2304)),
                },
                animationSequence: {
                    imagesObjsArr: PRELOADED.animations.obstacle22.imagesObjArr,
                    leftTopPoint: new Point(1887 + 4607, 3795 + (-2304)),
                    _infinity: true,
                },
                obstacleBottomLine: new Line(new Point(1887 + 4607, 3935.84 + (-2304)), new Point(2741 + 4607, 4150.62 + (-2304))),
            },
        },
        /*================================================ CORRIDOR ====================================================*/
        corridor: {
            leftWall: {
                coords: {
                    A: new Point(1006.75, 4375.82), B: new Point(1006.75, 4262.13),
                    C: new Point(9059.73, 236.92), D: new Point(9059.73, 350.63),
                },
                backgroundColor: "#a0a0a0",
            },
            floor: {
                coords: {
                    A: new Point(1614, 4528.7), B: new Point(1006.75, 4375.82),
                    C: new Point(9059.73, 350.63), D: new Point(9666.35, 503.34),
                },
                backgroundColor: "#0840D4",
            },
            rightWall: {
                coords: {
                    A: new Point(966, 4852.46), B: new Point(966, 4738.76),
                    C: new Point(9666.35, 389.99), D: new Point(9666.35, 503.34),
                },
                backgroundColor: "#000000",
            },
        },
        /*============================================== CANVAS INF ====================================================*/
        canvas: {
            vievOffset: {
                x: 0,
                y: 4628.07,
            },
        },
        /*============================================== DECORIATIONS ==================================================*/
        decorations: {
            beginPattern: {
                imageObj: PRELOADED.images.beginPattern,
                leftTopPoint: new Point(1006.75, 4356.26),
            },
            mirror01: {
                imageObj: PRELOADED.images.mirrors,
                leftTopPoint: new Point(1407, 3983),
            },
            mirror02: {
                imageObj: PRELOADED.images.mirrors,
                leftTopPoint: new Point(2174, 3599),
            },
            mirror03: {
                imageObj: PRELOADED.images.mirrors,
                leftTopPoint: new Point(2942.49, 3215.02),
            },
            mirror04: {
                imageObj: PRELOADED.images.mirrors,
                leftTopPoint: new Point(3710, 2831),
            },
            mirror05: {
                imageObj: PRELOADED.images.mirrors,
                leftTopPoint: new Point(4478.33, 2446.67),
            },
            mirror06: {
                imageObj: PRELOADED.images.mirrors,
                leftTopPoint: new Point(5247.33, 2063.17),
            },
            mirror07: {
                imageObj: PRELOADED.images.mirrors,
                leftTopPoint: new Point(6014.5, 1678.67),
            },
            mirror08: {
                imageObj: PRELOADED.images.mirrors,
                leftTopPoint: new Point(6783.02, 1295.5),
            },
            img01: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(1534.5, 3999),
            },
            img02: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(2303.5, 3615),
            },
            img03: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(3070.5, 3231),
            },
            img04: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(3838.25, 2847),
            },
            img05: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(4605.83, 2463.67),
            },
            img06: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(5374.5, 2079),
            },
            img07: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(6142.5, 1695),
            },
            img08: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(6910.75, 1312),
            },
        }
        /*==============================================================================================================*/
    }
}