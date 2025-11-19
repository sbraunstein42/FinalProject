import { Game } from "./states/game.js";
import { GameOver } from "./states/gameOver.js";
import { Title } from "./states/title.js";
import { Toolbox } from "./toolbox.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil
let toolbox = new Toolbox();

//make some states to go to.
let game = new Game();
let gameOver = new GameOver();
let title = new Title();

let state = title;

function gameLoop() {
    state.update();
}

setInterval(gameLoop, 1000 / 60);