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

    constructor(canvas, pencil, radius, speed, difficulty) {
        this.pencil = pencil;
        this.canvas = canvas;
        this.radius = radius;
        this.xSpeed = speed * Math.random();
        this.ySpeed = speed * Math.random();
        this.x = 100;
        this.y = 500;
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
        return true;
    }

    didIClickOnIt(event) {
        let clickX = event.offsetX;
        let clickY = event.offsetY;
        let didIClick = this.toolbox.isWithinCircle(this.x, this.y, this.radius, clickX, clickY);
        return didIClick;
    }



}