
import { Star } from "./star.js";

export class StarField {


    //add all stars to the array
    stars = [];
    howManyStars = 200;
    canvas;
    pencil;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        for(let i = 0; i < this.howManyStars; i++) {
            let newStar = new Star(this.canvas, this.pencil);
            this.stars.push(newStar)
        }
    }

    drawSpace() {
        // Set the fill color
        this.pencil.fillStyle = 'black';
        // Draw a filled rectangle at (10, 10) with width 100 and height 50
        this.pencil.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawStars() {
        
        for(let i = 0; i < this.stars.length; i++) {
            this.stars[i].move();
            this.stars[i].draw();
            this.stars[i].tryToRecycle();
        }

    }
}




