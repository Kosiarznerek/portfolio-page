class Bonus {
    /**
     * Creates bonus Object on random Block
     */
    constructor() {
        this.selectRandomPostion();
        this.frameCounter = 0;
    }

    /**
     * Selects random postion
     */
    selectRandomPostion() {
        //Selecting random block
        for (let i = 0; i < BLOCKS.length; i++) {
            BLOCKS[i].hasBonus = false;
        }
        //Selecting random block
        let isOk = true;
        let randomIndex = null;
        do {
            isOk = true;
            randomIndex = randomInt(0, BLOCKS.length - 1);
            if (BLOCKS[randomIndex].colors.top == "#000000") { isOk = false; }
        }
        while (!isOk)
        BLOCKS[randomIndex].hasBonus = true;
    }

    /**
     * Updates bonus state
     */
    update() {
        this.frameCounter++;
        if (this.frameCounter % 200 == 0) {
            this.selectRandomPostion();
            this.frameCounter = 0;
        }

        //When bonus has been collected
        let bonusAmout = 0;
        for (let i = 0; i < BLOCKS.length; i++) {
            if (BLOCKS[i].hasBonus) { bonusAmout++; break; }
        }
        if (bonusAmout == 0) {
            this.selectRandomPostion();
            this.frameCounter = 0;
        }
    }
}