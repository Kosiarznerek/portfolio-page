class UserInterface {
    /**
     * Creates GUI object
     */
    constructor() { }

    /**
     * Updates whole data at the top screen
     */
    updateData() {
        //Getting divs
        let currentLevel = document.getElementById("currentLevel");
        let playerLifes = document.getElementById("playerLifes");
        let currentScores = document.getElementById("currentScores");
        let topScores = document.getElementById("topScores");

        //Displayeing whole data
        currentLevel.innerHTML = padWith(CURRENT_LEVEL, 2);
        playerLifes.innerHTML = PLAYER.lifes;
        currentScores.innerHTML = padWith(PLAYER.scores, 7);
        topScores.innerHTML = padWith(this._getCurrentTopScores(), 7);
    }

    /**
     * Updates top score in cookies
     */
    updateTopScores() {
        //Only when Player passed 1 level
        if (CURRENT_LEVEL == 1) { return }

        //Saving
        let playerScores = PLAYER.scores;
        let currentTop = COOKIES.getByName("topScores");
        if (currentTop == "" || playerScores > currentTop) {
            COOKIES.set("topScores", playerScores);
        }
    }

    /**
     * Download the current top score
     * @returns {Number}
     */
    _getCurrentTopScores() {
        let currTop = COOKIES.getByName("topScores");
        if (currTop == "") { currTop = 0; }
        return currTop;
    }
}