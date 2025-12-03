import { Asteroid } from "../asteroid.js";

export class Game {

    canvas;
    pencil;

    shipX = 800;
    shipY = 500;
    shipWidth = 150;
    shipHeight = 80;

    asteroids;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;
        this.asteroids = [];
        
        this.addAsteroid(0);

        this.checkForAsteroidClicks = this.checkForAsteroidClicks.bind(this);

        this.canvas.addEventListener("mousedown", this.checkForAsteroidClicks)
    }

    checkForAsteroidClicks(event) {
        for(let i = 0; i < this.asteroids.length; i++) {
            let rock = this.asteroids[i];
            let wasHit = rock.didIClickOnIt(event)
            if(wasHit) {
                if(rock.canSplit()) {
                    this.addAsteroid(rock.difficulty + .1)
                    this.addAsteroid(0)
                }
            }
        }
    }

    addAsteroid(difficulty) {
        this.asteroids.push(new Asteroid(this.canvas, this.pencil, 50, .2, difficulty));
    }
    

    update() {
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Game", 10, 50);

        for(let i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].draw();
            this.asteroids[i].move();
        }
        
        this.pencil.fillStyle = "#690604ff";
        this.pencil.fillRect(
            this.shipX, this.shipY,
            this.shipWidth, this.shipHeight
        );

    }



}