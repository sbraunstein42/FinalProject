import { Toolbox } from "./toolbox.js";

export class Asteroid {

    x;
    y;
    xSpeed;
    ySpeed;
    radius;
    canvas;
    pencil;
    difficulty;

    toolbox = new Toolbox();

    constructor(canvas, pencil, radius, speed, difficulty, targetX, targetY) {
        this.pencil = pencil;
        this.canvas = canvas;
        this.radius = radius;

        //my position
        this.x = -radius;
        this.y = this.canvas.height * Math.random();

        //use target to determine the direction it should travel
        let xDir = (this.x - targetX) * -1 * .001;
        let yDir = (this.y - targetY) * -1 * .001;

        this.xSpeed = xDir;
        this.ySpeed = yDir;
        
        this.difficulty = difficulty;
    }

    draw() {
        this.pencil.beginPath();
        this.pencil.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.pencil.fillStyle = "orange";
        this.pencil.fill();
        this.pencil.closePath();
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    canSplit() {
        return Math.random() < this.difficulty;
    }

    didIClickOnIt(event) {
        let clickX = event.offsetX;
        let clickY = event.offsetY;
        let didIClick = this.toolbox.isWithinCircle(this.x, this.y, this.radius, clickX, clickY);
        return didIClick;
    }



}