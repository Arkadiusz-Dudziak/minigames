class Snake {
    constructor(x, y) {
        this.snake = [];
        this.snake[0] = { 
            x: x*box, 
            y: y*box
        };
    }
}
// create the snake 
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

// score variable
let score = 0;

// control the snake 
document.addEventListener("keydown", direction);
let d;
function direction(e) {
    let keypressed = e.key || String.fromCharCode(e.keyCode);
    if ('ArrowLeft' === keypressed && d != "RIGHT") {
        d = "LEFT";
    } else if ('ArrowUp' === keypressed && d != "DOWN") {
        d = "UP";
    } else if ('ArrowRight' === keypressed && d != "LEFT") {
        d = "RIGHT";
    } else if ('ArrowDown' === keypressed && d != "UP") {
        d = "DOWN";
    }
}