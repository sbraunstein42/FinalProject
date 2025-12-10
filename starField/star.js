export class Star {


    x = 50;
    y = 50;
    size = Math.random();
    sizeMult = 5;
    pencil;
    canvas;
    speed = 1;
    sprite;
    useSprite;

    constructor(canvas, pencil, sprite) {
        this.pencil = pencil;
        this.canvas = canvas;
        this.sprite = sprite;
        this.x = canvas.width * Math.random();
        this.y = canvas.height * Math.random();

        this.changeSpriteUsage();
    }

    changeSpriteUsage() {
        this.useSprite = Math.random() < .05
    }

    draw(pencil) {

        if(this.useSprite) {
            let size = this.sizeMult * 5;
            this.pencil.drawImage(
                this.sprite,
                this.x, this.y,
                size, size
            )
        } else {
            this.pencil.beginPath();
            this.pencil.arc(this.x, this.y, this.size * this.sizeMult, 0, 2 * Math.PI);
            this.pencil.fillStyle = "white";
            this.pencil.fill();
            this.pencil.closePath();
        }
        
    }

    move() {
        this.x += this.speed * this.size;
    }

    tryToRecycle() {
        if(this.x > this.canvas.width) {
            this.x = 0;
            this.y = Math.random() * this.canvas.height;
            this.changeSpriteUsage();
        }
    }

}