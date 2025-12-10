
import { Toolbox } from "../toolbox.js";
import { Star } from "./star.js";

export class StarField {

    //sprites
    starSprites = [];
    starSpriteSizes


    //add all stars to the array
    stars = [];
    howManyStars = 50;
    canvas;
    pencil;

    toolbox = new Toolbox();

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        for(let i = 0; i < 12; i++) {
            this.starSprites.push(document.getElementById("star" + (i + 1)))
        }

        for(let i = 0; i < this.howManyStars; i++) {
            let randomSprite = this.toolbox.getRandomItem(this.starSprites);
            let newStar = new Star(this.canvas, this.pencil, randomSprite);
            this.stars.push(newStar)
        }
    }

    drawSpace() {
        // Set the fill color
        this.pencil.fillStyle = '#000022';
        // Draw a filled rectangle at (10, 10) with width 100 and height 50
        this.pencil.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawStars() {
        
        this.pencil.imageSmoothingEnabled = false;
        for(let i = 0; i < this.stars.length; i++) {
            this.stars[i].move();
            this.stars[i].draw();
            this.stars[i].tryToRecycle();
        }
        this.pencil.imageSmoothingEnabled = true;


    }
}




