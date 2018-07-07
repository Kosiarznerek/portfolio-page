class LoadingScreen {
    /**
     * Creates loading screen
     */
    constructor() {
        //Holder
        this.holder = document.createElement("div");
        this.holder.style.width = "100vw";
        this.holder.style.height = "100vh";
        this.holder.style.backgroundColor = "rgba(117,211,255,0.8)";
        this.holder.style.position = "absolute";
        this.holder.style.left = "0";
        this.holder.style.top = "0";
        this.holder.style.zIndex = "999";
        this.holder.style.display = "none";

        //Title
        let title = document.createElement("h1");
        title.innerHTML = "Loading";
        title.style.fontFamily = "'Vibur', cursive";
        title.style.fontSize = "50px";
        title.style.textAlign = "center";
        title.style.backgroundColor = "rgba(255,255,255,0.5)";
        title.style.borderRadius = "5px";
        title.style.padding = "30px";
        title.style.width = "200px";
        title.style.border = "8px dotted rgb(178,173,46)";
        title.style.fontWeight = "bold";
        title.style.color = "rgb(178,173,46)";
        title.style.position = "absolute";
        title.style.left = "50%";
        title.style.top = "50%";
        title.style.transform = "translate(-50%,-50%)";
        this.holder.appendChild(title);
        document.body.appendChild(this.holder);
    }

    /**
     * Shows loading screen
     */
    show() {
        this.holder.style.display = "block";
    }

    /**
     * Hides loading screen
     */
    hide() {
        this.holder.style.display = "none";
    }
}