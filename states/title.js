export class Title {

    canvas;
    pencil;
    changeToGame = false;

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
        console.log(event);
    }

    update() {
        this.pencil.fillStyle = "gray";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Title", 10, 50);

        this.pencil.fillStyle = "pink";
        this.pencil.fillRect(200, 200, 100, 50);

        if(this.changeToGame) {
            this.changeToGame = false; //consume it; so we reset the title screen for next time.
            return "game";
        }
    }


}