class Snake {
    constructor(x, y) {
        this.snake = [];
        this.snake[0] = { 
            x: x*box, 
            y: y*box
        };
        this.score = 0;
        this.direction;
    }
}

// control the snake 
const keyListener = (e) => {
    [
        ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'],
        ['a', 'w', 'd', 's']
    ].forEach((key, index) => {
        const player = snakes[index];
        let keypressed = e.key || String.fromCharCode(e.keyCode);

        if (key[0] === keypressed && player.direction != "RIGHT") {
            player.direction = "LEFT";
        } else if (key[1] === keypressed && player.direction != "DOWN") {
            player.direction = "UP";
        } else if (key[2] === keypressed && player.direction != "LEFT") {
            player.direction = "RIGHT";
        } else if (key[3] === keypressed && player.direction != "UP") {
            player.direction = "DOWN";
        }
    })
}

document.addEventListener("keydown", keyListener);