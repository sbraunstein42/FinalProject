import { Toolbox } from "../toolbox.js";

export class GameOver {

    canvas;
    pencil;
    changeToTitle = false;

    retryButtonX = 650;
    retryButtonY = 650;
    retryButtonW = 300;
    retryButtonH = 300;

    toolbox = new Toolbox();

    isNewHighScore = false;
    highScore;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        this.onClicked = this.onClicked.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
    }

    update() {
        this.pencil.font = "italic 100px Impact";
        this.pencil.fillText("SEE YOU", 10, 100);
        this.pencil.fillText("SPACE COWBOY...", 10, 200);

        this.pencil.fillStyle = "#690604ff";
        this.pencil.fillRect(
            this.retryButtonX, this.retryButtonY,
            this.retryButtonW, this.retryButtonH
        );

        this.pencil.fillStyle = "#919447";
        let message = "OLD HIGH SCORE: ";
        if(this.isNewHighScore) {
            message = "YOU WIN! NEW BEST: "
            this.pencil.fillStyle = this.toolbox.getRandomColor();
        }
        this.pencil.font = "50px Impact";
        this.pencil.fillText(message + this.highScore, 40, this.canvas.height - 60);


        this.pencil.fillStyle = "white";
        this.pencil.font = "50px Impact";
        this.pencil.fillText("RETRY?", this.retryButtonX + 70, this.retryButtonY + 170);

        if(this.changeToTitle) {
            this.exit();
            return "title";
        }
    }

    onKeyPressed() {
        this.changeToTitle = true;
    }
    
    onClicked(event) {
        let isHitButton = this.toolbox.isWithinRect(
            event.offsetX, event.offsetY, 
            this.retryButtonX, this.retryButtonY, 
            this.retryButtonW, this.retryButtonH
        );
        this.changeToTitle = isHitButton;
    }


    enter() {
        document.addEventListener("keypress", this.onKeyPressed )
        document.addEventListener("click", this.onClicked)

        this.highScore = parseInt(localStorage.getItem("highScore"));
        if(isNaN(this.highScore)) {
            this.highScore = 10;
        }
        
        this.isNewHighScore = localStorage.getItem("newHighScore") == "true";
        localStorage.removeItem("newHighScore")
    }

    exit() {
        document.addEventListener("keypress", this.onKeyPressed )
        document.addEventListener("click", this.onClicked)
        this.changeToTitle = false; //consume it; so we reset the title screen for next time.
    }



}