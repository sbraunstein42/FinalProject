import { Toolbox } from "../toolbox.js";

export class Title {

    canvas;
    pencil;
    changeToGame = false;
    toolbox = new Toolbox();

    startButtonX = 350;
    startButtonY = 350;
    startButtonW = 300;
    startButtonH = 300;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        //bind the function; this becomes something different in the callback
        //"onKeyPressed", otherwise.
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.onClicked = this.onClicked.bind(this);

        document.addEventListener("keypress", this.onKeyPressed )
        document.addEventListener("click", this.onClicked)
    }

    onKeyPressed() {
        this.changeToGame = true;
    }
    
    onClicked(event) {
        let isHitButton = this.toolbox.isWithinRect(
            event.offsetX, event.offsetY, 
            this.startButtonX, this.startButtonY, 
            this.startButtonW, this.startButtonH
        );
        this.changeToGame = isHitButton;
    }

    update() {
        this.pencil.fillStyle = "gray";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Title", 10, 50);

        this.pencil.fillStyle = "#690604ff";
        this.pencil.fillRect(
            this.startButtonX, this.startButtonY,
            this.startButtonW, this.startButtonH
        );

        this.pencil.fillStyle = "white";
        this.pencil.font = "50px Impact";
        this.pencil.fillText("ESCAPE", this.startButtonX + 70, this.startButtonY + 170);

        if(this.changeToGame) {
            this.changeToGame = false; //consume it; so we reset the title screen for next time.
            return "game";
        }
    }


}