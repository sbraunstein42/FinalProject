import { Asteroid } from "../asteroid.js";

export class Game {

    canvas;
    pencil;

    shipX = 800;
    shipY = 500;
    shipWidth = 150;
    shipHeight = 80;

    asteroids;

    gameDifficulty = 0;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;
        this.asteroids = [];
        
        this.checkForAsteroidClicks = this.checkForAsteroidClicks.bind(this);

        this.canvas.addEventListener("mousedown", this.checkForAsteroidClicks);

        this.addRandomAsteroidsForever();
        this.addDifficulty();
    }

    addRandomAsteroidsForever() {
        setInterval(() => {
            this.addAsteroid(this.gameDifficulty);
        }, 2000);
    }

    addDifficulty() {
        this.gameDifficulty += .05;
    }

    checkForAsteroidClicks(event) {
        let howManyToCreate = 0;

        let deadRocks = [];
        let liveRocks = [];

        //check for rocks that need to die
        for(let i = 0; i < this.asteroids.length; i++) {
            let rock = this.asteroids[i];
            let wasHit = rock.didIClickOnIt(event)
            if(wasHit) {
                deadRocks.push(rock);
            } else {
                liveRocks.push(rock);
            }
        }

        //remove dead rocks; don't let them draw anymore
        this.asteroids = liveRocks;

        //see if we can split any of the dead ones
        for(let i = 0; i < deadRocks.length; i++) {
            let rock = deadRocks[i];
            this.gameDifficulty += .01;
            if(rock.canSplit()) {
                this.addAsteroid(rock.difficulty + .1);
                this.addAsteroid(rock.difficulty - .1)
            }
        }
    }

    addAsteroid(difficulty) {
        let radius = 100 - (difficulty * 70);
        let speed = .01 + difficulty;

        let targetX = this.shipX + (this.shipWidth/2);
        let targetY = this.shipY + (this.shipHeight/2);
        let asteroid = new Asteroid(this.canvas, this.pencil, radius, speed, difficulty, targetX, targetY)
        this.asteroids.push(asteroid);
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