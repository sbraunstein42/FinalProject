import { Toolbox } from "./toolbox.js";

export class Asteroid {

    x;
    y;
    xSpeed;
    ySpeed;
    radius;
    canvas;
    pencil;
    speedMult;
    difficulty;

    sprite;

    toolbox = new Toolbox();

    constructor(canvas, pencil, radius, speedMult, difficulty, sprite) {
        this.pencil = pencil;
        this.canvas = canvas;
        this.radius = radius;

        this.sprite = sprite;

        //my position
        this.x = -radius;
        this.y = this.canvas.height * Math.random();

        this.difficulty = difficulty;
        this.speedMult = speedMult;
    }

    setStartPosition(x, y) {
        this.x = x;
        this.y = y;
    }


    calculateTrajectory(targetX, targetY) {
        //use target to determine the direction it should travel
        let xDir = (this.x - targetX) * -1 * .001;
        let yDir = (this.y - targetY) * -1 * .001;

        this.xSpeed = xDir * this.speedMult;
        this.ySpeed = yDir * this.speedMult;
    }

    draw() {
        // this.pencil.beginPath();
        // this.pencil.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        // this.pencil.fillStyle = "orange";
        // this.pencil.fill();
        // this.pencil.closePath();

        this.pencil.drawImage(
            this.sprite,
            this.x, this.y,
            this.radius, this.radius
        )
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

    didIHitShip(shipX, shipY) {
        let hitboxRadius = shipY;
        let didIHit = this.toolbox.isWithinCircle(this.x, this.y, this.radius, shipX, shipY);
        return didIHit;
    }



}