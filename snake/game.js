const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

// create the unit in px
// const box = 32;

// load images
const groundImg = new Image();
groundImg.src = "images/ground.jpg";

// check collision
function collision(head, array) {
    for(let i=0; i<array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

var s1 = new Snake(9, 10);
var s2 = new Snake(15,15);

var snakes = [];
snakes[0] = s1;
snakes[1] = s2;


// draw everything to canvas
function draw() {
    ctx.drawImage(groundImg, 0, 0);

    snakes.forEach(e => {
        for(let i=0; i<e.snake.length; i++) {
            ctx.fillStyle = ( i==0 )? "green" : "white";
            ctx.fillRect(e.snake[i].x, e.snake[i].y, box, box);
    
            ctx.strokeStyle = "red";
            ctx.strokeRect(e.snake[i].x, e.snake[i].y, box, box);
        }

        ctx.drawImage(foodImg, food.x, food.y);

        // old head position
        let snakeX = e.snake[0].x;
        let snakeY = e.snake[0].y;

        // which direction
        if( d == "LEFT") snakeX -= box;
        if( d == "UP") snakeY -= box;
        if( d == "RIGHT") snakeX += box;
        if( d == "DOWN") snakeY += box;

        // if snake eats the food 
        if(snakeX == food.x && snakeY == food.y) {
            e.score++;
            food = new Food();
        } else {
            // remove the tail 
            e.snake.pop();
        }

        // add new Head
        let newHead = {
            x : snakeX, 
            y : snakeY
        }

        // game over
        if(snakeX < box || snakeX > 36 * box || snakeY < 3*box 
            || snakeY > 22*box || collision(newHead, snake)) {
            clearInterval(game);
        }

        e.snake.unshift(newHead);

        ctx.fillStyle = "white";
        ctx.font = "45px Changa one";
        ctx.fillText(e.score, 2*box, 1.6*box);

    });
    // ctx.fillStyle = "white";
    // ctx.font = "45px Changa one";
    // ctx.fillText(e.score, 2*box, 1.6*box);
}

// call draw function every 100ms
let game = setInterval(draw, 200);