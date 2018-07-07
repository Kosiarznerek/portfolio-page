var level01;
function createLevel01() {
    level01 = {
        /*================================================== OPPONENTS =================================================*/
        opponents: {
            opp01: {
                className: "Saucer",
                leftTopPoint: new Point(1614.17, 3080.17),
            },
            opp02: {
                className: "Saucer",
                leftTopPoint: new Point(2101.33, 2917.6),
            },
            opp03: {
                className: "Saucer",
                leftTopPoint: new Point(2308.33, 2677.6),
            },
            opp04: {
                className: "Saucer",
                leftTopPoint: new Point(2997.33, 2469.6),
            },
            opp05: {
                className: "Saucer",
                leftTopPoint: new Point(3077.33, 2293.6),
            },
            opp06: {
                className: "Saucer",
                leftTopPoint: new Point(3573.33, 2037.6),
            },
            opp07: {
                className: "Saucer",
                leftTopPoint: new Point(3973.33, 1942.6),
            },
            opp08: {
                className: "Saucer",
                leftTopPoint: new Point(4564.33, 1542.6),
            },
            opp09: {
                className: "Saucer",
                leftTopPoint: new Point(5013.13, 1366.01),
            },
            opp10: {
                className: "Saucer",
                leftTopPoint: new Point(5492.72, 1270.56),
            },

            opp11: {
                className: "RadarTower",
                leftTopPoint: new Point(1812.85, 3108.37),
            },
            opp12: {
                className: "RadarTower",
                leftTopPoint: new Point(4436.85, 1604.37),
            },
            opp13: {
                className: "RadarTower",
                leftTopPoint: new Point(5620.74, 1171.36),
            },

            opp14: {
                className: "GunImplacement2",
                leftTopPoint: new Point(1846.52, 3079.71),
            },
            opp15: {
                className: "GunImplacement2",
                leftTopPoint: new Point(2438.52, 2647.71),
            },
            opp16: {
                className: "GunImplacement2",
                leftTopPoint: new Point(2870.52, 2535.71),
            },
            opp17: {
                className: "GunImplacement2",
                leftTopPoint: new Point(5014.05, 1496.66),
            },

            opp18: {
                className: "GunImplacement1",
                leftTopPoint: new Point(1824.17, 2895.26),
            },
            opp19: {
                className: "GunImplacement1",
                leftTopPoint: new Point(3120.17, 2383.26),
            },
            opp20: {
                className: "GunImplacement1",
                leftTopPoint: new Point(3185.17, 2398.26),
            },
            opp21: {
                className: "GunImplacement1",
                leftTopPoint: new Point(3616.17, 2190.26),
            },
            opp22: {
                className: "GunImplacement1",
                leftTopPoint: new Point(3825.17, 1886.26),
            },
            opp23: {
                className: "GunImplacement1",
                leftTopPoint: new Point(4401.17, 1806.26),
            },

            opp24: {
                className: "FuelTank",
                leftTopPoint: new Point(2110.67, 2753.73),
            },
            opp25: {
                className: "FuelTank",
                leftTopPoint: new Point(2206.46, 2801.38),
            },
            opp26: {
                className: "FuelTank",
                leftTopPoint: new Point(2398.69, 2802.91),
            },
            opp27: {
                className: "FuelTank",
                leftTopPoint: new Point(2846.27, 2577.38),
            },
            opp28: {
                className: "FuelTank",
                leftTopPoint: new Point(2718.91, 2449.91),
            },
            opp29: {
                className: "FuelTank",
                leftTopPoint: new Point(2942.17, 2386.75),
            },
            opp30: {
                className: "FuelTank",
                leftTopPoint: new Point(3167, 2241.92),
            },
            opp31: {
                className: "FuelTank",
                leftTopPoint: new Point(4190.92, 1891.82),
            },
            opp32: {
                className: "FuelTank",
                leftTopPoint: new Point(4286.43, 1761.77),
            },
            opp33: {
                className: "FuelTank",
                leftTopPoint: new Point(4447, 1569.92),
            },
            opp34: {
                className: "FuelTank",
                leftTopPoint: new Point(4702.17, 1553.2),
            },
            opp35: {
                className: "FuelTank",
                leftTopPoint: new Point(5310.91, 1249.78),
            },
            opp36: {
                className: "FuelTank",
                leftTopPoint: new Point(5470.71, 1169.79),
            },

            opp37: {
                className: "BaseMissiles",
                leftTopPoint: new Point(4080.38, 1949.1),
            },
            opp38: {
                className: "BaseMissiles",
                leftTopPoint: new Point(3969.38, 1835.81),
            },
            opp39: {
                className: "BaseMissiles",
                leftTopPoint: new Point(4912.18, 1389.46),
            },
            opp40: {
                className: "BaseMissiles",
                leftTopPoint: new Point(4944.49, 1309.58),
            },
            opp41: {
                className: "BaseMissiles",
                leftTopPoint: new Point(5040.49, 1276.6),
            },
        },
        /*==============================================================================================================*/

        /*================================================== OBSTACLES =================================================*/
        obstacles: {
            obs01: {
                wallsCoords: {
                    A: new Point(1119, 3220.71), B: new Point(1119, 3041.33),
                    C: new Point(1281, 3084.17), D: new Point(1281, 3148),
                    E: new Point(1566.6, 3218.5), F: new Point(1566.6, 3154.33),
                    G: new Point(1779, 3210.52), H: new Point(1779, 3385.66),
                },
                backgroundImage: {
                    imageObj: PRELOADED.images.obstacle11,
                    leftTopPoint: new Point(1119, 3075),
                },
                obstacleBottomLine: new Line(new Point(1119, 3220.71), new Point(1779, 3385.66)),
            },
            obs02: {
                wallsCoords: {
                    A: new Point(2367, 2741.25), B: new Point(2367, 2691.75),
                    C: new Point(2779.67, 2794.79), D: new Point(2779.67, 2846.77),
                },
                backgroundImage: {
                    imageObj: PRELOADED.images.obstacle12,
                    leftTopPoint: new Point(2367, 2686),
                },
                obstacleBottomLine: new Line(new Point(2367, 2741.25), new Point(2779.67, 2846.77)),
            },
            obs03: {
                wallsCoords: {
                    A: new Point(3228.33, 2139.64), B: new Point(3228.33, 2091.12),
                    C: new Point(3553.33, 2172.33), D: new Point(3553.33, 2220.83),
                },
                backgroundImage: {
                    imageObj: PRELOADED.images.obstacle13,
                    leftTopPoint: new Point(3263,2091.67),
                },
                obstacleBottomLine: new Line(new Point(3228.33, 2139.64), new Point(3553.33, 2220.83)),
            },
            obs04: {
                wallsCoords: {
                    A: new Point(4098.25, 1712.8), B: new Point(4098.25, 1661.33),
                    C: new Point(4806.33, 1805.3), D: new Point(4806.33, 1856.77),
                },
                animationSequence: {
                    imagesObjsArr: PRELOADED.animations.obstacle14.imagesObjArr,
                    leftTopPoint: new Point(4127, 1659.33),
                    _infinity: true,
                },
                obstacleBottomLine: new Line(new Point(4098.25, 1712.8), new Point(4806.33, 1856.77)),
            },
            obs05: {
                wallsCoords: {
                    A: new Point(5360.95, 1089.88), B: new Point(5360.95, 885),
                    C: new Point(5537.33, 931.65), D: new Point(5537.33, 1021.67),
                    E: new Point(5824, 1092.5), F: new Point(5824, 996.66),
                    G: new Point(6133, 1073.26), H: new Point(6133, 1283.41),
                },
                backgroundImage: {
                    imageObj: PRELOADED.images.obstacle15,
                    leftTopPoint: new Point(5375, 952.04),
                },
                obstacleBottomLine: new Line(new Point(5360.95, 1089.88), new Point(6133, 1283.41)),
            },
        },
        /*================================================ CORRIDOR ====================================================*/
        corridor: {
            leftWall: {
                coords: {
                    A: new Point(1006.75, 3276.82), B: new Point(1006.75, 3163.13),
                    C: new Point(5662.25, 836.13), D: new Point(5662.25, 949.82),
                },
                backgroundColor: "#a0a0a0",
            },
            floor: {
                coords: {
                    A: new Point(1614, 3429.7), B: new Point(1006.75, 3276.82),
                    C: new Point(5662.25, 949.82), D: new Point(6268.99, 1102.42),
                },
                backgroundColor: "#0840D4",
            },
            rightWall: {
                coords: {
                    A: new Point(966, 3753.46), B: new Point(966, 3639.76),
                    C: new Point(6268.99, 989.07), D: new Point(6268.99, 1102.42),
                },
                backgroundColor: "#000000",
            },
        },
        /*============================================== CANVAS INF ====================================================*/
        canvas: {
            vievOffset: {
                x: 0,
                y: 3529.07,
            },
        },
        /*============================================== DECORIATIONS ==================================================*/
        decorations: {
            beginPattern: {
                imageObj: PRELOADED.images.beginPattern,
                leftTopPoint: new Point(1006.75, 3256.49),
            },
            endPattern: {
                imageObj: PRELOADED.images.endPattern,
                leftTopPoint: new Point(5662, 897.04),
            },
            img01: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(1502.5, 2916),
            },
            img02: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(1790.67, 2772),
            },
            img03: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(2079, 2628),
            },
            img04: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(2367, 2484),
            },
            img05: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(2655, 2340),
            },
            img06: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(2943, 2196),
            },
            img07: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(3519, 1908),
            },
            img08: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(3807, 1764),
            },
            img09: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(4383, 1476),
            },
            img10: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(4670.5, 1332.25),
            },
            img11: {
                imageObj: PRELOADED.images.image,
                leftTopPoint: new Point(4959, 1188),
            },
        }
        /*==============================================================================================================*/
    }
}