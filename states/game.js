import { Asteroid } from "../asteroid.js";
import { Toolbox } from "../toolbox.js";

export class Game {

    canvas;
    pencil;

    shipX = 800;
    shipY = 500;
    shipWidth = 214;
    shipHeight = 96;

    score = 0;
    highScore = 0;

    asteroidSprites = [];

    toolbox = new Toolbox();

    asteroids;

    gameDifficulty = 0;

    asteroidTimeoutId;

    shipSprite = document.getElementById("ship");

    enter() {
        this.score = 0;
        this.gameDifficulty = 0;
        this.asteroids = [];
        this.canvas.addEventListener("mousedown", this.checkForAsteroidClicks);

        //adds asteroids constantly
        this.addAsteroidWithDelay(2000, 20);

        this.highScore = parseInt(localStorage.getItem("highScore"));
        if(isNaN(this.highScore)) {
            this.highScore = 10;
        }
    }

    exit() {
        if(this.score > this.highScore) { 
            localStorage.setItem("highScore", this.score);
            localStorage.setItem("newHighScore", true);
            console.log("Set high score!")
        }
        clearTimeout(this.asteroidTimeoutId);

    }

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;
        this.asteroids = [];

        for(let i = 0; i < 5; i++) {
            this.asteroidSprites.push(document.getElementById("asteroid" + (i + 1)))
        }
        
        this.checkForAsteroidClicks = this.checkForAsteroidClicks.bind(this);


    }

    addAsteroidWithDelay(delay, decay) {
        if(delay < decay) delay = decay;
        this.asteroidTimeoutId = setTimeout(() => {
            this.addAsteroid(this.gameDifficulty);
            this.addAsteroidWithDelay(delay-decay, decay);
        }, delay);
    }

    addDifficulty() {
        this.gameDifficulty += .01;
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
                this.score += Math.ceil(rock.difficulty * 5);
                this.addDifficulty();
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
            if(rock.canSplit()) {
                this.addAsteroid(Math.random() + .3, rock);
                this.addAsteroid(0, rock)
            }
        }
    }

    addAsteroid(difficulty, splitFrom) {

        difficulty = this.toolbox.clamp(difficulty);

        let radiusVariance = this.toolbox.lerp(0, .3, Math.random());
        let radiusDifficulty = this.toolbox.clamp(difficulty + radiusVariance);
        let radius = this.toolbox.lerp(20, 100, 1-radiusDifficulty);

        if(splitFrom != null) {
            radius *= this.toolbox.clamp(.5 + (1-difficulty));
        }

        let speedMult = this.toolbox.lerp(1, 1.5, Math.random());

        //exact targeting
        let targetX = this.shipX + (this.shipWidth/2);
        let targetY = this.shipY + (this.shipHeight/2);

        let missAmount = (1-difficulty) * this.canvas.height/2;
        targetX += this.toolbox.lerp(-missAmount, missAmount, Math.random())
        targetY += this.toolbox.lerp(-missAmount, missAmount, Math.random())

        let sprite = this.toolbox.getRandomItem(this.asteroidSprites)

        let asteroid = new Asteroid(this.canvas, this.pencil, radius, speedMult, difficulty, sprite)

        if(splitFrom != null) {
            asteroid.setStartPosition(splitFrom.x, splitFrom.y);
        }

        asteroid.calculateTrajectory(targetX, targetY)

        this.asteroids.push(asteroid);
    }
    

    update() {
        // this.pencil.font = "20px Georgia";
        // this.pencil.fillText("Game", 10, 50);

        for(let i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].draw();
            this.asteroids[i].move();
            
            var isGameOver = this.asteroids[i].didIHitShip(this.shipX, this.shipY);
            if(isGameOver) {
                this.exit();
                console.log("WAS GAME")
                return "gameOver";
            }

        }
        
        this.pencil.fillStyle = "#690604ff";
        this.pencil.drawImage(
            this.shipSprite,
            this.shipX, this.shipY,
            this.shipWidth, this.shipHeight
        );

        this.pencil.font = "italic 50px Impact";
        this.pencil.fillText("SCORE: " + this.score, 20, this.canvas.height - 20);

        if(this.score > this.highScore) {
            this.pencil.fillStyle = "#919447ff";
            this.pencil.font = "italic 25px Impact";
            this.pencil.fillText("NEW HIGH SCORE!", 300, this.canvas.height - 20);
        }


    }



}